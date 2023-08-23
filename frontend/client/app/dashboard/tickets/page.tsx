"use client";

import {
  AddTicketModal,
  TableBody,
  TableHead,
  TicketDetails,
} from "./components";
import { useState } from "@/common/hooks";
import { DatePicker, Select, TagsInput } from "@/common/components";
import { ArrowBigLeftIcon, ArrowBigRightIcon, SearchIcon } from "lucide-react";
import {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/common/constants";

const tickets = new Array(100).fill(12).map(() => {
  return {
    id: Math.floor(Math.random() * 1000),
    title: "Website Bug",
    description: "The website login page is not displaying properly.",
    status: TicketStatus.slice(1)[Math.floor(Math.random() * 5)].value,
    priority: TicketPriority.slice(1)[Math.floor(Math.random() * 4)].value,
    tags: "bug, website",
    category: TicketCategory.slice(1)[Math.floor(Math.random() * 7)].value,
    createdAt: "2023-08-11",
    updatedAt: "2023-08-11",
    userId: "user123",
  };
});

const TIMER = 100;
function Tickets() {
  const [filtered, setFiltered] = useState([...tickets]);
  const [selected, setSelected] = useState<Map<string, boolean>>(new Map());
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState({} as any);
  const [search, setSearch] = useState({
    title: "",
    priority: {
      value: "",
      label: "All",
    },
    status: {
      value: "",
      label: "All",
    },
    tags: [],
    startDate: new Date(Date.now() - 86400000 * 30),
    endDate: new Date(Date.now() + 86400000),
  });
  const [interval, setInterval] = useState({
    start: 0,
    end: 10,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = tickets.filter((ticket) => {
        if (search.title !== "") {
          if (!ticket.title.includes(search.title)) return false;
        }
        if (search.priority.value !== "") {
          if (ticket.priority !== search.priority.value) return false;
        }
        if (search.status.value !== "") {
          if (ticket.status !== search.status.value) return false;
        }
        if (search.tags.length > 0) {
          const tags = search.tags.map((tag: string) => tag.toLowerCase());
          const ticketTags = ticket.tags.split(",").map((tag) => tag.trim());
          if (!tags.every((tag) => ticketTags.includes(tag))) return false;
        }
        if (search.startDate !== null) {
          if (new Date(ticket.createdAt) < search.startDate) return false;
        }
        if (search.endDate !== null) {
          if (new Date(ticket.createdAt) > search.endDate) return false;
        }
        return true;
      });
      setFiltered(filtered);
      setIsLoading(false);
    }, TIMER);
  };
  const handleSelectRow = (id: string) => {
    setNumberSelected((prev) => (selected.get(id) ? prev - 1 : prev + 1));
    setSelected((prev) => {
      const next = new Map(prev);
      next.set(id, !prev.get(id));
      return next;
    });
  };
  const handleGoNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (interval.start + interval.limit < filtered.length) {
        setInterval({
          start: interval.start + interval.limit,
          end: interval.end + interval.limit,
          limit: interval.limit,
        });
        setIsLoading(false);
      }
    }, TIMER);
  };
  const handleGoPrevious = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (interval.start > 0) {
        setInterval({
          start: interval.start - interval.limit,
          end: interval.end - interval.limit,
          limit: interval.limit,
        });
      }
      setIsLoading(false);
    }, TIMER);
  };
  const handleChangeTitle = (e: any) => {
    setSearch((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleChangeStatus = (option: { value: string; label: string }) => {
    setSearch((prev) => ({ ...prev, status: option }));
  };
  const handleChangePriority = (option: { value: string; label: string }) => {
    setSearch((prev) => ({ ...prev, priority: option }));
  };
  const handleChangeTags = (tags: string[]) => {
    setSearch((prev) => ({ ...prev, tags }));
  };
  const handleChangeStartDate = (date: Date) => {
    setSearch((prev) => ({ ...prev, startDate: date }));
  };
  const handleChangeEndDate = (date: Date) => {
    setSearch((prev) => ({ ...prev, endDate: date }));
  };

  const handleOpenRow = (index: number) => {
    setSelectedTicket(filtered[index]);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setSelectedTicket({} as any);
    setOpenDetails(false);
  };

  return (
    <main className="bg-gray-50 scroll-smooth hover:scroll-auto ">
      <TicketDetails
        onClose={handleCloseDetails}
        ticket={selectedTicket}
        open={openDetails}
      />
      <div className="max-w-[1700px] mx-auto px-4">
        <div className=" w-full mb-3">
          <div className="mb-4 flex justify-center items-center   pt-6">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
              Ticket Management
              {/* <AddTicketModal /> */}
            </h1>
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3 flex-wrap">
              <button
                disabled={isLoading}
                type="button"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-primary to-primary sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
              >
                <svg
                  className="mr-2 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add ticket
              </button>
              <button
                disabled={isLoading}
                className="inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform sm:w-auto"
              >
                <svg
                  className="mr-2 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>
          <div className="sm:flex flex-wrap">
            <div className="hidden items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 flex-wrap">
              <form className="lg:pr-3 flex flex-wrap" action="#" method="GET">
                <div
                  className="relative mt-1 w-full flex gap-2 items-center 
                "
                >
                  <input
                    value={search.title}
                    onChange={handleChangeTitle}
                    type="text"
                    name="email"
                    id="users-search"
                    className="h-[38px] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-[200px] p-2.5"
                    placeholder="Search for tickets"
                  />
                  <Select
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary25: "#1811430f",
                        primary: "#181143",
                      },
                    })}
                    defaultValue={search.status}
                    onChange={handleChangeStatus}
                    options={TicketStatus}
                    className=" text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-[200px]"
                  />
                  <Select
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary25: "#1811430f",
                        primary: "#181143",
                      },
                    })}
                    defaultValue={search.priority}
                    onChange={handleChangePriority}
                    options={TicketPriority}
                    className=" text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-[200px] "
                  />
                  <DatePicker
                    className="h-[38px] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-[200px] focus:border-[#1811430f] p-2.5"
                    selected={search.startDate}
                    onChange={handleChangeStartDate}
                  />
                  <DatePicker
                    className="h-[38px] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-[200px] p-2.5"
                    selected={search.endDate}
                    onChange={handleChangeEndDate}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-primary to-primary sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              {interval.start !== 0 && (
                <button
                  disabled={isLoading}
                  onClick={handleGoPrevious}
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-primary to-primary sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                >
                  <ArrowBigLeftIcon />
                </button>
              )}
              {interval.start + interval.limit < filtered.length && (
                <button
                  disabled={isLoading}
                  onClick={handleGoNext}
                  type="button"
                  data-modal-toggle="add-user-modal"
                  className="inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform sm:w-auto"
                >
                  <ArrowBigRightIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        <TagsInput
          className="text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 block mt-5 focus:border-primary"
          value={search.tags}
          onChange={handleChangeTags}
          name="Tags"
          placeHolder="Enter Tags"
        />
      </div>
      <div className="flex flex-col my-6 rounded-2xl shadow-xl shadow-gray-200 max-w-[1700px] mx-auto px-4">
        <div className="overflow-x-auto rounded-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-lg">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <TableHead />
                <TableBody
                  rows={filtered.slice(interval.start, interval.end + 1)}
                  onSelect={handleSelectRow}
                  onOpen={handleOpenRow}
                  loading={isLoading}
                  selected={selected}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Tickets;
