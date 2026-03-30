import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function DesktopNav() {
  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__inner menu--desktop">
        {siteConfig.navItems.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
