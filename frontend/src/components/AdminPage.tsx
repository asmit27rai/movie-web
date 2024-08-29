import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import MovieCard from "./MovieCard";
import ShowtimeCard from "./ShowtimeCard";
import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { PlusCircle, Trash2 } from "lucide-react";
import Footer from "./Footer";

interface Theatre {
  name: string;
  location: string;
  totalSeats: number;
  id: number;
}

interface ShowTimeProps {
  movieTitle: string;
  description: string;
  showtimeId: number;
  posterUrl: string;
  startTime: string;
  endTime: string;
  price: number;
  theatreName: string;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  releaseDate: string;
  posterUrl: string;
}

const AdminPage: React.FC = () => {
  const [isTheaterDialogOpen, setTheaterDialogOpen] = useState(false);
  const [isMovieDialogOpen, setMovieDialogOpen] = useState(false);
  const [theaters, setTheaters] = useState<Theatre[]>([]);
  const [isShowtimeDialogOpen, setShowtimeDialogOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>();
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    durationMinutes: "",
    releaseDate: "",
    posterUrl: "",
  });
  const [theaterDetails, setTheaterDetails] = useState({
    name: "",
    location: "",
    totalSeats: "",
  });
  const [showtimeDetails, setShowtimeDetails] = useState({
    movieId: "",
    theatreId: "",
    startTime: "",
    endTime: "",
    price: "",
  });

  const [persShowTime, setPersShowTime] = useState<ShowTimeProps[]>();

  const [totalSeatsError, setTotalSeatsError] = useState("");

  const handleTheaterDialogClose = () => {
    const { name, location, totalSeats } = theaterDetails;
    const seats = parseInt(totalSeats, 10);

    if (name && location && !isNaN(seats) && seats >= 25 && seats <= 100) {
      createTheatre({
        name,
        location,
        totalSeats: seats,
      });
      setTheaterDetails({
        name: "",
        location: "",
        totalSeats: "",
      });
      setTheaterDialogOpen(false);
    } else {
      if (!name || !location || isNaN(seats) || seats < 25 || seats > 100) {
        setTotalSeatsError("Please fill out all fields correctly.");
      }
    }
  };

  const handleMovieDialogClose = async () => {
    const { title, description, durationMinutes, releaseDate, posterUrl } =
      movieDetails;
    const duration = parseInt(durationMinutes, 10);

    if (title && description && !isNaN(duration) && releaseDate && posterUrl) {
      await createMovie({
        title,
        description,
        durationMinutes: duration,
        releaseDate,
        posterUrl,
      });
      setMovieDetails({
        title: "",
        description: "",
        durationMinutes: "",
        releaseDate: "",
        posterUrl: "",
      });
      setMovieDialogOpen(false);
    } else {
      console.error("Please fill out all fields correctly.");
    }
  };

  const handleShowtimeDialogClose = async () => {
    const sessionCookie = getCookie("__session");

    if (!sessionCookie) {
      console.error("User is not logged in");
      return;
    }
    try {
      const response = await fetch(
        "https://movies-backend.aayush0325.workers.dev/api/v1/shows/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionCookie}`,
          },
          body: JSON.stringify({
            movieId: Number(showtimeDetails.movieId),
            theatreId: Number(showtimeDetails.theatreId),
            startTime: showtimeDetails.startTime,
            endTime: showtimeDetails.endTime,
            price: Number(showtimeDetails.price),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Showtime created successfully", data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create showtime");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowtimeDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMovieDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleShowtimeInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setShowtimeDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleTheaterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTheaterDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === "totalSeats") {
      const seats = parseInt(value, 10);
      if (seats < 25 || seats > 100) {
        setTotalSeatsError("Total seats must be between 25 and 100");
      } else {
        setTotalSeatsError("");
      }
    }
  };

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  const deleteTheatre = async (id: number) => {
    const sessionCookie = getCookie("__session");

    if (!sessionCookie) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await fetch(
        "https://movies-backend.aayush0325.workers.dev/api/v1/theatres/delete?id=" +
          id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionCookie}`,
          },
        }
      );

      if (response.ok) {
        setTheaters((prevTheaters) =>
          prevTheaters.filter((theater) => theater.id !== id)
        );
        console.log("Theatre deleted successfully");
      } else {
        throw new Error("Failed to delete theatre");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createTheatre = async (theatreDetails: {
    name: string;
    location: string;
    totalSeats: number;
  }) => {
    const sessionCookie = getCookie("__session");

    if (!sessionCookie) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await fetch(
        "https://movies-backend.aayush0325.workers.dev/api/v1/theatres/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionCookie}`,
          },
          body: JSON.stringify(theatreDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(
          `Theatre created successfully with ${theatreDetails.totalSeats} Seats`,
          data
        );
      } else {
        throw new Error("Failed to create theatre");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createMovie = async (movieDetails: {
    title: string;
    description: string;
    durationMinutes: number;
    releaseDate: string;
    posterUrl: string;
  }) => {
    const sessionCookie = getCookie("__session");

    if (!sessionCookie) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await fetch(
        "https://movies-backend.aayush0325.workers.dev/api/v1/movies/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionCookie}`,
          },
          body: JSON.stringify(movieDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Movie created successfully", data);
      } else {
        throw new Error("Failed to create movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clerk = useClerk();
  const { user } = clerk;
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";

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

    const getTheaters = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }
      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/theatres/read/personal",
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
          setTheaters(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch theaters");
        }
      } catch (error: any) {
        console.error("Error:", error);
      }
    };

    const getMovies = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }
      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/movies/read/personal",
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
          setMovies(data.result);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch movies");
        }
      } catch (error: any) {
        console.error("Error:", error);
      }
    };

    const getShowTime = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }
      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/shows/read/personal",
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
          setPersShowTime(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch movies");
        }
      } catch (error: any) {
        console.error("Error:", error);
      }
    };

    getMovies();
    createUser();
    getTheaters();
    getShowTime();
  }, [firstName, lastName]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <header className="bg-gray-800 shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <p className="text-lg">Welcome, {firstName}</p>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        <section className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button
              onClick={() => setMovieDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Movie
            </Button>
            <Button
              onClick={() => setTheaterDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Theater
            </Button>
            <Button
              onClick={() => setShowtimeDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Showtime
            </Button>
          </div>
        </section>

        <div className="flex flex-col items-center space-y-10 w-full px-4 sm:px-6">
          <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-screen-xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    description={movie.description}
                    showtime={movie.releaseDate}
                    image={movie.posterUrl}
                    id={movie.id}
                  />
                ))
              ) : (
                <p className="text-gray-400">No movies available</p>
              )}
            </div>
          </section>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <section className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Shows</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {persShowTime && persShowTime.length > 0 ? (
                persShowTime.map((movie) => (
                  <ShowtimeCard
                    key={movie.showtimeId}
                    movieTitle={movie.movieTitle}
                    description={movie.description}
                    showtimeId={movie.showtimeId}
                    posterUrl={movie.posterUrl}
                    startTime={movie.startTime}
                    endTime={movie.endTime}
                    price={movie.price}
                    theatreName={movie.theatreName}
                  />
                ))
              ) : (
                <p className="text-gray-400">No Shows available</p>
              )}
            </div>
          </section>
        </div>

        <section className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4">Theaters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {theaters.map((theater) => (
              <div
                key={theater.id}
                className="bg-gray-700 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2">{theater.name}</h3>
                <p className="text-gray-400 mb-4">{theater.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {theater.totalSeats} seats
                  </span>
                  <Button
                    onClick={() => deleteTheatre(theater.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Dialog
        open={isMovieDialogOpen}
        onOpenChange={() => setMovieDialogOpen(!isMovieDialogOpen)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
            <DialogDescription>
              Fill out the details to create a new movie.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              id="title"
              type="text"
              placeholder="Movie Title"
              value={movieDetails.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="description"
              placeholder="Description"
              value={movieDetails.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="durationMinutes"
              type="number"
              placeholder="Duration (Minutes)"
              value={movieDetails.durationMinutes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="releaseDate"
              type="date"
              placeholder="Release Date"
              value={movieDetails.releaseDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="posterUrl"
              type="text"
              placeholder="Poster URL"
              value={movieDetails.posterUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleMovieDialogClose}>Save Movie</Button>
            <Button
              onClick={() => setMovieDialogOpen(false)}
              className="bg-red-600"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTheaterDialogOpen}
        onOpenChange={() => setTheaterDialogOpen(!isTheaterDialogOpen)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Theater</DialogTitle>
            <DialogDescription>
              Fill out the details to create a new theater.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              id="name"
              type="text"
              placeholder="Theater Name"
              value={theaterDetails.name}
              onChange={handleTheaterInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="location"
              type="text"
              placeholder="Location"
              value={theaterDetails.location}
              onChange={handleTheaterInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="totalSeats"
              type="number"
              placeholder="Total Seats"
              value={theaterDetails.totalSeats}
              onChange={handleTheaterInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            {totalSeatsError && (
              <p className="text-red-600">{totalSeatsError}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleTheaterDialogClose}>Save Theater</Button>
            <Button
              onClick={() => setTheaterDialogOpen(false)}
              className="bg-red-600"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isShowtimeDialogOpen}
        onOpenChange={() => setTheaterDialogOpen(!isShowtimeDialogOpen)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Fill out the form to add a new showtime.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <select
              id="movieId"
              value={showtimeDetails.movieId}
              onChange={handleShowtimeInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            >
              <option value="">Select Movie</option>
              {movies && movies.length > 0 ? (
                movies.map((movie, index) => (
                  <option key={index} value={movie.id}>
                    {movie.title}
                  </option>
                ))
              ) : (
                <p>No movies available</p>
              )}
            </select>
            <select
              id="theatreId"
              value={showtimeDetails.theatreId}
              onChange={handleShowtimeInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            >
              <option value="">Select Theater</option>
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name}
                </option>
              ))}
            </select>
            <input
              id="startTime"
              type="datetime-local"
              value={showtimeDetails.startTime}
              onChange={handleShowtimeInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="endTime"
              type="datetime-local"
              value={showtimeDetails.endTime}
              onChange={handleShowtimeInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={showtimeDetails.price}
              onChange={handleShowtimeInputChange}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleShowtimeDialogClose}>Add Showtime</Button>
            <Button
              onClick={() => setShowtimeDialogOpen(false)}
              className="bg-red-600"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default AdminPage;
