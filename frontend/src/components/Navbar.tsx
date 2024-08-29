import React, { useEffect, useState } from "react";
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
import { FaDollarSign } from "react-icons/fa";
import BookingsPage from "./Bookings";

const Navbar = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
  useEffect(() => {
    const getUser = async () => {
      const sessionCookie = getCookie("__session");

      if (!sessionCookie) {
        console.error("User is not logged in");
        return;
      }
      try {
        const response = await fetch(
          "https://movies-backend.aayush0325.workers.dev/api/v1/users/read",
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
          setTotalMoney(data.balance);
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching the user.", error);
      }
    };
    getUser();
  });
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
          <div className="flex items-center justify-end space-x-4">
            <UserButton />
            <div className="flex items-center space-x-2 bg-gray-800 text-white rounded-full px-3 py-2 shadow-md hover:bg-gray-700 transition duration-300">
              <FaDollarSign className="text-yellow-400" />
              <span className="font-semibold text-sm md:text-base lg:text-lg">{totalMoney}</span>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-2 md:p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white",
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
ListItem.displayName = "ListItem";

export default Navbar;
