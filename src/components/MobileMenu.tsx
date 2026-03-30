"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleResize() {
      setOpen(false);
    }

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={`menu--mobile${open ? " open" : ""}`}
    >
      <span
        className="menu__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu &#9662;
      </span>
      <ul className="menu__dropdown">
        {siteConfig.navItems.map((item) => (
          <li key={item.url}>
            <Link href={item.url} onClick={() => setOpen(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
