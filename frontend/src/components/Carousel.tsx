import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const imageUrls = [
  "https://img.freepik.com/free-photo/people-s-emotions-cinema_155003-15060.jpg?size=626&ext=jpg&ga=GA1.1.1190508524.1716527152&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/variety-human-emotions-friends-holding-cola-popcorn-cinema_155003-13580.jpg?t=st=1724926858~exp=1724930458~hmac=99891dd2bd2c72271a80f230272273586acba7882b3b0804d9fc11545f0ae1e5&w=900",
  "https://img.freepik.com/premium-photo/young-man-watching-scary-film_13339-117710.jpg?w=900",
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