import Link from "next/link";
import { siteConfig } from "@/lib/config";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <Link href="/">
            <div className="logo">{siteConfig.logoText}</div>
          </Link>
        </div>
        <MobileMenu />
        <ThemeToggle />
      </div>
      <DesktopNav />
    </header>
  );
}
