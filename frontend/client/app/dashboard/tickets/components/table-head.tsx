"use client";

function TableHead() {
  return (
    <thead className="bg-white">
      <tr>
        <th scope="col" className="p-4 lg:p-5">
          <div className="flex items-center">#</div>
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          ID
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Title
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Category
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Priority
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Status
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Created At
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Updated At
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Tags
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
        >
          Description
        </th>
      </tr>
    </thead>
  );
}

export { TableHead };
