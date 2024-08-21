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

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <header className="text-3xl font-bold mb-8">
        Admin Dashboard
      </header>
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
                <DialogDescription>
                  Enter details of the new theater.
                </DialogDescription>
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
                <DialogDescription>
                  Enter details of the new movie and showtimes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="movie-name" className="text-right text-gray-300">
                    Movie Name
                  </label>
                  <input
                    id="movie-name"
                    placeholder="Enter movie name"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="director-name" className="text-right text-gray-300">
                    Director Name
                  </label>
                  <input
                    id="director-name"
                    placeholder="Enter director name"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="showtime" className="text-right text-gray-300">
                    Showtime
                  </label>
                  <input
                    id="showtime"
                    placeholder="Enter showtime"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="theater" className="text-right text-gray-300">
                    Theater Name
                  </label>
                  <input
                    id="theater"
                    placeholder="Enter theater name"
                    className="col-span-3 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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
