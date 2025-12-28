export type LocationHeaderProps = {
  title: string;
  description: string;
};

export type LocationImageProps = {
  imageSrc: string;
  altText: string;
};

export type LocationProps = {
  header: LocationHeaderProps;
  image: LocationImageProps;
};

export type LocationInfo = {
  title: string;
  description: string;
  address: string;
};

export type LocationsProps = {
  sectionTitle: string;
  headerTitle: string;
  locations: LocationInfo[];
  mapSrc: string;
};

export type HotelInfo = {
  title: string;
  phone: string;
  description: string;
  reservationLink: string;
};

export type HotelsProps = {
  hotels: HotelInfo[];
};

export type HeroContentProps = {
  title: string;
  subtitle: string;
  address: string;
  date: Date;
  time: string;
};

export type HeroImageProps = {
  imageSrc: string;
  altText: string;
};

export type BackgroundImageProps = {
  imageSrc: string;
};

export type HeroHorizontalProps = {
  content: HeroContentProps;
  heroImage: HeroImageProps;
  backgroundImage: BackgroundImageProps;
};

export type FaqItem = {
  title: string;
  desc: string;
};

export type FaqProps = {
  faqs: FaqItem[];
};

export type ContactPersonInfo = {
  name: string;
  phone: string;
  email: string;
  facebook?: string;
  x?: string;
  whatsapp?: string;
  signal?: string;
};

export type ContactProps = {
  persons: ContactPersonInfo[];
};

export type RsvpHeaderProps = {
  title: string;
  description: string;
};

export type RsvpButtonProps = {
  url: string;
};

export type RsvpProps = {
  header: RsvpHeaderProps;
  button: RsvpButtonProps;
};

export type SpotifyPlayerProps = {
  playlistUrl: string;
};

export type AddToPlaylistButtonProps = {
  buttonText: string;
};

export type SpotifyProps = {
  player: SpotifyPlayerProps;
  button: AddToPlaylistButtonProps;
};

export type ScheduleItemType = "ceremony" | "party";

export type ScheduleItemProps = {
  type: ScheduleItemType;
  title: string;
  description: string;
};

export type ScheduleProps = {
  items: ScheduleItemProps[];
};

export type FeatureCardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};
