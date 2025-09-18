import { format } from 'date-fns';
import UnitCard from '@/features/search/card';
import { getSearchResult } from '@/features/search/api';
import Header from '@/features/layouts/header';
import Footer from '@/features/layouts/footer';
import Map from '@/components/map';


const SearchResult = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>; // 👈 must be a Promise
}) => {
  const { location, startDate, endDate, numOfGuests } = await searchParams; // 👈 await here
  let formatedStartDate;
  let formatedEndDate;
  if (startDate && endDate) {
    formatedStartDate = format(new Date(startDate), 'dd MMMM yy');
    formatedEndDate = format(new Date(endDate), 'dd MMMM yy');
  }
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  const filters = [
    'Cancellation Flexibility',
    'Type of Place',
    'Price',
    'Rooms and Beds',
    'More filters',
  ];
  const searchResultData: SearchResultData = await getSearchResult();

  return (
      <>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
      <main>
        <section>
          <div className='container flex'>
            <div className='pt-14 pr-4'>
              <p className='text-xs'>
                300+ Stays - {range} - for {numOfGuests} guests
              </p>
              <h1 className='text-3xl font-semibold mt-2 mb-6 '>
                Stays in {location}
              </h1>
              <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                {filters.map((filter) => (
                  <button type='button' className='filter-btn' key={filter}>
                    {filter}
                  </button>
                ))}
              </div>
              <div>
                {searchResultData.map((unit) => (
                  <UnitCard key={unit.title} unit={unit}/>
                ))}
              </div>
            </div>
            <div className='hidden xl:inline-flex xl:min-w-[600px]'>
              <Map searchResultData={searchResultData} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchResult;