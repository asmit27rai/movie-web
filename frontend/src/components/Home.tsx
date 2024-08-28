import { useEffect, useState } from "react";
import CarouselCom from "./Carousel";
import MovieC from "./MovieC";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Home = () => {
  const navigate = useNavigate();
  const clerk = useClerk();
  const { user } = clerk;
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  const [movies, setMovies] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
  useEffect(() => {
    const createUser = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }

      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/users/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionCookie}`,
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (error) {
        console.error("An error occurred while creating the user.", error);
      }
    };

    const fetchShowtimes = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/shows/read/home?limit=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setMovies(data); 
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
          setError(errorData.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching showtimes.", error);
        setError("Failed to fetch showtimes.");
      } finally {
        setLoading(false);
      }
    };

    createUser();
    fetchShowtimes();
  }, [firstName, lastName]);
  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col min-h-screen">
      <CarouselCom />
      <div className="flex-1 p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieC
                id={movie.id}
                title={movie.movieTitle}
                description={movie.description}
                startTime={movie.startTime}
                endTime={movie.endTime}
                image={movie.posterUrl}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/admin");
        }}
      >
        AdminPage
      </Button>
    </div>
  );
};

export default Home;
