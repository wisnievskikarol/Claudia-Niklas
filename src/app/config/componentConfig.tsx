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
  // {
  //   component: Schedule,
  //   props: { ... },
  // } ,
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
