import {SignInButton } from "@clerk/clerk-react";

const SigninPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      <div className="text-center max-w-sm w-full px-4">
        <img src="./gif_movie.gif" alt="Movie Theater" className="w-full h-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Welcome to the Ultimate Movie Theater Experience!</h1>
        <p className="text-lg mb-6">Sign in to explore the latest movies and showtimes.</p>
        <button className="bg-red-600 text-white py-2 px-6 text-lg font-semibold rounded-md hover:bg-red-700 transition-colors duration-300">
          <SignInButton />
        </button>
      </div>
    </div>
  );
}

export default SigninPage;