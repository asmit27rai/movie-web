import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card";
  import { useToast } from "./ui/use-toast";
  
  interface MovieCardProps {
    movieTitle: string;
    description: string;
    showtimeId: number;
    posterUrl: string;
    startTime: string;
    endTime: string;
    price: number;
    theatreName: string;
  }
  
  const ShowtimeCard = ({
    movieTitle,
    description,
    showtimeId,
    posterUrl,
    startTime,
    endTime,
    price,
    theatreName,
  }: MovieCardProps) => {

    const { toast } = useToast();
  
    function getCookie(name: string): string | null {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    }
  
    const handleDeleteClick = async () => {
      const sessionCookie = getCookie("__session");
      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }
  
      try {
        const response = await fetch(
          `https://movies-backend.aayush0325.workers.dev/api/v1/shows/delete/byID?id=${showtimeId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );
  
        if (response.ok) {
          console.log(`Showtime with ID: ${showtimeId} deleted successfully.`);
          toast({
            title: "Showtime Deleted",
            description: "Showtime has been deleted successfully",
          });
        } else {
          throw new Error("Failed to delete showtime");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <Card className="w-64 sm:w-72 md:w-80 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img
          src={posterUrl}
          alt="Movie Poster"
          className="w-full h-36 sm:h-40 object-cover transform scale-100 hover:scale-105 transition-transform duration-300"
        />
        <CardHeader className="p-3 sm:p-4 bg-gray-800 flex flex-col flex-grow">
          <CardTitle className="text-lg sm:text-xl font-bold mb-2 truncate">{movieTitle}</CardTitle>
          <CardDescription className="text-gray-300 text-xs sm:text-sm truncate">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 flex-grow">
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">Theatre:</strong> {theatreName}</p>
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">Start Time:</strong> {new Date(startTime).toLocaleString()}</p>
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">End Time:</strong> {new Date(endTime).toLocaleString()}</p>
          <p className="text-xs sm:text-sm"><strong className="text-yellow-400">Price:</strong> {price} INR</p>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 bg-gray-800 flex justify-between items-center">
          <button
            className="bg-yellow-500 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 text-xs sm:text-sm"
            onClick={handleDeleteClick}
          >
            Delete Showtime
          </button>
        </CardFooter>
      </Card>
    );
  };
  
  export default ShowtimeCard;
  