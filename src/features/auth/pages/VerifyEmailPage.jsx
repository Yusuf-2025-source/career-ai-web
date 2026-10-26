import { useEffect, useRef, useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import JourneySteps from "../components/JourneySteps.jsx";
import Icon from "../components/Icon.jsx";
import { resendVerification, verifyCode } from "../api/authApi.js";

export default function VerifyEmailPage({ email = "", onNavigate }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [resendStatus, setResendStatus] = useState("idle");
  const [countdown, setCountdown] = useState(0);
  const [percent, setPercent] = useState(0);
  const refs = useRef([]);

  useEffect(() => refs.current[0]?.focus(), []);
  useEffect(() => {
    if (!countdown) return undefined;
    const timer = setInterval(() => setCountdown((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError("");
    if (index < 3 && digit) refs.current[index + 1]?.focus();
    if (index === 3 && next.every(Boolean)) void verify(next.join(""));
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 3) refs.current[index + 1]?.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = pasted.split("").concat(["", "", "", ""]).slice(0, 4);
    setDigits(next);
    refs.current[Math.min(pasted.length, 3)]?.focus();
    if (pasted.length === 4) void verify(pasted);
  };

  async function verify(code) {
    if (status === "orbit" || status === "loading" || status === "success") return;
    setStatus("orbit");
    setError("");
    try {
      const request = verifyCode({ email, code });
      await new Promise((resolve) => setTimeout(resolve, 1780));
      setStatus("loading");
      const started = Date.now();
      const progressTimer = setInterval(() => {
        const progress = Math.min((Date.now() - started) / 2000, 1);
        setPercent(Math.round((1 - (1 - progress) ** 2.2) * 100));
      }, 40);
      await Promise.all([request, new Promise((resolve) => setTimeout(resolve, 2000))]);
      clearInterval(progressTimer);
      setPercent(100);
      setStatus("success");
      setTimeout(() => onNavigate("login"), 1600);
    } catch (requestError) {
      setStatus("error");
      setError(requestError?.message || "Invalid verification code. Please check and try again.");
    }
  }

  const handleResend = async () => {
    if (countdown || resendStatus === "loading") return;
    setResendStatus("loading");
    try {
      await resendVerification({ email });
      setResendStatus("sent");
      setCountdown(45);
    } catch {
      setResendStatus("error");
    }
  };

  return (
    <AuthLayout
      className="otp-auth"
      showcase={<JourneySteps />}
      title={status === "loading" ? "Verifying..." : status === "success" ? "Access Granted" : status === "error" ? "Verification Failed" : "Enter OTP Verification Code"}
      subtitle={status === "loading" ? "Securely checking your credentials." : status === "success" ? "Welcome back. Redirecting to your account..." : status === "error" ? "The code you entered is incorrect." : <>We have sent a 4-digit verification code to<br /><span className="otp-email-chip">{email || "your university academic email"}</span></>}
      footer={<button className="link" onClick={() => onNavigate("login")}>Back to log in</button>}
    >
      <form className={`otp-form otp-phase-${status}`} onSubmit={(event) => { event.preventDefault(); if (digits.every(Boolean)) void verify(digits.join("")); }}>
        {error && <div className="alert" role="alert">{error}</div>}
        <div className="otp-stage">
          <div className={`otp-input-stage ${status !== "idle" && status !== "error" ? "hidden" : ""}`} onPaste={handlePaste} role="group" aria-label="4-digit verification code">
            {digits.map((digit, index) => <input key={index} ref={(element) => { refs.current[index] = element; }} className={`otp-box ${digit ? "filled" : ""} ${status === "error" ? "err" : ""}`} value={digit} maxLength={1} inputMode="numeric" aria-label={`Digit ${index + 1}`} onChange={(event) => updateDigit(index, event.target.value)} onKeyDown={(event) => handleKeyDown(index, event)} disabled={status === "orbit" || status === "loading" || status === "success"} />)}
          </div>
          {status === "orbit" && <div className="otp-orbit-layer" aria-hidden="true"><div className="otp-orbit-ring">{digits.map((digit, index) => <span key={index} className="otp-orbit-node" style={{ "--dx": `${Math.cos((index / 4) * Math.PI * 2 - Math.PI / 2) * 70}px`, "--dy": `${Math.sin((index / 4) * Math.PI * 2 - Math.PI / 2) * 70}px`, animationDelay: `${index * 60}ms` }}>{digit}</span>)}</div></div>}
          {status === "loading" && <div className="otp-loading-wrap"><div className="otp-loading-core"><div className="otp-loading-ring" /><div className="otp-loading-pulse" /><div className="otp-loading-inner">{percent}</div></div></div>}
          {status === "success" && <div className="otp-success-wrap"><div className="otp-success-flash" />{Array.from({ length: 24 }, (_, index) => <span key={index} className="otp-confetti" style={{ "--cx": `${Math.cos((index / 24) * Math.PI * 2) * 110}px`, "--cy": `${Math.sin((index / 24) * Math.PI * 2) * 110}px` }} />)}<div className="otp-success-vault"><Icon name="check" size={32} /></div><div className="otp-success-badge">Verified</div></div>}
        </div>
        <div className="resend-row">
          <span>Didn't receive code?</span>
          {countdown ? <span style={{ color: "var(--text-mute)", fontWeight: 600 }}>Resend in {countdown}s</span> : <button type="button" className="link" onClick={handleResend} disabled={resendStatus === "loading"}>{resendStatus === "loading" ? "Sending…" : "Resend OTP"}</button>}
        </div>
        {resendStatus === "sent" && countdown > 0 && <p className="ok-line" style={{ justifyContent: "center" }} role="status"><Icon name="check" size={16} /> A new 4-digit code has been sent.</p>}
        {resendStatus === "error" && <p className="msg" style={{ textAlign: "center" }} role="alert">We couldn't resend the email. Please try again in a moment.</p>}
      </form>
    </AuthLayout>
  );
}
