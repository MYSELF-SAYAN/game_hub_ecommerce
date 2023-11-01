import React from 'react';
import { Link } from 'react-router-dom';
const Cards = ({ data }) => {
  const rand=Math.floor(Math.random() * (5000 - 1000 + 1) ) + 1000;

  return (
    <Link to={`/description/${data.id}`} className=''>
    <div className='w-[20rem] md:w-[10rem]  pb-3 rounded-2xl'>
      <img src={data.background_image} alt="" className=' object-fill'/>
      <h1 className='mt-2 text-xl' style={{fontFamily:"Brolimo"}}>{data.name}</h1>
      <h1 className='text-2xl'>₹ {rand}</h1>
    </div>
    </Link>
  );
}

export default Cards;
