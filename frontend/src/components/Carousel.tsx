import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";
  
  const imageUrls = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s",
  ];
  
  const CarouselCom = () => {
    return (
      <Carousel className="w-full max-w-4xl h-96 mx-auto relative overflow-hidden rounded-lg shadow-xl">
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform duration-300 ease-in-out hover:scale-110" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform duration-300 ease-in-out hover:scale-110" />
      </Carousel>
    );
  };
  
  export default CarouselCom;