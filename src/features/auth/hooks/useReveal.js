import { useEffect, useState } from "react";

/** Returns how many items are visible; grows by one every `step` ms (dynamic, one-after-another). */
export function useReveal(total, { start = 450, step = 700 } = {}) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(reduce ? total : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0, t;
    const tick = () => { i += 1; setCount(i); if (i < total) t = setTimeout(tick, step); };
    t = setTimeout(tick, start);
    return () => clearTimeout(t);
  }, [total, start, step, reduce]);
  return count;
}
