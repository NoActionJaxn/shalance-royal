import { Link, useLocation } from "react-router";
import React from "react";
import classNames from "classnames";
import MenuButton from "./MenuButton";
import Container from "./Container";
import type { CallToAction } from "~/types/cta";

interface HeaderProps {
  Logo?: React.ComponentType;
  menu: CallToAction[];
  isOpen?: boolean;
  toggleMenu?: () => void;
}

export default function Header({ menu, Logo, isOpen = false, toggleMenu }: HeaderProps) {
  const location = useLocation();
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [isOverDark, setIsOverDark] = React.useState(false);

  React.useEffect(() => {
    function isPointOverDark(x: number, y: number) {
      const stack = (document as any).elementsFromPoint
        ? (document as any).elementsFromPoint(x, y) as Element[]
        : [document.elementFromPoint(x, y)].filter(Boolean) as Element[];
      for (const el of stack) {
        if (el?.closest('[data-dark]')) return true;
      }
      return false;
    }

    function updateIsDark() {
      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      // Sample just below the header to detect underlying section
      const x = rect.left + rect.width / 2;
      const y = rect.bottom + 1;
      const overDark = isPointOverDark(x, y);
      setIsOverDark(overDark);
    }

    // Run once now and again on next frame to catch route paint
    updateIsDark();
    const raf = requestAnimationFrame(updateIsDark);
    window.addEventListener('scroll', updateIsDark, { passive: true });
    document.addEventListener('scroll', updateIsDark, { passive: true, capture: true });
    window.addEventListener('touchmove', updateIsDark, { passive: true });
    window.addEventListener('wheel', updateIsDark, { passive: true });
    window.addEventListener('resize', updateIsDark);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateIsDark);
      document.removeEventListener('scroll', updateIsDark, { capture: true } as any);
      window.removeEventListener('touchmove', updateIsDark);
      window.removeEventListener('wheel', updateIsDark);
      window.removeEventListener('resize', updateIsDark);
    };
  }, [isOpen, location.pathname]);
  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-40">
      <Container fluid className="flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className={isOverDark ? "text-slate-100" : "text-slate-900"}>
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
              className={classNames(
                "text-sm font-medium transition-colors",
                isOverDark ? "text-slate-100 hover:text-slate-200" : "text-slate-900 hover:text-slate-700"
              )}
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