"use client";

import { useState, useEffect, useRef } from "react";

const texts = [
  "Full-Stack Developer",
  "Software Engineer",
  "Web Designer",
  "Problem Solver",
  "AI/ML Explorer",
  "Tech Enthusiast",
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 75;
const PAUSE_AFTER = 1000;

export default function ConsoleText() {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [isDeleting, setDeleting] = useState(false);
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    const full = texts[idx];
    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && display === full) {
      delay = PAUSE_AFTER;
      timeoutRef.current = window.setTimeout(() => setDeleting(true), delay);
    } else if (isDeleting && display === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setDisplay((prev) =>
          isDeleting
            ? full.slice(0, prev.length - 1)
            : full.slice(0, prev.length + 1)
        );
      }, delay);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [display, isDeleting, idx]);

  return (
    <div className="inline-block">
      <div className="font-mono text-sky-400 bg-sky-400/10 rounded-lg  pl-1">
        {display}
        <span
          className="inline-block"
          style={{ animation: "blink 1s step-end infinite" }}
        >
          |
        </span>
      </div>
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
