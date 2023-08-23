import React from "react";

function TeamAccountsComponent() {
  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <div className="flow-root">
        <h3 className="text-xl font-bold">Other accounts</h3>
        <ul className="mb-6 divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
              <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                <div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"
                    alt="Bonnie image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                    Bonnie Green
                  </p>
                  <p className="mb-1 text-sm font-normal text-fuchsia-600 truncate">
                    New York, USA
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Last seen: 1 min ago
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                <a
                  href="#"
                  className="py-2 px-3 w-full text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                >
                  Disconnect
                </a>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
              <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                <div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/jese-leos.png"
                    alt="Jese image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                    Jese Leos
                  </p>
                  <p className="mb-1 text-sm font-normal text-fuchsia-600 truncate">
                    California, USA
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Last seen: 2 min ago
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                <a
                  href="#"
                  className="py-2 px-3 w-full text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                >
                  Disconnect
                </a>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
              <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                <div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/thomas-lean.png"
                    alt="Thomas image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                    Thomas Lean
                  </p>
                  <p className="mb-1 text-sm font-normal text-fuchsia-600 truncate">
                    Texas, USA
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Last seen: 1 hour ago
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                <a
                  href="#"
                  className="py-2 px-3 w-full text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                >
                  Disconnect
                </a>
              </div>
            </div>
          </li>
          <li className="pt-4">
            <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
              <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                <div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/lana-byrd.png"
                    alt="Lana image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                    Lana Byrd
                  </p>
                  <p className="mb-1 text-sm font-normal text-fuchsia-600 truncate">
                    Texas, USA
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Last seen: 1 hour ago
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                <a
                  href="#"
                  className="py-2 px-3 w-full text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                >
                  Disconnect
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center">
            Save all
          </button>
        </div>
      </div>
    </div>
  );
}

export { TeamAccountsComponent };
