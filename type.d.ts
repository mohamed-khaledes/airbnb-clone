 type ExploreItem = {
  img: string;
  location: string;
  distance: string;
};
 type LiveItem = {
  img: string;
  title: string;
};
 type ListingCardItem = {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
};
type SearchParams = {
  location: string;
  startDate: string;
  endDate: string;
  numOfGuests: string;
};

type ExploreData = ExploreItem[];
type LiveData = LiveItem[];
 type SearchResultData = ListingCardItem[];