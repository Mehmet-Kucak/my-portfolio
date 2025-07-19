"use client";

import type { HTMLAttributes } from "react";
import {
  useState,
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useLocale } from "next-intl";
const AVAILABLE = ["en", "tr"];
const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    return AVAILABLE.includes(locale as string) ? (locale as string) : "en";
  });

  const iconRef = useRef<LanguagesIconHandle>(null);

  const changeLang = (l: string) => {
    document.cookie = `locale=${l};path=/;max-age=31536000`;
    setLang(l);
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-right">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-24 gap-2 px-4 py-2 text-2xl text-white hover:bg-white/20 rounded-lg focus:none"
      >
        <LanguagesIcon ref={iconRef} size={20} />
        <span>{lang.toUpperCase()}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-24 rounded-lg shadow-lg overflow-hidden"
          >
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => changeLang(l.code)}
                  className="w-full text-left px-4 py-2 hover:bg-white/20"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface LanguagesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LanguagesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
  animate: (custom: number) => ({
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      opacity: { duration: 0.01, delay: custom * 0.1 },
      pathLength: {
        type: "spring",
        duration: 0.5,
        bounce: 0,
        delay: custom * 0.1,
      },
    },
  }),
};

const svgVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
const LanguagesIcon = forwardRef<LanguagesIconHandle, LanguagesIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const svgControls = useAnimation();
    const pathControls = useAnimation();

    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          svgControls.start("animate");
          pathControls.start("animate");
        },
        stopAnimation: () => {
          svgControls.start("normal");
          pathControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          svgControls.start("animate");
          pathControls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [onMouseEnter, pathControls, svgControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          svgControls.start("normal");
          pathControls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [svgControls, pathControls, onMouseLeave]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={svgVariants}
          animate={svgControls}
        >
          <motion.path
            d="m5 8 6 6"
            variants={pathVariants}
            custom={3}
            animate={pathControls}
          />
          <motion.path
            d="m4 14 6-6 3-3"
            variants={pathVariants}
            custom={2}
            animate={pathControls}
          />
          <motion.path
            d="M2 5h12"
            variants={pathVariants}
            custom={1}
            animate={pathControls}
          />
          <motion.path
            d="M7 2h1"
            variants={pathVariants}
            custom={0}
            animate={pathControls}
          />
          <motion.path
            d="m22 22-5-10-5 10"
            variants={pathVariants}
            custom={3}
            animate={pathControls}
          />
          <motion.path
            d="M14 18h6"
            variants={pathVariants}
            custom={3}
            animate={pathControls}
          />
        </motion.svg>
      </div>
    );
  }
);

LanguagesIcon.displayName = "LanguagesIcon";
