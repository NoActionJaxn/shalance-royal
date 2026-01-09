import type { CallToAction } from "~/types/cta";
import Container from "./Container";
import { Link } from "react-router";
import classNames from "classnames";

export interface FooterProps {
  logo?: React.ComponentType;
  menu?: CallToAction[];
  socials?: CallToAction[];
}

export function Footer({ logo: Logo, menu = [], socials = [] }: FooterProps) {
  return (
    <footer className="bg-slate-950 py-8 mt-16">
      <Container fluid className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-64 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="text-slate-200">
                {Logo && <div><Logo /></div>}
                <div>
                  <span className="text-lg font-semibold tracking-tight">
                    Shalancé Royal
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div>
            {menu.length > 0 && (
              <nav className="mb-4 md:mb-0 space-y-2">
                <h2 className="text-slate-200 font-semibold">Menu</h2>
                <ul className="flex flex-col">
                  {menu.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm font-medium text-slate-300 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          <div className="flex items-end justify-end">
            {socials.length > 0 && (
              <div>
                <ul className="flex gap-4">
                  {socials.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-slate-300 text-2xl"
                      >
                        <span className="sr-only">{item.label}</span>
                        <i className={classNames(item.icon?.prefix, item.icon?.iconName)} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}