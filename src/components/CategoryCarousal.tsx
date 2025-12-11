import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchJobByQuery } from '@/redux/jobsSlice'

const category = [
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'PHP Developer',
  'Node.js Developer'
]

export default function CategoryCarousel() {
  const dispatch = useDispatch()
  const searchJobHandler = (item: string) => {
    dispatch(setSearchJobByQuery(item))
  }
  return (
    <div className="mx-auto flex w-full justify-center py-10">
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full max-w-xl"
      >
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                variant={'outline'}
                className="rounded-full px-4"
                onClick={() => searchJobHandler(item)}
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="shadow-md" />
        <CarouselNext className="shadow-md" />
      </Carousel>
    </div>
  )
}
