import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface MovieCardProps {
  title: string;
  description: string;
  director: string;
  rating: string;
  showtime: string;
  image: string;
}

const MovieCard = ({
  title,
  description,
  director,
  rating,
  showtime,
  image,
}: MovieCardProps) => {
  const navigate = useNavigate(); 

  const handleBookSeatClick = () => {
    navigate(`/seats`); 
  };

  return (
    <Card className="w-80 bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 flex flex-col">
      <img
        src={image}
        alt="Movie Poster"
        className="w-full h-48 object-cover transform scale-105 hover:scale-110 transition-transform duration-300"
      />
      <CardHeader className="p-4 bg-gray-800 flex flex-col flex-grow">
        <CardTitle className="text-2xl font-bold mb-2 truncate">{title}</CardTitle>
        <CardDescription className="text-gray-300 text-sm truncate">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm"><strong className="text-yellow-400">Director:</strong> {director}</p>
        <p className="text-sm"><strong className="text-yellow-400">Rating:</strong> {rating}</p>
        <p className="text-sm"><strong className="text-yellow-400">Showtime:</strong> {showtime}</p>
      </CardContent>
      <CardFooter className="p-4 bg-gray-800 flex justify-between items-center">
        <button
          className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300"
          onClick={handleBookSeatClick}
        >
          Book Seat
        </button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
