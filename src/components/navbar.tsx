import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Collapse,
  IconButton,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";

type SupportedLang = "pl" | "de";
import { LanguageContext } from "@/app/provider";

const NAV_TRANSLATIONS: Record<
  SupportedLang,
  { brand: string; menu: { name: string; href: string }[] }
> = {
  pl: {
    brand: "Claudia & Niklas",
    menu: [
      { name: "Miejsce", href: "#miejsce" },
      { name: "RSVP", href: "#rsvp" },
      { name: "Często zadawane pytania", href: "#q&a" },
    ],
  },
  de: {
    brand: "Claudia & Niklas",
    menu: [
      { name: "Ort", href: "#miejsce" },
      { name: "RSVP", href: "#rsvp" },
      { name: "Häufig gestellte Fragen", href: "#q&a" },
    ],
  },
};

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { lang } = useContext(LanguageContext) as { lang: SupportedLang };
  const nav = NAV_TRANSLATIONS[lang as SupportedLang] || NAV_TRANSLATIONS.pl;

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  function NavItem({ children, href }: NavItemProps) {
    return (
      <li onClick={() => setOpen(false)} className="hover:underline">
        <Typography
          as="a"
          variant="paragraph"
          href={href || "#"}
          className="flex items-center gap-2 py-4 font-normal text-secondary"
        >
          {children}
        </Typography>
      </li>
    );
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className="px-2 backdrop-blur-xl bg-primary/90 w-full fixed bg-opacity-10 top-0 z-50 py-5 md:py-2">
      <div className="container mx-auto flex items-center justify-between px-2 lg:px-0">
        <a href="#">
          <Typography variant="lead" className="font-normal text-secondary">
            {nav.brand}
          </Typography>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.menu.map(({ name, href }) => (
            <NavItem key={name} href={href}>
              {name}
            </NavItem>
          ))}
        </ul>
        {/* Language Switcher */}
        <LanguageSwitcher />
        <IconButton
          variant="text"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6 fill-secondary" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6 fill-secondary" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-b border-secondary px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {nav.menu.map(({ name, href }) => (
              <NavItem key={name} href={href}>
                {name}
              </NavItem>
            ))}
          </ul>
          {/* Language Switcher for mobile */}
          <LanguageSwitcher mobile />
        </div>
      </Collapse>
    </div>
  );
}

// LanguageSwitcher component
function LanguageSwitcher({ mobile }: { mobile?: boolean }) {
  const { lang, setLang } = useContext(LanguageContext);
  const btnClass =
    "px-2 py-1 rounded hover:bg-secondary/10 text-secondary font-semibold" +
    (mobile ? "" : "");
  return (
    <div
      className={
        mobile
          ? "mt-6 mb-4 flex items-center justify-center gap-4"
          : "hidden items-center gap-4 lg:flex ml-6"
      }
    >
      <button
        className={btnClass + (lang === "pl" ? " bg-secondary/20" : "")}
        onClick={() => setLang("pl")}
      >
        PL
      </button>
      <button
        className={btnClass + (lang === "de" ? " bg-secondary/20" : "")}
        onClick={() => setLang("de")}
      >
        DE
      </button>
    </div>
  );
}

export default Navbar;
