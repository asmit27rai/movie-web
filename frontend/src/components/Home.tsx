import { useEffect, useState } from "react";
import CarouselCom from "./Carousel";
import MovieC from "./MovieC";
import { useClerk } from "@clerk/clerk-react";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

const Home = () => {
  const clerk = useClerk();
  const { user } = clerk;
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

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
          console.log("User created:", data.message);
        } else {
          const errorData = await response.json();
          console.error("Error creating user:", errorData.message);
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
        console.log(loading)
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://movies-backend.aayush0325.workers.dev/api/v1/shows/read/home?limit=20`,
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
          console.log("Fetched movies:", data);
          setMovies(data);
        } else {
          const errorData = await response.json();
          console.error("Error fetching showtimes:", errorData.message);
          setError(errorData.message);
          console.log(error)
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }

      if (!debouncedSearchTerm) {
        setSearchResults([]); // Clear results if search term is empty
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const response = await fetch(
          `https://movies-backend.aayush0325.workers.dev/api/v1/shows/read/search?filter=${debouncedSearchTerm}`,
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
          console.log("Search results:", data);
          setSearchResults(data.results); // Update state with search results
        } else {
          const errorData = await response.json();
          console.error("Error searching for showtimes:", errorData.message);
          setError(errorData.message);
        }
      } catch (error) {
        console.error("An error occurred while searching for showtimes.", error);
        setError("Failed to search for showtimes.");
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-white p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Hello, {firstName}!</h2>
        <p className="text-lg">Get ready for an amazing cinematic journey.</p>
      </div>
      <CarouselCom />
      <div className="relative flex-1 p-4 justify-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Featured Movies</h2>
        
        {/* Search Component */}
        <div className="justify-center">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            isSearching={isSearching}
            setSearchResults={setSearchResults}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-20">
          {movies.map((movie) => (
            <div key={movie.showtimeId} className="flex-shrink-0">
              <MovieC
                id={movie.showtimeId}
                title={movie.movieTitle}
                description={movie.description}
                startTime={movie.startTime}
                endTime={movie.endTime}
                image={movie.posterUrl || "https://media.comicbook.com/files/img/default-movie.png"}
                price={movie.price}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
