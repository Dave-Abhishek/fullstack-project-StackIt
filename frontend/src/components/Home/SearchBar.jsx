import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative text-white w-full">
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#714B67] w-full border border-[#714B67] text-white rounded-full pl-10 pr-4 py-2 focus:shadow-md focus:shadow-[#ea8ed1] focus:outline-none focus:ring-2 focus:ring-[#966288] transition-all duration-300"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <FaSearch className="w-4 h-4" />
      </div>
    </div>
  );
};

export default SearchBar;
