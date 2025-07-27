"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const TYPING_SPEED = 100;
const DELETING_SPEED = 75;
const PAUSE_AFTER = 1500; // Increased pause for better UX
const CURSOR_BLINK_SPEED = 1000;

interface ChangingTextProps {
  children: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  "aria-live"?: "polite" | "assertive" | "off";
}

export default function ChangingText({
  children,
  className = "",
  typingSpeed = TYPING_SPEED,
  deletingSpeed = DELETING_SPEED,
  pauseDuration = PAUSE_AFTER,
  "aria-live": ariaLive = "polite",
}: ChangingTextProps) {
  const [display, setDisplay] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const texts = children.split("|").filter((text) => text.trim());

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scheduleNextUpdate = useCallback(
    (delay: number, callback: () => void) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    },
    []
  );

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && display === currentText) {
      // Finished typing, pause before deleting
      setIsPaused(true);
      delay = pauseDuration;
      scheduleNextUpdate(delay, () => {
        setIsPaused(false);
        setDeleting(true);
      });
    } else if (isDeleting && display === "") {
      // Finished deleting, move to next text
      setDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else if (!isPaused) {
      // Continue typing or deleting
      scheduleNextUpdate(delay, () => {
        setDisplay((prev) =>
          isDeleting
            ? currentText.slice(0, prev.length - 1)
            : currentText.slice(0, prev.length + 1)
        );
      });
    }
  }, [
    display,
    isDeleting,
    currentIndex,
    isPaused,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    scheduleNextUpdate,
  ]);

  // Handle case where there are no texts
  if (texts.length === 0) {
    return <span className={className}>No text provided</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      <span
        className="flex items-center font-mono text-sky-400 bg-sky-400/10 rounded-lg px-2 py-2"
        aria-live={ariaLive}
        aria-label={`Rotating text display, currently showing: ${
          display || "typing..."
        }`}
      >
        <span className="text-content"> &gt;_ {display}</span>
        <span
          className="cursor ml-1 inline-block w-[2px] h-[1em] bg-sky-400"
          style={{
            animation: `blink ${CURSOR_BLINK_SPEED}ms step-end infinite`,
            opacity: isPaused ? 1 : undefined,
          }}
          aria-hidden="true"
        />
      </span>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .cursor {
          vertical-align: baseline;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .cursor {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </span>
  );
}
