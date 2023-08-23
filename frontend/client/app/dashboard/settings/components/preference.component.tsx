import { Button } from "@/common/components";
import React from "react";

function PreferenceComponent() {
  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <h3 className="mb-4 text-xl font-bold">Language &amp; Time</h3>
      <div className="mb-4">
        <label
          htmlFor="settings-language"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select language
        </label>
        <select
          id="settings-language"
          name="countries"
          className="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
        >
          <option>English (US)</option>
          <option>Italiano</option>
          <option>Français (France)</option>
          <option>正體字</option>
          <option>Español (España)</option>
          <option>Deutsch</option>
          <option>Português (Brasil)</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="settings-timezone"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Time Zone
        </label>
        <select
          id="settings-timezone"
          name="countries"
          className="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
        >
          <option>GMT+0 Greenwich Mean Time (GMT)</option>
          {/* <option>GMT+1 Central European Time (CET)</option> */}
          <option>GMT+2 Eastern European Time (EET)</option>
          <option>GMT+3 Moscow Time (MSK)</option>
          <option>GMT+5 Pakistan Standard Time (PKT)</option>
          <option>GMT+8 China Standard Time (CST)</option>
          <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
        </select>
      </div>
      <div>
        <Button
          type="submit"
          className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-primary to-primary hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto"
        >
          Save all
        </Button>
      </div>
    </div>
  );
}

export { PreferenceComponent };
