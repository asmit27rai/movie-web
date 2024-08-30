import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card";
import { useNavigate } from "react-router-dom";
  
  interface MovieCardProps {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    image: string;
    price: number;
    id: number;
  }
  
  const MovieC = ({
    title,
    description,
    startTime,
    endTime,
    image,
    price,
    id
  }: MovieCardProps) => {
    const navigate = useNavigate();
    const handleBookSeat = () => {
      navigate('/seats', {
        state: {
          title,
          description,
          startTime,
          endTime,
          image,
          price,
          id
        }
      });
    };
  
    return (
      <Card className="w-64 sm:w-72 md:w-80 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img
          src={image || "https://media.comicbook.com/files/img/default-movie.png"}
          alt="Movie Poster"
          className="w-full h-36 sm:h-40 object-cover transform scale-100 hover:scale-105 transition-transform duration-300"
        />
        <CardHeader className="p-3 sm:p-4 bg-gray-800 flex flex-col flex-grow">
          <CardTitle className="text-lg sm:text-xl font-bold mb-2 truncate">{title}</CardTitle>
          <CardDescription className="text-gray-300 text-xs sm:text-sm truncate">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 flex-grow">
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">Starttime:</strong> {startTime}</p>
        </CardContent>
        <CardContent className="p-3 sm:p-4 flex-grow">
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">EndTime:</strong> {endTime}</p>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 bg-gray-800 flex justify-between items-center">
          <button
            className="bg-yellow-500 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 text-xs sm:text-sm"
            onClick={handleBookSeat}
          >
            BookSeat
          </button>
        </CardFooter>
      </Card>
    );
  };
  
  export default MovieC;
  