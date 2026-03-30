"use client";

import { useEffect, useRef } from "react";

/**
 * Renders pre-rendered HTML from the blog author's own markdown files.
 * Content is trusted (author-written, processed server-side via unified/rehype).
 */
export default function PostContent({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Enhance code blocks with copy buttons and language labels
    const figures = contentRef.current.querySelectorAll(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figure) => {
      const pre = figure.querySelector("pre");
      if (!pre) return;

      const lang = pre.getAttribute("data-language") ?? "";

      // Check if already enhanced
      if (figure.querySelector(".code-title")) return;

      // Create title bar
      const titleDiv = document.createElement("div");
      titleDiv.className = "code-title";

      const langSpan = document.createElement("span");
      langSpan.textContent = lang.toUpperCase();
      titleDiv.appendChild(langSpan);

      // Add copy button if clipboard API is available
      if (navigator.clipboard) {
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-button";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
          const code = pre.querySelector("code");
          if (!code) return;
          const text = code.innerText.trim();
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "Copied!";
            setTimeout(() => {
              copyBtn.textContent = "Copy";
            }, 1000);
          });
        });
        titleDiv.appendChild(copyBtn);
      }

      figure.insertBefore(titleDiv, pre);
    });
  }, [html]);

  // Content is author-written markdown rendered to HTML server-side (trusted)
  return (
    <div
      ref={contentRef}
      className="post-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
