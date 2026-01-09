import { useState } from "react";
import { Link } from "react-router";

import type { CallToAction } from "~/types/cta";
import MenuButton from "./MenuButton";
import Container from "./Container";

interface HeaderProps {
  Logo?: React.ComponentType;
  menu: CallToAction[];
  isOpen?: boolean;
  toggleMenu?: () => void;
}

export function Header({ menu, Logo, isOpen = false, toggleMenu }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <Container fluid className="flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className={isOpen ? "text-slate-200" : "text-slate-900"}>
            {Logo && <div><Logo /></div>}
            <div>
              <span className="text-lg font-semibold tracking-tight">
                Shalancé Royal
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MenuButton isOpen={isOpen} onClick={toggleMenu} />
      </Container>
    </header>
  );
}