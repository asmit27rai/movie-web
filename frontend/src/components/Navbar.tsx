import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from './ui/navigation-menu';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/clerk-react';
import BookingsPage from './Bookings';

const Navbar = () => {
  return (
    <nav className="bg-dark-900 p-2 m-2 border border-white rounded-lg shadow-xl md:m-4 md:p-4 lg:p-6 xl:p-6">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap items-center justify-between space-x-2 md:space-x-4 lg:space-x-6 xl:space-x-8">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-sm md:text-base lg:text-lg font-semibold hover:text-orange-500 transition duration-300"
              href="/"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm md:text-base lg:text-lg font-semibold hover:bg-gray-700 hover:text-yellow-300 transition duration-300 px-2 py-1 md:px-3 md:py-2 rounded">
              Movies
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-2 md:gap-4 md:p-4 md:w-[400px] lg:w-[500px] xl:w-[600px] bg-dark-800 rounded-md shadow-lg">
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
            <NavigationMenuTrigger className="text-sm md:text-base lg:text-lg font-semibold hover:bg-gray-700 hover:text-yellow-300 transition duration-300 px-2 py-1 md:px-3 md:py-2 rounded">
              Bookings
            </NavigationMenuTrigger>
            <NavigationMenuContent className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
              <BookingsPage />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-sm md:text-base lg:text-lg font-semibold hover:text-orange-500 transition duration-300"
              href="/contact"
            >
              Contact Us
            </NavigationMenuLink>
          </NavigationMenuItem>
          <div className="flex justify-end">
            <UserButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 p-2 md:p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white',
            className
          )}
          {...props}
        >
          <div className="text-sm md:text-base lg:text-lg font-semibold leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-xs md:text-sm leading-snug text-gray-300">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navbar;
