"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./provider";
import { motion } from "framer-motion";
import { HeroEditorial } from "@/components/hero-editorial";
import { EditorialIntro } from "@/components/editorial-intro";
import { EditorialCountdown } from "@/components/editorial-countdown";
import { EditorialDetails } from "@/components/editorial-details";
import { EditorialSchedule } from "@/components/editorial-schedule";
import { EditorialGallery } from "@/components/editorial-gallery";
import { EditorialHotels } from "@/components/editorial-hotels";
import { EditorialFaq } from "@/components/editorial-faq";
import { EditorialRsvp } from "@/components/editorial-rsvp";

// Page configuration - edit this to customize content
const pageConfig = {
  hero: {
    content: {
      title: "Claudia & Niklas",
      subtitle:
        "Nie możemy się doczekać, aby wspólnie z Wami świętować naszą miłość",
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
        link: "https://hoteltramp.pl/",
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
    ],
  },

  rsvp: {
    title: "Potwierdź obecność",
    subtitle: "Prosimy o odpowiedź do",
    deadline: "15 lipca 2026",
  },
};

// Section wrapper with consistent spacing
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EditorialPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <main className="bg-editorial-cream">
      {/* Hero Section */}
      <HeroEditorial
        content={pageConfig.hero.content}
        heroImage={pageConfig.hero.heroImage}
        backgroundImage={{ imageSrc: "" }}
      />

      {/* Emotional Intro */}
      <Section>
        <EditorialIntro quote={pageConfig.intro.quote} />
      </Section>

      {/* Countdown */}
      <Section>
        <EditorialCountdown
          weddingDate={pageConfig.countdown.weddingDate}
          title={pageConfig.countdown.title}
          subtitle={pageConfig.countdown.subtitle}
        />
      </Section>

      {/* Event Details */}
      <Section>
        <EditorialDetails
          title={pageConfig.details.title}
          details={pageConfig.details.items}
        />
      </Section>

      {/* Schedule */}
      <Section>
        <EditorialSchedule
          items={pageConfig.schedule.items}
          title={pageConfig.schedule.title}
          subtitle={pageConfig.schedule.subtitle}
          backgroundImage={pageConfig.schedule.backgroundImage}
        />
      </Section>

      {/* Hotels */}
      <Section>
        <EditorialHotels
          hotels={pageConfig.hotels.items}
          title={pageConfig.hotels.title}
          subtitle={pageConfig.hotels.subtitle}
        />
      </Section>

      {/* FAQ */}
      <Section>
        <EditorialFaq
          items={pageConfig.faq.items}
          title={pageConfig.faq.title}
          subtitle={pageConfig.faq.subtitle}
        />
      </Section>

      {/* RSVP */}
      <Section>
        <EditorialRsvp
          title={pageConfig.rsvp.title}
          subtitle={pageConfig.rsvp.subtitle}
          deadline={pageConfig.rsvp.deadline}
        />
      </Section>
    </main>
  );
}
