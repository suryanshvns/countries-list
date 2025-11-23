"use client";

import Link from "next/link";

export default function BackButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 group"
    >
      <svg
        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="font-medium">Back to Countries</span>
    </Link>
  );
}
