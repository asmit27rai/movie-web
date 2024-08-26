import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { AuthProvider } from "./AuthContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    </AuthProvider>
  </React.StrictMode>,
);