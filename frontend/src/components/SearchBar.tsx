import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: any[];
  isSearching: boolean;
  setSearchResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  isSearching,
  setSearchResults,
}) => {
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook should be used inside the component

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchTerm);
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchResults([]); // Hide search results
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchResultsRef, setSearchResults]);

  const handleSearchResultClick = (result: any) => {
    navigate('/seats', {
      state: {
        title: result.movieTitle,
        description: result.description,
        startTime: result.startTime,
        endTime: result.endTime,
        image: result.posterUrl,
        price: result.price,
        id: result.showtimeId
      }
    });
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative flex items-center w-full mb-2">
        <div className="text-white mx-2 font-bold">Search</div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded p-2 w-full"
          ref={inputRef}
        />
      </div>
      {searchResults.length > 0 && (
        <div
          ref={searchResultsRef}
          className="absolute bg-white shadow-lg z-50 mt-1 w-full"
          style={{
            top: '100%',
            left: '0',
            width: '100%'
          }}
        >
          {searchResults.map((result) => (
            <div 
              key={result.showtimeId} 
              className="hover:bg-gray-400 p-2 cursor-pointer"
              onClick={() => handleSearchResultClick(result)} // Pass result item to handler
            >
              <div className="font-bold">{result.movieTitle}</div>
              <div>{result.description}</div>
            </div>
          ))}
        </div>
      )}
      {isSearching && <div className="text-white absolute top-full left-0 w-full mt-2">Searching...</div>}
    </div>
  );
};

export default SearchBar;
