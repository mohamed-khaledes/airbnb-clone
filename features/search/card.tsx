'use client'
import Image from 'next/image';
import { StarIcon,HeartIcon } from '@heroicons/react/solid';
import { useState } from 'react';

type ListingCardProps = Omit<ListingCardItem, 'long' | 'lat'>;
const UnitCard = ({unit}:{unit: ListingCardProps}) => {
  const [isFavorite,setIsFavorite] = useState(false)
  const [isRated,setIsRated] = useState(false)
  return (
    <div className='flex my-2 p-2 border-gray-200 border-b cursor-pointer pr-4 hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t'>
      <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
        <Image
          src={unit?.img}
          fill
          className='rounded-2xl object-cover'
          alt='unit-Card'
        />
      </div>
      <div className='flex flex-col flex-grow pl-5'>
        <div className='flex justify-between'>
          <p>{unit?.location}</p>
          <HeartIcon onClick={()=>setIsFavorite(!isFavorite)} className={`h-7 cursor-pointer ${isFavorite&&'text-red-500'}`} />
        </div>
        <h4 className='text-xl'>{unit?.title}</h4>
        <div className='border-b w-10 pt-2' />
        <p className='pt-2 text-sm text-gray-500 flex-grow'>{unit?.description}</p>
        <div className='flex justify-between items-end pt-5'>
          <p className='flex items-center'>
            <StarIcon onClick={()=>setIsRated(!isRated)} className={`h-5 ${isRated&&'text-red-400'}`} />
            {unit?.star}
          </p>
          <div>
            <p className='text-lg lg:text-2xl font-semibold pb-2'>{unit?.price}</p>
            <p className='text-right font-extralight '>{unit?.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCard;