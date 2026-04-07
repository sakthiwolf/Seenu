// import {type Deal } from '../../../../types/dealTypes'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import type { Deal } from '../../../../types/dealTypes';

const DealCard = ({ deal }: { deal: Deal }) => {
  const navigate = useNavigate();
  const categoryId = deal?.category?.categoryId || "";
  const image = deal?.category?.image || "/seller_banner_image.jpg";
  const discount = deal?.discount || 20;
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    setImageSrc("/seller_banner_image.jpg");
  };

  return (
    <div
      onClick={() => categoryId && navigate(`/products/${categoryId}`)}
      className='w-full cursor-pointer'
    >
      <img 
        className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top' 
        src={imageSrc} 
        alt="deal"
        onError={handleImageError}
      />
      <div className='border-4 border-black bg-black text-white p-2 text-center'>
        {/* <p className='text-lg font-semibold'>{deal.category.categoryId.split("_").join(" ")}</p> */}
        <p className='text-2xl font-bold'>{discount}% OFF</p>
        <p className='text-balance text-lg'>shop now</p>

      </div>
    </div>
  )
}

export default DealCard