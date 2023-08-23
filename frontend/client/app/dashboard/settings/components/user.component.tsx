"use client";

import { Button } from "@/common/components";
import { useAccountStore } from "@/common/stores";

function UserComponent() {
  const { generalInformation } = useAccountStore();

  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
        <img
          className="mb-4 w-28 h-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0 shadow-lg shadow-gray-300"
          src="/assets/images/photo.jpg"
          alt="Profile Photo"
        />
        <div>
          <h3 className="mb-1 text-2xl font-bold text-gray-900">
            {generalInformation?.firstName ?? "Full Name"} &nbsp;{" "}
            {generalInformation?.lastName}
          </h3>
          <div className="mb-4 text-base font-normal text-gray-500">
            {generalInformation?.position ?? "Position"} at{" "}
            {generalInformation?.organization ?? "Organization"}
          </div>
          <Button
            type="submit"
            className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-primary to-primary hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
            </svg>
            Change picture
          </Button>
        </div>
      </div>
    </div>
  );
}

export { UserComponent };
