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
    <nav className="bg-dark-900 p-2 m-2 border border-white rounded-lg shadow-xl md:m-4 md:p-4 lg:p-6 xl:p-6 flex-auto flex-wrap">
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
