"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top when component mounts (page loads)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return null;
}
