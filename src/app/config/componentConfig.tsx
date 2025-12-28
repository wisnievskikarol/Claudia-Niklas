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
        {
          type: "ceremony",
          title: "12:30",
          description: "Przybycie Gości",
          translations: { de: { description: "Ankunft der Gäste" } },
        },
        {
          type: "ceremony",
          title: "13:00",
          description: "Ceremonia ślubna",
          translations: { de: { description: "Trauungszeremonie" } },
        },
        {
          type: "ceremony",
          title: "14:00",
          description: "Składanie życzeń i wspólne zdjęcia",
          translations: {
            de: { description: "Glückwünsche und gemeinsame Fotos" },
          },
        },
        {
          type: "party",
          title: "15:30",
          description: "Powitanie Pary Młodej na sali weselnej",
          translations: {
            de: { description: "Begrüßung des Brautpaares im Festsaal" },
          },
        },
        {
          type: "party",
          title: "16:00",
          description: "Obiad weselny",
          translations: { de: { description: "Hochzeitsessen" } },
        },
        {
          type: "party",
          title: "17:30",
          description: "Pierwszy taniec",
          translations: { de: { description: "Erster Tanz" } },
        },
        {
          type: "party",
          title: "18:00",
          description: "Zabawa taneczna",
          translations: { de: { description: "Tanzparty" } },
        },
        {
          type: "party",
          title: "19:30",
          description: "Kolacja",
          translations: { de: { description: "Abendessen" } },
        },
        {
          type: "party",
          title: "21:00",
          description: "Tort weselny",
          translations: { de: { description: "Hochzeitstorte" } },
        },
        {
          type: "party",
          title: "22:00",
          description: "Zabawy weselne",
          translations: { de: { description: "Hochzeitsspiele" } },
        },
        {
          type: "party",
          title: "00:00",
          description: "Oczepiny",
          translations: { de: { description: "Brautstraußwerfen" } },
        },
        {
          type: "party",
          title: "01:00",
          description: "Ciepły posiłek",
          translations: { de: { description: "Warme Mahlzeit" } },
        },
        {
          type: "party",
          title: "01:30",
          description: "Zabawa do białego rana",
          translations: { de: { description: "Feiern bis zum Morgengrauen" } },
        },
      ],
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
  {
    component: require("@/components/hotels/hotels").Hotels,
    props: {
      hotels: [
        {
          title: "Hotel Belwederski",
          phone: "+48 22 123 45 67",
          description:
            "Hotel położony 5 minut spacerem od miejsca uroczystości.",
          reservationLink: "https://hotel-belwederski.pl/",
          translations: {
            de: {
              title: "Hotel Belwederski",
              description:
                "Das Hotel liegt 5 Gehminuten vom Veranstaltungsort entfernt.",
            },
          },
        },
        {
          title: "Hotel Royal",
          phone: "+48 22 987 65 43",
          description: "Komfortowe pokoje i śniadanie w cenie.",
          reservationLink: "https://hotelroyal.pl/",
          translations: {
            de: {
              title: "Hotel Royal",
              description: "Komfortable Zimmer und Frühstück inklusive.",
            },
          },
        },
        {
          title: "Hotel City Center",
          phone: "+48 22 555 66 77",
          description: "W samym centrum Warszawy, dogodny dojazd komunikacją.",
          reservationLink: "https://hotelcitycenter.pl/",
          translations: {
            de: {
              title: "Hotel City Center",
              description:
                "Im Herzen von Warschau, gute Anbindung an den Nahverkehr.",
            },
          },
        },
      ],
    },
  },
  {
    component: require("@/components/spotify").Spotify,
    props: {
      player: {
        playlistUrl:
          "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator",
      },
      button: {
        buttonText: "Dodaj swoją piosenkę do playlisty!",
        translations: {
          de: {
            buttonText: "Füge deinen Song zur Playlist hinzu!",
          },
        },
      },
    },
  },
  // {
  //   component: Spotify,
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
        translations: {
          de: {
            label: "Zurückmelden",
          },
        },
      },
    } satisfies RsvpProps,
  },
  {
    component: Faq,
    props: {
      header: {
        title: "Często zadawane pytania",
        subtitle:
          "Ponieżej znajdziecie odpowiedzi na najczęściej zadawane przez Was pytania!",
        translations: {
          de: {
            title: "Häufig gestellte Fragen",
            subtitle:
              "Hier findet ihr Antworten auf die am häufigsten gestellten Fragen!",
          },
        },
      },
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
