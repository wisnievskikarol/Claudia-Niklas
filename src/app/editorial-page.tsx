"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./provider";
import { HeroEditorial } from "@/components/hero-editorial";
import { EditorialIntro } from "@/components/editorial-intro";
import { EditorialCountdown } from "@/components/editorial-countdown";
import { EditorialDetails } from "@/components/editorial-details";
import { EditorialSchedule } from "@/components/editorial-schedule";
import { EditorialGallery } from "@/components/editorial-gallery";
import { EditorialHotels } from "@/components/editorial-hotels";
import { EditorialFaq } from "@/components/editorial-faq";
import { EditorialRsvp } from "@/components/editorial-rsvp";

type SupportedLang = "pl" | "de";

type DetailItem = {
  icon: "calendar" | "clock" | "location" | "dress";
  label: string;
  value: string;
};
type ScheduleItem = { time: string; title: string; description?: string };
type HotelItem = {
  name: string;
  description: string;
  distance?: string;
  link?: string;
};
type FaqItem = { question: string; answer: string };
type CountdownLabels = {
  day: string;
  dayPlural: string;
  hour: string;
  hourPlural: string;
  minute: string;
  minutePlural: string;
};
type RsvpCopy = {
  nameLabel: string;
  attendanceLabel: string;
  attendanceOptions: { value: string; label: string }[];
  dietRestrictionsLabel: string;
  submitting: string;
  submitCta: string;
  submitError: string;
  missingEndpoint: string;
  successTitle: string;
  successBody: string;
};

type PageConfig = {
  hero: {
    content: {
      title: string;
      subtitle: string;
      address: string;
      date: Date;
      time: string;
    };
    heroImage: { imageSrc: string; altText: string };
  };
  intro: { quote: string };
  countdown: {
    weddingDate: string;
    title: string;
    subtitle: string;
    timeLabels: CountdownLabels;
  };
  details: { title: string; items: DetailItem[] };
  schedule: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    items: ScheduleItem[];
  };
  hotels: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    items: HotelItem[];
  };
  faq: { title: string; subtitle: string; items: FaqItem[] };
  rsvp: { title: string; subtitle: string; deadline: string; copy?: RsvpCopy };
};

// Page configuration - edit this to customize content
const pageConfig: Record<SupportedLang, PageConfig> = {
  pl: {
    hero: {
      content: {
        title: "Claudia & Niklas",
        subtitle: "",
        address: "Pałac Widokowy ul. Majdany 1, 87-100 Toruń",
        date: new Date(2026, 7, 8),
        time: "16:00",
      },
      heroImage: {
        imageSrc: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
        altText: "Claudia & Niklas",
      },
    },

    intro: {
      quote:
        "Każda wielka miłość zaczyna się od małego kroku. Oto początek naszej wspólnej drogi.",
    },

    countdown: {
      weddingDate: "2026-08-08",
      title: "Odliczamy",
      subtitle: "dni do naszego wielkiego dnia",
      timeLabels: {
        day: "dzień",
        dayPlural: "dni",
        hour: "godzina",
        hourPlural: "godzin",
        minute: "minuta",
        minutePlural: "minut",
      },
    },

    details: {
      title: "Szczegóły uroczystości",
      items: [
        { icon: "calendar" as const, label: "Data", value: "8 sierpnia 2026" },
        { icon: "clock" as const, label: "Godzina", value: "16:00" },
        {
          icon: "location" as const,
          label: "Miejsce",
          value: "Pałac Widokowy, Toruń",
        },
        { icon: "dress" as const, label: "Dress code", value: "Elegancki" },
      ],
    },

    schedule: {
      title: "Harmonogram dnia",
      subtitle: "Plan naszego wspólnego święta",
      backgroundImage: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
      items: [
        { time: "16:00", title: "", description: "Obiad weselny" },
        { time: "17:30", title: "", description: "Pierwszy taniec" },
        { time: "18:00", title: "", description: "Zabawa taneczna" },
        { time: "19:30", title: "", description: "Kolacja" },
        { time: "21:00", title: "", description: "Tort weselny" },
        { time: "22:00", title: "", description: "Zabawy weselne" },
        { time: "00:00", title: "", description: "Oczepiny" },
        { time: "01:00", title: "", description: "Ciepły posiłek" },
        { time: "01:30", title: "", description: "Zabawa do białego rana" },
      ],
    },

    hotels: {
      title: "Noclegi",
      subtitle: "Polecane przez nas miejsca",
      ctaLabel: "Rezerwuj",
      items: [
        {
          name: "Hotel Bulwar",
          description:
            "Elegancki hotel położony w samym sercu Torunia, tuż nad brzegiem Wisły. Oferuje dostęp do parkingu.",
          distance: "Ok. 5 minut samochodem od miejsca uroczystości",
          link: "https://hotelbulwar.pl/",
        },
        {
          name: "Hotel Filmar",
          description:
            "Komfortowy hotel w centrum miasta, w odległości około 15 minut spacerem od toruńskiej Starówki.",
          distance: "Ok. 9 minut samochodem od miejsca uroczystości",
          link: "https://hotelfilmar.pl/",
        },
        {
          name: "Hotel i Camping Tramp",
          description:
            "Hotel położony w pobliżu dworca kolejowego Toruń Główny (ok. 15 minut pieszo). Oferuje również dostęp do parkingu i znajduje się najbliżej miejsca uroczystości.",
          distance:
            "Ok. 12 minut pieszo lub 4 minuty samochodem od miejsca uroczystości",
          link: "https://www.campingtramp.pl/index.php/contacts",
        },
      ],
    },

    faq: {
      title: "Często zadawane pytania",
      subtitle: "Wszystko, co musisz wiedzieć",
      items: [
        {
          question: "Czy mogę przyjść z osobą towarzyszącą?",
          answer:
            "Tak, oczywiście! Prosimy tylko o wcześniejsze potwierdzenie liczby osób w formularzu RSVP.",
        },
        {
          question: "Jaki jest dress code?",
          answer:
            "Zachęcamy do eleganckiego stroju. Panowie w garniturach, Panie w sukniach wieczorowych lub koktajlowych.",
        },
        {
          question: "Czy na miejscu będzie parking?",
          answer:
            "Tak, miejsce uroczystości dysponuje dużym parkingiem dla gości.",
        },
        {
          question: "Do kiedy powinienem potwierdzić obecność?",
          answer:
            "Prosimy o potwierdzenie do 15 lipca 2026 roku przez formularz RSVP na tej stronie.",
        },
        {
          question: "Czy dzieci są zaproszone na wesele?",
          answer:
            "Chcielibyśmy, aby nasz ślub był wyjątkowym i niezapomnianym przeżyciem dla nas wszystkich. Zapraszamy Was z całego serca do wspólnego świętowania i cieszenia się tym dniem bez trosk, robiąc sobie jednocześnie małą przerwę od Waszych najmniejszych skarbów.",
        },
      ],
    },

    rsvp: {
      title: "Potwierdź obecność",
      subtitle: "Prosimy o odpowiedź do",
      deadline: "15 lipca 2026",
      copy: undefined,
    },
  },
  de: {
    hero: {
      content: {
        title: "Claudia & Niklas",
        subtitle:
          "Wir können es kaum erwarten, unsere Liebe mit euch zu feiern",
        address: "Pałac Widokowy ul. Majdany 1, 87-100 Toruń",
        date: new Date(2026, 7, 8),
        time: "16:00",
      },
      heroImage: {
        imageSrc: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
        altText: "Claudia & Niklas",
      },
    },

    intro: {
      quote:
        "Jede große Liebe beginnt mit einem kleinen Schritt. Dies ist der Anfang unseres gemeinsamen Weges.",
    },

    countdown: {
      weddingDate: "2026-08-08",
      title: "Wir zählen",
      subtitle: "Tage bis zu unserem großen Tag",
      timeLabels: {
        day: "Tag",
        dayPlural: "Tage",
        hour: "Stunde",
        hourPlural: "Stunden",
        minute: "Minute",
        minutePlural: "Minuten",
      },
    },

    details: {
      title: "Details zur Feier",
      items: [
        { icon: "calendar" as const, label: "Datum", value: "8. August 2026" },
        { icon: "clock" as const, label: "Uhrzeit", value: "16:00" },
        {
          icon: "location" as const,
          label: "Ort",
          value: "Pałac Widokowy, Toruń",
        },
        { icon: "dress" as const, label: "Dresscode", value: "Elegant" },
      ],
    },

    schedule: {
      title: "Tagesablauf",
      subtitle: "Plan unseres gemeinsamen Festes",
      backgroundImage: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
      items: [
        { time: "16:00", title: "", description: "Hochzeitsdinner" },
        { time: "17:30", title: "", description: "Erster Tanz" },
        { time: "18:00", title: "", description: "Tanzparty" },
        { time: "19:30", title: "", description: "Abendessen" },
        { time: "21:00", title: "", description: "Hochzeitstorte" },
        { time: "22:00", title: "", description: "Hochzeitsspiele" },
        { time: "00:00", title: "", description: "Mitternachtsrituale" },
        { time: "01:00", title: "", description: "Warme Speise" },
        { time: "01:30", title: "", description: "Feier bis zum Morgengrauen" },
      ],
    },

    hotels: {
      title: "Unterkünfte",
      subtitle: "Unsere Empfehlungen",
      ctaLabel: "Buchen",
      items: [
        {
          name: "Hotel Bulwar",
          description:
            "Elegantes Hotel im Herzen von Toruń, direkt an der Weichsel. Parkplätze verfügbar.",
          distance: "Ca. 5 Minuten mit dem Auto vom Veranstaltungsort",
          link: "https://hotelbulwar.pl/",
        },
        {
          name: "Hotel Filmar",
          description:
            "Komfortables Hotel im Stadtzentrum, etwa 15 Minuten zu Fuß von der Altstadt von Toruń.",
          distance: "Ca. 9 Minuten mit dem Auto vom Veranstaltungsort",
          link: "https://hotelfilmar.pl/",
        },
        {
          name: "Hotel i Camping Tramp",
          description:
            "Hotel in der Nähe des Bahnhofs Toruń Główny (ca. 15 Minuten zu Fuß). Parkplätze vorhanden; liegt am nächsten am Veranstaltungsort.",
          distance:
            "Ca. 12 Minuten zu Fuß oder 4 Minuten mit dem Auto vom Veranstaltungsort",
          link: "https://www.campingtramp.pl/index.php/contacts",
        },
      ],
    },

    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Alles, was du wissen musst",
      items: [
        {
          question: "Kann ich eine Begleitung mitbringen?",
          answer:
            "Ja, natürlich! Bitte bestätige die Anzahl der Personen vorab im RSVP-Formular.",
        },
        {
          question: "Welcher Dresscode gilt?",
          answer:
            "Wir freuen uns über elegante Kleidung. Herren im Anzug, Damen in Abend- oder Cocktailkleidern.",
        },
        {
          question: "Gibt es Parkplätze vor Ort?",
          answer:
            "Ja, der Veranstaltungsort verfügt über einen großen Parkplatz für Gäste.",
        },
        {
          question: "Bis wann soll ich zusagen?",
          answer:
            "Bitte bestätige bis zum 15. Juli 2026 über das Formular auf dieser Seite.",
        },
        {
          question: "Sind Kinder zur Hochzeit eingeladen?",
          answer:
            "Unsere Hochzeit soll ein unvergesslicher Moment für uns alle werden. Wir laden Euch herzlich ein, diesen besonderen Tag in vollen Zügen unbeschwert mit uns zu genießen und Euch dabei eine kleine Auszeit von Euren kleinen Lieblingen zu gönnen.",
        },
      ],
    },

    rsvp: {
      title: "Zusagen",
      subtitle: "Bitte antworte bis",
      deadline: "15. Juli 2026",
      copy: {
        nameLabel: "Bitte gib deinen Vor- und Nachnamen an",
        attendanceLabel: "Wirst du an unserer Hochzeit teilnehmen?",
        attendanceOptions: [
          { value: "yes", label: "Ja" },
          { value: "no", label: "Nein" },
        ],
        dietRestrictionsLabel:
          "Hast du besondere Ernährungswünsche oder Allergien, die wir beachten sollten?",
        submitting: "Senden...",
        submitCta: "Antwort senden",
        submitError:
          "Die Antwort konnte nicht gesendet werden. Bitte versuche es erneut.",
        missingEndpoint: "Keine konfigurierte Formular-URL vorhanden.",
        successTitle: "Danke!",
        successBody: "Deine Antwort wurde gespeichert. Bis bald!",
      },
    },
  },
};

