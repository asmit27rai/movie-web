import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="bg-dark-900 p-2 m-4 border border-white rounded-lg shadow-xl md:p-6 lg:p-4 xl:p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-lg font-semibold hover:text-orange-500 transition duration-300"
              href="/"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-semibold hover:bg-gray-700 hover:text-yellow-300 transition duration-300 px-4 py-2 rounded">
              Movies
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-4 p-4 md:w-[500px] lg:w-[600px] xl:w-[700px] bg-dark-800 rounded-md shadow-lg">
                <ListItem href="/movies/now-playing" title="Now Playing">
                  Check out the latest movies playing in our cinema.
                </ListItem>
                <ListItem href="/movies/coming-soon" title="Coming Soon">
                  Get a sneak peek at the upcoming movies.
                </ListItem>
                <ListItem href="/movies/classics" title="Classics">
                  Watch timeless classics on the big screen.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-semibold hover:bg-gray-700 hover:text-yellow-300 transition duration-300 px-4 py-2 rounded">
              Showtimes
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] xl:w-[700px] bg-dark-800 rounded-md shadow-lg">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-dark-700 p-6 no-underline outline-none focus:shadow-md transition duration-300"
                      href="/showtimes"
                    >
                      <div className="mb-2 mt-4 text-2xl font-semibold text-white">
                        Get Showtimes
                      </div>
                      <p className="text-sm leading-tight text-gray-300">
                        Find out when your favorite movie is playing.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-lg font-semibold hover:text-orange-500 transition duration-300"
              href="/contact"
            >
              Contact Us
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UserButton />
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children,...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-2 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white",
            className
          )}
          {...props}
        >
          <div className="text-lg font-semibold leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-300">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;