import React, { useState } from "react";
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

const AdminPage: React.FC = () => {
  const [isTheaterDialogOpen, setTheaterDialogOpen] = useState(false);
  const [isMovieDialogOpen, setMovieDialogOpen] = useState(false);
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
  const [totalSeatsError, setTotalSeatsError] = useState("");

  const movies = [
    {
      title: "The Great Adventure",
      description: "An epic journey through uncharted territories.",
      director: "Jane Doe",
      rating: "8.7",
      showtime: "7:00 PM",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Mystery Night",
      description: "A thrilling tale of suspense and intrigue.",
      director: "John Smith",
      rating: "9.0",
      showtime: "9:00 PM",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const theaters = [
    {
      name: "Grand Cinema",
      address: "123 Movie Lane, Film City",
    },
    {
      name: "Epic Theater",
      address: "456 Screen Street, Showtown",
    },
  ];

  const handleTheaterDialogClose = () => {
    setTheaterDialogOpen(false);
  };

  const handleMovieDialogClose = () => {
    setMovieDialogOpen(false);
  };

  const handleTheaterDialogOpen = () => {
    setTheaterDialogOpen(true);
  };

  const handleMovieDialogOpen = () => {
    setMovieDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMovieDetails((prevState) => ({
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

  // function getCookie(name: string): string | null {
  //   const value = `; ${document.cookie}`
  //   const parts = value.split(`; ${name}=`)
  //   if (parts.length === 2) {
  //     return parts.pop()?.split(';').shift() || null
  //   }
  //   return null
  // }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-4xl font-bold mb-8 text-center">
        Admin Dashboard
      </header>
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300">
            Welcome to the admin dashboard. Here you can manage and monitor the
            application's data.
          </p>
        </section>

        <div className="mt-8 flex flex-col items-center space-y-8">
          <section className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold mb-4">Movies</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  title={movie.title}
                  description={movie.description}
                  director={movie.director}
                  rating={movie.rating}
                  showtime={movie.showtime}
                  image={movie.image}
                />
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold mb-4">Theaters</h2>
            <ul className="space-y-6">
              {theaters.map((theater, index) => (
                <li
                  key={index}
                  className="p-6 bg-gray-700 rounded-md flex justify-between items-center shadow-md transition-transform transform hover:scale-105"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{theater.name}</h3>
                    <p className="text-gray-400">{theater.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 flex space-x-4">
          <Dialog
            open={isTheaterDialogOpen}
            onOpenChange={setTheaterDialogOpen}
          >
            <DialogTrigger asChild>
              <Button onClick={handleTheaterDialogOpen}>Add Theater</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Theater</DialogTitle>
                <DialogDescription>
                  Enter details of the new theater.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-gray-300">
                    Theater Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter theater name"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleTheaterInputChange}
                    value={theaterDetails.name}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="location"
                    className="text-right text-gray-300"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    placeholder="Enter location"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleTheaterInputChange}
                    value={theaterDetails.location}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="totalSeats"
                    className="text-right text-gray-300"
                  >
                    Total Seats
                  </label>
                  <input
                    id="totalSeats"
                    type="number"
                    placeholder="Enter total seats"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleTheaterInputChange}
                    value={theaterDetails.totalSeats}
                  />
                </div>
                {totalSeatsError && <>{totalSeatsError}</>}
              </div>
              <DialogFooter>
                <Button onClick={handleTheaterDialogClose}>Save Theater</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isMovieDialogOpen} onOpenChange={setMovieDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleMovieDialogOpen}>Add Movie</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Movie</DialogTitle>
                <DialogDescription>
                  Enter details of the new movie.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-gray-300">
                    Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter movie title"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                    value={movieDetails.title}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="description"
                    className="text-right text-gray-300"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    placeholder="Enter description"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                    value={movieDetails.description}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="durationMinutes"
                    className="text-right text-gray-300"
                  >
                    Duration (mins)
                  </label>
                  <input
                    id="durationMinutes"
                    type="number"
                    placeholder="Enter duration"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                    value={movieDetails.durationMinutes}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="releaseDate"
                    className="text-right text-gray-300"
                  >
                    Release Date
                  </label>
                  <input
                    id="releaseDate"
                    type="date"
                    placeholder="Enter release date"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                    value={movieDetails.releaseDate}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="posterUrl"
                    className="text-right text-gray-300"
                  >
                    Poster URL
                  </label>
                  <input
                    id="posterUrl"
                    placeholder="Enter poster URL"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleInputChange}
                    value={movieDetails.posterUrl}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleMovieDialogClose}>Save Movie</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
