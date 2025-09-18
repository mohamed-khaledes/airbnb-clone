import { getLive } from './api';
import LiveCard from './card';

const Live = async () => {
  const liveData: LiveData = await getLive();
  return (
    <section className='pt-6 my-5'>
      <div className='container'>
        <div className='flex space-x-3 overflow-scroll p-3 no-scrollbar'>
          {liveData.map((item) => (
            <LiveCard key={item.img} img={item.img} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Live;