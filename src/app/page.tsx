"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./provider";
import { motion } from "framer-motion";
import { HeroEditorial } from "@/components/hero-editorial";
import { EditorialIntro } from "@/components/editorial-intro";
import { EditorialCountdown } from "@/components/editorial-countdown";
import { EditorialDetails } from "@/components/editorial-details";
import { EditorialSchedule } from "@/components/editorial-schedule";
import { EditorialHotels } from "@/components/editorial-hotels";
import { EditorialFaq } from "@/components/editorial-faq";
import { EditorialRsvp } from "@/components/editorial-rsvp";

// ═══════════════════════════════════════════════════════════════
// PAGE CONFIGURATION - Edit this section to customize your wedding website
// ═══════════════════════════════════════════════════════════════

const weddingConfig = {
  // Hero Section - Main banner with couple names
  hero: {
    content: {
      title: "Claudia & Niklas",
      subtitle:
        "Nie możemy się doczekać, aby wspólnie z Wami świętować naszą miłość",
      address: "ul. Belwederska 54/56, Warszawa",
      date: new Date(2026, 7, 8), // Month is 0-indexed (7 = August)
      time: "13:00",
    },
    heroImage: {
      imageSrc: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
      altText: "Claudia & Niklas",
    },
  },

  // Emotional introduction quote
  intro: {
    quote:
      "Każda wielka miłość zaczyna się od małego kroku. Oto początek naszej wspólnej drogi.",
  },

  // Countdown timer
  countdown: {
    weddingDate: "2026-08-08",
    title: "Odliczamy",
    subtitle: "dni do naszego wielkiego dnia",
  },

  // Event details - key information
  details: {
    title: "Szczegóły uroczystości",
    items: [
      { icon: "calendar" as const, label: "Data", value: "8 sierpnia 2026" },
      { icon: "clock" as const, label: "Godzina", value: "13:00" },
      { icon: "location" as const, label: "Miejsce", value: "Warszawa" },
      { icon: "dress" as const, label: "Dress code", value: "Elegancki" },
    ],
  },

  // Schedule timeline
  schedule: {
    title: "Harmonogram dnia",
    subtitle: "Plan naszego wspólnego święta",
    backgroundImage: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
    items: [
      { time: "12:30", title: "", description: "Przybycie gości" },
      { time: "13:00", title: "", description: "Ceremonia ślubna" },
      {
        time: "14:00",
        title: "",
        description: "Składanie życzeń i wspólne zdjęcia",
      },
      {
        time: "15:30",
        title: "",
        description: "Powitanie Pary Młodej na sali weselnej",
      },
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

  // Hotel recommendations
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

  // FAQ section
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

  // RSVP form
  rsvp: {
    title: "Potwierdź obecność",
    subtitle: "Prosimy o odpowiedź do",
    deadline: "15 lipca 2026",
  },
};

// ═══════════════════════════════════════════════════════════════
// PAGE COMPONENT - Main wedding website layout
// ═══════════════════════════════════════════════════════════════

export default function WeddingPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <main className="bg-editorial-cream min-h-screen">
      {/* Hero Section - Full screen banner with couple names */}
      <HeroEditorial
        content={weddingConfig.hero.content}
        heroImage={weddingConfig.hero.heroImage}
        backgroundImage={{ imageSrc: "" }}
      />

      {/* Emotional Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialIntro quote={weddingConfig.intro.quote} />
      </motion.section>

      {/* Countdown Timer */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialCountdown
          weddingDate={weddingConfig.countdown.weddingDate}
          title={weddingConfig.countdown.title}
          subtitle={weddingConfig.countdown.subtitle}
        />
      </motion.section>

      {/* Event Details Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialDetails
          title={weddingConfig.details.title}
          details={weddingConfig.details.items}
        />
      </motion.section>

      {/* Day Schedule Timeline */}
      <EditorialSchedule
        items={weddingConfig.schedule.items}
        title={weddingConfig.schedule.title}
        subtitle={weddingConfig.schedule.subtitle}
        backgroundImage={weddingConfig.schedule.backgroundImage}
      />

      {/* Hotel Recommendations */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialHotels
          hotels={weddingConfig.hotels.items}
          title={weddingConfig.hotels.title}
          subtitle={weddingConfig.hotels.subtitle}
        />
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialFaq
          items={weddingConfig.faq.items}
          title={weddingConfig.faq.title}
          subtitle={weddingConfig.faq.subtitle}
        />
      </motion.section>

      {/* RSVP Form */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <EditorialRsvp
          title={weddingConfig.rsvp.title}
          subtitle={weddingConfig.rsvp.subtitle}
          deadline={weddingConfig.rsvp.deadline}
        />
      </motion.section>
    </main>
  );
}
