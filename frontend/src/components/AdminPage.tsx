import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const AdminPage: React.FC = () => {
  const [isTheaterDialogOpen, setTheaterDialogOpen] = useState(false);
  const [isMovieDialogOpen, setMovieDialogOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    description: '',
    durationMinutes: '',
    releaseDate: '',
    posterUrl: '',
  });

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

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-3xl font-bold mb-8">Admin Dashboard</header>
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-400">
            Welcome to the admin dashboard. Here you can manage and monitor the application's data.
          </p>
        </section>
        <div className="mt-4 flex space-x-4">
          <Dialog open={isTheaterDialogOpen} onOpenChange={setTheaterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" onClick={handleTheaterDialogOpen}>
                Add Theater
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Theater</DialogTitle>
                <DialogDescription>Enter details of the new theater.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="theater-name" className="text-right text-gray-300">
                    Theater Name
                  </label>
                  <input
                    id="theater-name"
                    placeholder="Enter theater name"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="address" className="text-right text-gray-300">
                    Address
                  </label>
                  <input
                    id="address"
                    placeholder="Enter address"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleTheaterDialogClose}>Save Theater</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isMovieDialogOpen} onOpenChange={setMovieDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" onClick={handleMovieDialogOpen}>
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Movie</DialogTitle>
                <DialogDescription>Enter details of the new movie.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-gray-300">
                    Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter movie title"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onChange={handleInputChange}
                    value={movieDetails.title}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right text-gray-300">
                    Description
                  </label>
                  <input
                    id="description"
                    placeholder="Enter movie description"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onChange={handleInputChange}
                    value={movieDetails.description}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="durationMinutes" className="text-right text-gray-300">
                    Duration (minutes)
                  </label>
                  <input
                    id="durationMinutes"
                    type="number"
                    placeholder="Enter duration"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onChange={handleInputChange}
                    value={movieDetails.durationMinutes}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="releaseDate" className="text-right text-gray-300">
                    Release Date
                  </label>
                  <input
                    id="releaseDate"
                    type="date"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    onChange={handleInputChange}
                    value={movieDetails.releaseDate}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="posterUrl" className="text-right text-gray-300">
                    Poster URL (optional)
                  </label>
                  <input
                    id="posterUrl"
                    placeholder="Enter poster URL"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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
      <footer className="mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} Your Company Name
      </footer>
    </div>
  );
};

export default AdminPage;


