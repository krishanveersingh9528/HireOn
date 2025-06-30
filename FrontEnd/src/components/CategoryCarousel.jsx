import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const category = [
  'FrontEnd Developer',
  'BackEnd Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-100 to-blue-100 py-12 px-6 rounded-3xl border border-slate-200 shadow-lg mx-4 md:mx-16 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">
        Explore by Category
      </h2>

      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {category.map((item, idx) => (
            <CarouselItem
              key={idx}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(item)}
                className="rounded-full bg-white text-gray-800 hover:bg-slate-100 shadow-md font-medium cursor-pointer"
                variant="outline"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
