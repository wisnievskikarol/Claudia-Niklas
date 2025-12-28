import HeroHorizontal from "@/components/hero-horizontal";
import Location from "@/components/location";
// import Locations from "@/components/locations";
// import Schedule from "@/components/schedule/schedule";
// import Spotify from "@/components/spotify";
// import Hotels from "@/components/hotels/hotels";
import Rsvp from "@/components/rsvp";
import Faq from "@/components/faq";
import {
  LocationProps,
  LocationsProps,
  HotelsProps,
  HeroHorizontalProps,
  FaqProps,
  RsvpProps,
  SpotifyProps,
  ScheduleProps,
} from "@/app/types";

interface ComponentConfig<T> {
  component: React.ComponentType<T>;
  props: { [key: string]: any };
}

export const componentConfig: ComponentConfig<any>[] = [
  {
    component: HeroHorizontal,
    props: {
      content: {
        title: "Claudia & Niklas",
        subtitle:
          "Nie możemy się doczekać, aby wspólnie z Wami świętować naszą miłośc!",
        address: "ul. Belwederskiej 54/56 w Warszawie",
        date: new Date(2026, 7, 8),
        time: "12:00",
        translations: {
          de: {
            title: "Claudia & Niklas",
            subtitle:
              "Wir können es kaum erwarten, unsere Liebe gemeinsam mit euch zu feiern!",
            address: "Belwederska-Straße 54/56, Warschau",
            // date and time remain the same
          },
        },
      },
      heroImage: {
        imageSrc: "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
        altText: "flowers",
      },
      backgroundImage: {
        imageSrc: "/image/temp2.svg",
      },
    } satisfies HeroHorizontalProps,
  },
  // {
  //   component: Locations,
  //   props: { ... },
  // } ,
  {
    component: require("@/components/schedule/schedule").Schedule,
    props: {
      items: [
        { type: "ceremony", title: "12:30", description: "Przybycie Gości" },
        { type: "ceremony", title: "13:00", description: "Ceremonia ślubna" },
        {
          type: "ceremony",
          title: "14:00",
          description: "Składanie życzeń i wspólne zdjęcia",
        },
        {
          type: "party",
          title: "15:30",
          description: "Powitanie Pary Młodej na sali weselnej",
        },
        { type: "party", title: "16:00", description: "Obiad weselny" },
        { type: "party", title: "17:30", description: "Pierwszy taniec" },
        { type: "party", title: "18:00", description: "Zabawa taneczna" },
        { type: "party", title: "19:30", description: "Kolacja" },
        { type: "party", title: "21:00", description: "Tort weselny" },
        { type: "party", title: "22:00", description: "Zabawy weselne" },
        { type: "party", title: "00:00", description: "Oczepiny" },
        { type: "party", title: "01:00", description: "Ciepły posiłek" },
        {
          type: "party",
          title: "01:30",
          description: "Zabawa do białego rana",
        },
      ],
      // Custom style props for full-width, black translucent background, and background image
      customStyle: {
        sectionClass: "relative w-full py-0 px-0",
        overlayClass:
          "absolute inset-0 w-full h-full bg-black bg-opacity-70 z-10",
        contentClass:
          "relative z-20 flex flex-col items-center justify-center min-h-[700px] py-20",
        backgroundImage:
          "/image/hero/WhatsApp-Image-2025-12-13-at-18.33.59.webp",
      },
    },
  },
  // {
  //   component: Spotify,
  //   props: { ... },
  // } ,
  // {
  //   component: Hotels,
  //   props: { ... },
  // } ,
  {
    component: Rsvp,
    props: {
      header: {
        title: "Prosimy o potwierdzenie przybycia",
        description:
          "Cieszymy się, że będziemy mogli Was gościć na naszym wydarzeniu! Abyśmy mogli odpowiednio przygotować się na Wasze przybycie, prosimy o potwierdzenie swojej obecności.",
        translations: {
          de: {
            title: "Bitte um Rückmeldung",
            description:
              "Wir freuen uns, euch bei unserer Veranstaltung begrüßen zu dürfen! Damit wir uns gut auf eure Ankunft vorbereiten können, bitten wir um eure Rückmeldung.",
          },
        },
      },
      button: {
        url: "https://rsvp.gowedding.online/",
      },
    } satisfies RsvpProps,
  },
  {
    component: Faq,
    props: {
      faqs: [
        {
          title: "Jak dojechać na miejsce uroczystości?",
          desc: "Odpowiedzi będą dodane później...",
          translations: {
            de: {
              title: "Wie kommt man zum Veranstaltungsort?",
              desc: "Antworten werden später hinzugefügt...",
            },
          },
        },
        {
          title: "Czy na miejscu będzie zapewniony parking dla gości?",
          desc: "Odpowiedzi będą dodane później...",
          translations: {
            de: {
              title: "Gibt es Parkplätze für Gäste vor Ort?",
              desc: "Antworten werden später hinzugefügt...",
            },
          },
        },
        {
          title:
            "Czy istnieje możliwość zakwaterowania dla gości spoza miasta?",
          desc: "Odpowiedzi będą dodane później...",
          translations: {
            de: {
              title: "Gibt es Übernachtungsmöglichkeiten für auswärtige Gäste?",
              desc: "Antworten werden später hinzugefügt...",
            },
          },
        },
      ],
    } satisfies FaqProps,
  },
];
