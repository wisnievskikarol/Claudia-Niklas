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
      { name: "Plan uroczystości", href: "#harmonogram" },
      { name: "Polecane hotele", href: "#hotele" },
      { name: "Spotify", href: "#spotify" },
      { name: "RSVP", href: "#rsvp" },
      { name: "Często zadawane pytania", href: "#q&a" },
    ],
  },
  de: {
    brand: "Claudia & Niklas",
    menu: [
      { name: "Ort", href: "#miejsce" },
      { name: "Ablauf", href: "#harmonogram" },
      { name: "Empfohlene Hotels", href: "#hotele" },
      { name: "Spotify", href: "#spotify" },
      { name: "RSVP", href: "#rsvp" },
      { name: "Häufig gestellte Fragen", href: "#q&a" },
    ],
  },
};

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

// LanguageSwitcher component
function LanguageSwitcher({
  mobile,
  isWhite,
}: {
  mobile?: boolean;
  isWhite?: boolean;
}) {
  const { lang, setLang } = useContext(LanguageContext);
  const btnClass =
    "px-2 py-1 rounded font-semibold transition-colors duration-200 " +
    (isWhite
      ? "text-white hover:bg-white/10"
      : "text-secondary hover:bg-secondary/10");

  return (
    <div
      className={
        mobile
          ? "mt-6 mb-4 flex items-center justify-center gap-4"
          : "hidden items-center gap-4 lg:flex ml-6"
      }
    >
      <button
        className={
          btnClass +
          (lang === "pl" ? (isWhite ? " bg-white/20" : " bg-secondary/20") : "")
        }
        onClick={() => setLang("pl")}
      >
        PL
      </button>
      <button
        className={
          btnClass +
          (lang === "de" ? (isWhite ? " bg-white/20" : " bg-secondary/20") : "")
        }
        onClick={() => setLang("de")}
      >
        DE
      </button>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [onSchedule, setOnSchedule] = React.useState(false);
  const { lang } = useContext(LanguageContext) as { lang: SupportedLang };
  const nav = NAV_TRANSLATIONS[lang as SupportedLang] || NAV_TRANSLATIONS.pl;

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  function NavItem({ children, href }: NavItemProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href && href.startsWith("#")) {
        e.preventDefault();
        setOpen(false);
        const id = href.slice(1);
        const el = document.getElementById(id);
        const nav = document.getElementById("navbar-main");
        if (el) {
          const navHeight = nav ? nav.offsetHeight : 0;
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elTop - navHeight - 8, // 8px extra offset
            behavior: "smooth",
          });
        }
      }
    };
    return (
      <li className="hover:underline">
        <Typography
          as="a"
          variant="paragraph"
          href={href || "#"}
          onClick={handleClick}
          className={
            onSchedule
              ? "flex items-center gap-2 py-4 font-normal text-white"
              : "flex items-center gap-2 py-4 font-normal text-secondary"
          }
        >
          {children}
        </Typography>
      </li>
    );
  }

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);

    function handleScroll() {
      const section = document.getElementById("harmonogram");
      const nav = document.getElementById("navbar-main");
      if (!section || !nav) return;
      const sectionRect = section.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const tolerance = 4;
      const isDirectlyAbove =
        Math.abs(navRect.bottom - sectionRect.top) <= tolerance;
      setOnSchedule(isDirectlyAbove);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="navbar-main"
      className={
        `px-2 backdrop-blur-xl w-full fixed top-0 z-50 py-5 md:py-2 transition-colors duration-300 ` +
        (onSchedule
          ? "bg-primary/90 bg-opacity-10 text-white"
          : "bg-primary/90 bg-opacity-10 text-secondary")
      }
    >
      <div className="container mx-auto flex items-center justify-between px-2 lg:px-0">
        <a href="#">
          <Typography
            variant="lead"
            className={
              onSchedule
                ? "font-normal text-white"
                : "font-normal text-secondary"
            }
          >
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

        <LanguageSwitcher isWhite={onSchedule} />

        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon
              strokeWidth={2}
              className={`h-6 w-6 ${onSchedule ? "text-white" : "text-secondary"}`}
            />
          ) : (
            <Bars3Icon
              strokeWidth={2}
              className={`h-6 w-6 ${onSchedule ? "text-white" : "text-secondary"}`}
            />
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
          <LanguageSwitcher mobile isWhite={onSchedule} />
        </div>
      </Collapse>
    </div>
  );
}

export default Navbar;
