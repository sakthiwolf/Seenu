import { useNavigate } from 'react-router-dom'
import fallbackImage from '../../../../assets/images/sliderOnePic.svg'


type ElectronicCategoryItem = {
  section: string
  name: string
  image: string
  categoryId: string
}

const ElectronicCategoryCard = ({ item }: { item: ElectronicCategoryItem }) => {
  const navigate=useNavigate();

  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
        <img
          className='w-full h-16 object-contain'
          src={item.image}
          alt={item.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
        <h2 className='font-semibold text-sm'>{item.name}</h2>
  
    </div>
  )
}

export default ElectronicCategoryCard