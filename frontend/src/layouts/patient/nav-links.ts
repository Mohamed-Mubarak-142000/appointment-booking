import { tFn } from "../../locales";
import type { NavItem } from "../../types";

export const navItems: NavItem[] = [
  { name: tFn("common:navbar.home"), path: "/" },
  { name: tFn("common:navbar.about"), path: "/about" },
  { name: tFn("common:navbar.doctors"), path: "/doctors" },
  { name: tFn("common:navbar.contact"), path: "/contact" },
];
