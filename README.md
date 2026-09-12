# fatiya.dev

Portfolio Fatiya Quzza built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, Firebase, Cloudinary, and Nodemailer.

## Themes

Dark is the first-visit default, independently of the operating-system theme. The sun/moon button stores the selection under `theme` in localStorage and applies it across routes. Theme tokens live in `app/globals.css`; use the semantic surface/ink tokens for UI colors and retain fixed colors only for artwork and brand logos. The hero wash changes through CSS without remounting its canvases.

Run `npm run test:themes` against a running local server (or set `SMOKE_BASE_URL`). Screenshots are saved under ignored `test-results/themes`. Dashboard route checks cover unauthenticated redirects; authenticated admin screens still need a manual visual check with an admin account.

## Local setup

Use Node.js 22 or newer. Install from the committed lockfile and copy the environment template:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. Development uses `.next`; production builds use `.next-build` so a dev cache cannot corrupt production verification.

## Environment variables

All required names are documented in `.env.example`.

- `NEXT_PUBLIC_FIREBASE_*`: Firebase web application configuration.
- `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and `FIREBASE_ADMIN_PRIVATE_KEY`: service account used only by server routes. Store the private key with literal `\n` characters in Vercel.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: browser upload target.
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`: server-only signature credentials.
- `RATE_LIMIT_SALT`: long random server-only value used to hash contact-form IP addresses.
- `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_RECEIVER`: Gmail SMTP sender, app password, and destination.

Never commit `.env`, `.env.local`, or service-account JSON. Configure the same values in the Vercel Preview and Production environments. Rotate a secret immediately if repository history or logs show that it was exposed.

## Admin access

Dashboard access, Firestore writes, and Cloudinary upload signatures all require the Firebase custom claim `admin: true`. Email addresses and UIDs are not authorization rules.

Set the claim from a trusted administrative environment with the Firebase Admin SDK, then force the user to sign out and back in so Firebase issues a fresh ID token. Confirm the claim before deploying the stricter rules.

Deploy Firestore rules only after emulator tests pass:

```bash
npm run test:rules
firebase deploy --only firestore:rules
```

The local Firebase emulator requires Java 21 or newer.

## Cloudinary

Create a signed upload preset matching `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`. Configure it in Cloudinary to accept JPEG, PNG, and WebP only, with a maximum file size of 5 MiB. The browser validates the same constraints, requests a short-lived signature from `/api/admin/cloudinary-signature`, and uploads directly to Cloudinary. The signature endpoint verifies a current Firebase admin token.

## Data model

Projects use the Firestore document ID as their public route: `/projects/[id]`. Current fields are `title`, `image`, `type` (`Website` or `Mobile App`), `tools`, `description`, optional `role`, optional `demoUrl` and `repoUrl`, `featured`, and `createdAt`. The old `link` field remains stored and supported as a temporary read fallback.

Experiences add an optional numeric `order`. Ordered items appear first in ascending order; ties and unordered legacy documents use descending `createdAt`, then document ID for deterministic output.

Before bulk editing production data, export Firestore or copy the affected collections. The schema is additive, so rollback consists of restoring the previous deployment; legacy documents remain readable.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run test:rules
npm run build
npm run start
npm run smoke
```

`npm test` covers runtime document parsing, URL handling, ordering, contact validation, HTML escaping, and email composition through a fake transport. `npm run test:rules` checks public reads, admin-only writes, field allowlists, project types, and required project content against the Firestore emulator. `npm run smoke` uses an installed Chrome at the default Windows path; set `CHROME_PATH` and `SMOKE_BASE_URL` when needed. It checks 320, 390, 768, and 1440 px, mobile menu behavior, overflow, reduced motion, console errors, and a WebGL-disabled fallback.

GitHub Actions runs clean installation, lint, TypeScript, unit tests, Firestore rules tests with Java 21, and the production build.

## Release and rollback

1. Export Firestore and verify the admin custom claim.
2. Run all checks above and review dependency audit results without `--force`.
3. Deploy to a Vercel Preview environment with separate server secrets.
4. Exercise login, CRUD, image rejection/failure, project 404s, contact throttling, keyboard navigation, 200% zoom, and production email with a designated test inbox.
5. Promote the verified preview to Production and monitor Vercel errors plus Core Web Vitals.
6. If a regression appears, restore the prior Vercel deployment. Restore Firestore only when data was changed and the backup is known to be newer than the last valid write.

The contact endpoint never logs message content. It validates type and length, escapes HTML, uses the SMTP account as `from`, uses the visitor as `replyTo`, times out SMTP calls, and limits attempts through private Firestore transactions.
