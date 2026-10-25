import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import JourneySteps from "../components/JourneySteps.jsx";
import Icon from "../components/Icon.jsx";
import { resendVerification } from "../api/authApi.js";

export default function VerifyEmailPage({ email, onNavigate }) {
  const [status, setStatus] = useState("idle");

  const resend = async () => {
    setStatus("loading");
    try {
      await resendVerification({ email });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AuthLayout
      showcase={<JourneySteps />}
      title="Check Your Inbox"
      subtitle={`We sent a verification link to ${email}. Open it to activate your account.`}
      footer={<button className="link" onClick={() => onNavigate("login")}>Back to log in</button>}
    >
      <button className="btn" onClick={resend} disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Resend verification email"} <Icon name="arrow" size={17} />
      </button>
      {status === "sent" && <p className="ok-line" role="status"><Icon name="check" size={16} />Email sent again.</p>}
      {status === "error" && <div className="alert" role="alert">We couldn't resend the email. Please try again.</div>}
    </AuthLayout>
  );
}
