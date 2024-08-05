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
    <div className="flex justify-center">
    <Carousel
      style={{
        top: "",
        width: "80%",
        overflow: "hidden",
      }}
    >
      <CarouselContent style={{ height: "100%" }}>
        {imageUrls.map((url, index) => (
          <CarouselItem key={index} style={{ height: "100%" }}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform duration-300 ease-in-out hover:scale-110 md:left-8 lg:left-12 xl:left-16"
      />
      <CarouselNext
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-transform duration-300 ease-in-out hover:scale-110 md:right-8 lg:right-12 xl:right-16"
      />
    </Carousel>
    </div>
  );
};

export default CarouselCom;