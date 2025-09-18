import Title from '@/components/ui/title';
import { getExplore } from './api';
import ExploreCard from './card';

const Explore = async () => {
  const exploreData: ExploreData = await getExplore();
  return (
    <section className='pt-6'>
      <div className='container'>
        <Title title='Explore Nearby' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exploreData.map((item) => (
            <ExploreCard
              key={item.img}
             item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;