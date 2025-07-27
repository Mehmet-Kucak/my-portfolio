"use client";

import type { HTMLAttributes } from "react";
import {
  useState,
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useEffect,
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  const changeLang = async (newLang: string) => {
    if (newLang === lang) {
      setOpen(false);
      return;
    }

    try {
      // Set cookie for persistence
      document.cookie = `locale=${newLang};path=/;max-age=31536000;SameSite=Lax`;
      setLang(newLang);
      setOpen(false);

      // Reload page to apply new locale
      window.location.reload();
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  const currentLanguage =
    languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="relative inline-block text-right">
      <motion.button
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center min-w-[6rem] gap-2 px-4 py-2 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Current language: ${currentLanguage.label}. Click to change language.`}
      >
        <LanguagesIcon ref={iconRef} size={20} />
        <span className="text-lg font-semibold leading-0">
          {lang.toUpperCase()}
        </span>
        <motion.svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 min-w-[8rem] bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl overflow-hidden z-50"
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                onClick={() => changeLang(language.code)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-150 focus:outline-none focus:bg-blue-600/20 hover:bg-white/10 ${
                  lang === language.code
                    ? "bg-blue-600/30 text-blue-200"
                    : "text-gray-200 hover:text-white"
                }`}
                role="option"
                aria-selected={lang === language.code}
                tabIndex={open ? 0 : -1}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span>{language.label}</span>
                  {lang === language.code && (
                    <motion.svg
                      className="w-4 h-4 ml-auto text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
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
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: 0.3 },
  },
  animate: (custom: number) => ({
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      opacity: { duration: 0.01, delay: custom * 0.1 },
      pathLength: {
        type: "spring",
        duration: 0.6,
        bounce: 0,
        delay: custom * 0.1,
      },
      pathOffset: {
        duration: 0.6,
        delay: custom * 0.1,
      },
    },
  }),
};

const svgVariants: Variants = {
  normal: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const LanguagesIcon = forwardRef<LanguagesIconHandle, LanguagesIconProps>(
  (
    { onMouseEnter, onMouseLeave, className = "", size = 28, ...props },
    ref
  ) => {
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
        }
        onMouseEnter?.(e);
      },
      [onMouseEnter, pathControls, svgControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          svgControls.start("normal");
          pathControls.start("normal");
        }
        onMouseLeave?.(e);
      },
      [svgControls, pathControls, onMouseLeave]
    );

    return (
      <div
        className={`flex items-center justify-center ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: size, height: size }}
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
          className="drop-shadow-sm"
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
            custom={4}
            animate={pathControls}
          />
          <motion.path
            d="M14 18h6"
            variants={pathVariants}
            custom={5}
            animate={pathControls}
          />
        </motion.svg>
      </div>
    );
  }
);

LanguagesIcon.displayName = "LanguagesIcon";
