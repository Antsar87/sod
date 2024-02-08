'use client';

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Image from 'next/image';

import { useEffect, useRef } from 'react';

const CaruselComponent = ({ data }) => {
  const myCarousel = useRef();

  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      // Your custom options for a specific gallery
    });
  }, []);

  console.log(data);

  return (
    <div className="carousel" ref={myCarousel}>
      {data?.map((item) => (
        <div className="carousel-item w-full" key={item.cloudinary_id}>
          <a
            data-src={item.cloudinary_url}
            data-fancybox="gallery"
            // data-caption="Caption #1"
          >
            <Image priority src={item.cloudinary_url} className='w-full object-cover' fill/>
          </a>
        </div>
      ))}
      {/* 
      <div class="f-carousel__slide">2</div>
      <div class="f-carousel__slide">3</div> */}
    </div>
  );
};

export default CaruselComponent;