// Section wrapper - simple div for performance (no animations)
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export default function EditorialPage() {
  const { lang } = useContext(LanguageContext);
  const currentLang: SupportedLang = lang === "de" ? "de" : "pl";
  const content = pageConfig[currentLang];

  return (
    <main className="bg-editorial-cream">
      {/* Hero Section */}
      <HeroEditorial
        content={content.hero.content}
        heroImage={content.hero.heroImage}
        backgroundImage={{ imageSrc: "" }}
      />

      {/* Emotional Intro */}
      <Section>
        <EditorialIntro quote={content.intro.quote} />
      </Section>

      {/* Countdown */}
      <Section>
        <EditorialCountdown
          weddingDate={content.countdown.weddingDate}
          title={content.countdown.title}
          subtitle={content.countdown.subtitle}
          timeLabels={content.countdown.timeLabels}
        />
      </Section>

      {/* Event Details */}
      <Section>
        <EditorialDetails
          title={content.details.title}
          details={content.details.items}
        />
      </Section>

      {/* Schedule */}
      <Section>
        <EditorialSchedule
          items={content.schedule.items}
          title={content.schedule.title}
          subtitle={content.schedule.subtitle}
          backgroundImage={content.schedule.backgroundImage}
        />
      </Section>

      {/* Hotels */}
      <Section>
        <EditorialHotels
          hotels={content.hotels.items}
          title={content.hotels.title}
          subtitle={content.hotels.subtitle}
          ctaLabel={content.hotels.ctaLabel}
        />
      </Section>

      {/* FAQ */}
      <Section>
        <EditorialFaq
          items={content.faq.items}
          title={content.faq.title}
          subtitle={content.faq.subtitle}
        />
      </Section>

      {/* RSVP */}
      <Section>
        <EditorialRsvp
          title={content.rsvp.title}
          subtitle={content.rsvp.subtitle}
          deadline={content.rsvp.deadline}
          copy={content.rsvp.copy}
        />
      </Section>
    </main>
  );
}
