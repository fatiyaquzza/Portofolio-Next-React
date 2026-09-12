"use client";

import { getAuth } from "firebase/auth";
import { app } from "./firebase";

export const getClientAuth = () => getAuth(app);
