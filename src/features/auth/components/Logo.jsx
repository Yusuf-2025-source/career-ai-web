// CareerPath logo: a rising path of nodes ending in a teal goal node, plus the two-tone wordmark.
export default function Logo({ size = 44 }) {
  return (
    <div className="logo" aria-label="CareerPath">
      <svg width={size} height={size * 0.83} viewBox="0 0 46 38" aria-hidden="true">
        <defs>
          <linearGradient id="cp-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#2F3E6B" /><stop offset=".6" stopColor="#2E7FE8" /><stop offset="1" stopColor="#14C2B2" />
          </linearGradient>
          <radialGradient id="cp-teal" cx=".35" cy=".3">
            <stop offset="0" stopColor="#8FF5E6" /><stop offset="1" stopColor="#14B8A6" />
          </radialGradient>
        </defs>
        <path d="M7 29 17 18l9 8 12-18" fill="none" stroke="url(#cp-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="29" r="5" fill="#2F3E6B" />
        <circle cx="17" cy="18" r="3.4" style={{ fill: "var(--bg)" }} stroke="#2E7FE8" strokeWidth="2.2" />
        <circle cx="26" cy="26" r="3.4" style={{ fill: "var(--bg)" }} stroke="#2E7FE8" strokeWidth="2.2" />
        <circle cx="38" cy="8" r="6" fill="url(#cp-teal)" />
      </svg>
      <span className="wordmark"><i className="wm-dot" /><span className="c">Career</span><span className="p">Path</span></span>
    </div>
  );
}
