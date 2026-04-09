import HeroHorizontal from "@/components/hero-horizontal";
import Location from "@/components/location";
import Countdown from "@/components/countdown";
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
          "Nie możemy się doczekać, aby wspólnie z Wami świętować naszą miłość!",
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
  {
    component: Countdown,
    props: {
      weddingDate: "2026-08-08",
    },
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
          title: "15:15",
          description: "Powitanie Pary Młodej na sali weselnej",
          translations: {
            de: { description: "Begrüßung des Brautpaares im Festsaal" },
          },
        },
        {
          type: "party",
          title: "15:15",
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
      header: {
        title: "Polecane hotele",
        subtitle: "Poniżej znajduje się lista polecanych przez nas hoteli",
        translations: {
          de: {
            title: "Empfohlene Hotels",
            subtitle: "Unten findet ihr eine Liste unserer empfohlenen Hotels.",
          },
        },
      },
      hotels: [
        {
          title: "Hotel Bulwar",
          description:
            "Elegancki hotel położony w samym sercu Torunia, tuż nad brzegiem Wisły. Oferuje dostęp do parkingu. Odległość od miejsca uroczystości: ok. 5 minut samochodem.",
          reservationLink: "https://hotelbulwar.pl/",
          translations: {
            de: {
              title: "Hotel Bulwar",
              description:
                "Elegantes Hotel im Herzen von Toruń, direkt am Ufer der Weichsel. Bietet Parkplätze. Entfernung zum Veranstaltungsort: ca. 5 Minuten mit dem Auto.",
            },
          },
        },
        {
          title: "Hotel Filmar",
          description:
            "Komfortowy hotel w centrum miasta, w odległości około 15 minut spacerem od toruńskiej Starówki. Odległość od miejsca uroczystości: ok. 9 minut samochodem.",
          reservationLink: "https://hotelfilmar.pl/",
          translations: {
            de: {
              title: "Hotel Filmar",
              description:
                "Komfortables Hotel im Stadtzentrum, etwa 15 Gehminuten von der Altstadt von Toruń entfernt. Entfernung zum Veranstaltungsort: ca. 9 Minuten mit dem Auto.",
            },
          },
        },
        {
          title: "Hotel i Camping Tramp",
          description:
            "Hotel położony w pobliżu dworca kolejowego Toruń Główny (ok. 15 minut pieszo). Oferuje również dostęp do parkingu i znajduje się najbliżej miejsca uroczystości. Odległość od miejsca uroczystości: ok. 12 minut pieszo lub 4 minuty samochodem.",
          reservationLink: "https://www.campingtramp.pl/",
          translations: {
            de: {
              title: "Hotel i Camping Tramp",
              description:
                "Hotel in der Nähe des Bahnhofs Toruń Główny (ca. 15 Minuten zu Fuß). Bietet Parkplätze und liegt am nächsten zum Veranstaltungsort. Entfernung zum Veranstaltungsort: ca. 12 Minuten zu Fuß oder 4 Minuten mit dem Auto.",
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
          desc: "Najwygodniej dotrzeć na miejsce uroczystości samochodem lub taksówką. Istnieje również możliwość dojazdu komunikacją miejską - autobusem do przystanku Dworzec Główny 00, skąd spacer do obiektu zajmuje około 10 minut.",
          translations: {
            de: {
              title: "Wie kommt man zum Veranstaltungsort?",
              desc: "Am bequemsten erreicht ihr den Veranstaltungsort mit dem Auto oder Taxi. Es gibt auch eine Anbindung mit öffentlichen Verkehrsmitteln – Bus bis zur Haltestelle Dworzec Główny 00, von dort ca. 10 Minuten zu Fuß zum Objekt.",
            },
          },
        },
        {
          title: "Czy na miejscu będzie zapewniony parking dla gości?",
          desc: "Tak. Na terenie obiektu dostępny jest bezpłatny parking dla Gości, oferujący około 50 miejsc parkingowych, co zapewnia komfortowy i spokojny udział w uroczystości.",
          translations: {
            de: {
              title: "Gibt es Parkplätze für Gäste vor Ort?",
              desc: "Ja. Auf dem Gelände steht ein kostenloser Parkplatz für Gäste zur Verfügung, mit rund 50 Stellplätzen, was einen komfortablen und entspannten Besuch der Feier ermöglicht.",
            },
          },
        },
        {
          title:
            "Czy istnieje możliwość zakwaterowania dla gości spoza miasta?",
          desc: "Tak. Aby pobyt w Toruniu był jak najbardziej komfortowy, przygotowaliśmy propozycje noclegów położonych blisko miejsca uroczystości. Szczegóły dostępne są w sekcji ‘Polecane hotele’.",
          translations: {
            de: {
              title: "Gibt es Übernachtungsmöglichkeiten für auswärtige Gäste?",
              desc: 'Ja. Damit euer Aufenthalt in Toruń möglichst komfortabel ist, haben wir Unterkunftsvorschläge in der Nähe des Veranstaltungsorts vorbereitet. Details findet ihr im Abschnitt "Empfohlene Hotels".',
            },
          },
        },
      ],
    } satisfies FaqProps,
  },
];
