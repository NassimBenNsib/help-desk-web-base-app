"use client";

import {
  Image,
  Link,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/common/components";
import { useAccountStore } from "@/common/stores";
import { LogOutIcon, SettingsIcon, TicketIcon } from "lucide-react";

function CustomNavbar() {
  const { generalInformation, logout } = useAccountStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="z-30 w-full shadow-sm ">
      <div className="py-3 px-3 lg:px-5 lg:pl-3 max-w-[1700px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <Link
              href="#"
              className="text-md font-semibold flex items-center lg:mr-1.5"
            >
              <Image
                src="/assets/icons/full-logo.png"
                className="h-8"
                alt="Company Logo"
                width={70}
                height={50}
              />
              {/* <span className="hidden md:inline-block self-center text-xl font-bold whitespace-nowrap">
                Shifti
              </span> */}
            </Link>
            <Link href="/dashboard/tickets">Tickets</Link>
            <Link href="/dashboard/settings">Settings</Link>
            <Link href="/dashboard/chatbot">Assistant</Link>
          </div>
          <div className="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <button
              type="button"
              data-dropdown-toggle="apps-dropdown"
              className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100 mx-20"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            <Button
              onClick={handleLogout}
              className="mx-2 inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm font-medium text-center text-gray-900 bg-white rounded-lg  hover:bg-gray-100"
            >
              <LogOutIcon />
            </Button>
            <Avatar className="border cursor-pointer ">
              <AvatarImage
                src={generalInformation?.profilePicture?.toString() || ""}
                alt="@profile-picture"
              />
              <AvatarFallback className="bg-primary text-white">
                {generalInformation.firstName?.[0] || "You"}
                {generalInformation.lastName?.[0] || ""}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { CustomNavbar };
