import CarouselCom from "./Carousel";
import MovieCard from "./MovieCard";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Inception",
    description: "A thief with the rare ability to enter people's dreams and steal their secrets from their subconscious is given a chance to have his criminal history erased.",
    director: "Christopher Nolan",
    rating: "8.8/10",
    showtime: "6:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers by a mysterious group known as the Matrix.",
    director: "The Wachowskis",
    rating: "8.7/10",
    showtime: "8:30 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice while facing a criminal mastermind known as the Joker.",
    director: "Christopher Nolan",
    rating: "9.0/10",
    showtime: "9:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 4,
    title: "Interstellar",
    description: "A group of explorers uses a newly discovered wormhole to surpass the limitations on human space travel and find a new home for mankind.",
    director: "Christopher Nolan",
    rating: "8.6/10",
    showtime: "7:30 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    description: "A man imprisoned for a crime he didn't commit forms an unexpected friendship with a fellow inmate and finds hope through acts of common decency.",
    director: "Frank Darabont",
    rating: "9.3/10",
    showtime: "5:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 6,
    title: "Pulp Fiction",
    description: "The intersecting lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits unfold in a series of connected tales.",
    director: "Quentin Tarantino",
    rating: "8.9/10",
    showtime: "8:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 7,
    title: "Forrest Gump",
    description: "A slow-witted but kind-hearted man from Alabama narrates his extraordinary life journey and his role in pivotal moments in American history.",
    director: "Robert Zemeckis",
    rating: "8.8/10",
    showtime: "4:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  },
  {
    id: 8,
    title: "Fight Club",
    description: "An insomniac office worker and a soap salesman form an underground fight club as a form of male bonding and self-discovery.",
    director: "David Fincher",
    rating: "8.8/10",
    showtime: "10:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIfDPcmuFr_XvXNuxvENzzFNR9kS2F9iKLw&s"
  }
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <CarouselCom />
      <div className="flex-1 p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard
                title={movie.title}
                description={movie.description}
                director={movie.director}
                rating={movie.rating}
                showtime={movie.showtime}
                image={movie.image}
              />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => {navigate("/admin")}}>AdminPage</Button>
    </div>
  );
};

export default Home;
