// Fills from the inline-start side, so it automatically runs right-to-left in Arabic.
export default function ProgressBar({ value, max, label }) {
  return (
    <div className="progress">
      <div className="progress-label">{label}</div>
      <div className="bar-track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
        <div className="bar-fill" style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}
