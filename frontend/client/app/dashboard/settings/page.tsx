"use client";

import React from "react";
import {
  AlertAndNotificationComponent,
  EmailNotificationComponent,
  GeneralInformationComponent,
  PasswordInformationComponent,
  PreferenceComponent,
  SessionInformationComponent,
  UserComponent,
} from "./components";
import { Button, CustomRootLoading, Link } from "@/common/components";
import { useAccountStore } from "@/common/stores";
import { useRouter, useState, useEffect, useForm } from "@/common/hooks";
import { SettingsSchemasValidators, z, zodResolver } from "@/common/validators";
import { UserSettingsServices } from "@/common/services";

function SettingsPage() {
  const [isReady, setIsReady] = useState(false);
  const { isSettingsLoaded, token, loadSettings, logout } = useAccountStore();
  const router = useRouter();
  const logging = async () => {
    UserSettingsServices.getProfile(token).then((res) => {
      if (res.type === "success") {
        loadSettings(res.result);
        setIsReady(true);
      } else {
        logout();
      }
    });
  };

  if (!isSettingsLoaded) {
    logging();
    return <CustomRootLoading />;
  }

  return (
    <main className="bg-gray-50 scroll-smooth hover:scroll-auto overflow-x-hidden ">
      <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-6 max-w-[1700px] mx-auto px-4">
        <div className="col-span-full mb-4 xl:mb-0">
          {/* <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="#"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="w-5 h-5 mr-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                  >
                    Users
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className="ml-1 text-sm font-medium text-gray-400 md:ml-2"
                    aria-current="page"
                  >
                    Settings
                  </span>
                </div>
              </li>
            </ol>
          </nav> */}
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            User settings
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <UserComponent />
          <PasswordInformationComponent />
          <PreferenceComponent />
          <SessionInformationComponent />
          {/* <SocialAccountsComponent /> */}
          {/* <TeamAccountsComponent /> */}
        </div>
        <div className="col-span-2">
          <GeneralInformationComponent />
          <EmailNotificationComponent />
          <AlertAndNotificationComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 xl:grid-cols-2 xl:gap-6"></div>
    </main>
  );
}

export default SettingsPage;
