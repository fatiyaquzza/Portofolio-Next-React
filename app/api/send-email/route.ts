import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from_name, from_email, subject, message } = body;

    console.log("REQ BODY:", { from_name, from_email, subject, message });
    console.log("ENV:", {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
    });

    // Validasi input
    if (!from_name || !from_email || !subject || !message) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validasi env
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_RECEIVER
    ) {
      return new Response(JSON.stringify({ message: "Email config missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: `"${from_name}" <${from_email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Fatiya's Portfolio : ${subject}`,
      text: `
    Pesan Baru dari Portfolio!
    
    Nama: ${from_name}
    Email: ${from_email}
    Subjek: ${subject}
    
    Pesan:
    ${message}
    `,
      html: `
        <h2>Pesan Baru dari Portfolio</h2>
        <p><strong>Nama:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error.message, error);
    return new Response(
      JSON.stringify({ message: error.message || "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
