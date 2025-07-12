// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaQuestion } from "react-icons/fa";
// import FilterSelect from "./FilterSelect";
// import SearchBar from "./SearchBar";


// const NavbarTwo = ({ onAskClick }) => {

//     return (
//         // in nav, there is one property given "-mt-10". take care of that.                     
//         <nav className="h-[60px] flex items-center justify-between w-full px-10 text-[#374151]">
//             {/* Logo */}
//             <div className="flex items-center justify-start px-5 gap-3 w-1/3">
//                 <button
//                     onClick={ onAskClick }
//                     className="flex items-center gap-2 bg-[#714B67] text-white px-2 py-1 rounded-md"
//                 >
//                     <FaQuestion className="text-xl" />
//                     <h1 className="text-xl font-semibold -tracking-tighter">Ask a Question</h1>
//                 </button>
//             </div>

//             {/* <div className="flex items-center justify-center gap-8 text-white bg-[#714B67] p-3 rounded-full border border-gray-600">
//                 <select className="bg-[#714B67] text-white border-none outline-none px-2">
//                     <option>Newest</option>
//                     <option>Oldest</option>
//                 </select>

//                 <select className="bg-[#714B67] text-white border-none outline-none px-2">
//                     <option className="">Unanswered</option>
//                     <option className="">Answered</option>
//                 </select>

//                 <select className="bg-[#714B67] text-white border-none outline-none px-2">
//                     <option>Popular</option>
//                     <option>My Questions</option>
//                     <option>Bookmarked</option>
//                 </select>
//             </div> */}
//             {/* FilterBar */}
//             <div className="w-2/3 flex items-center justify-between gap-5 pl-10">
//                 <div className="w-[35%]">
//                     <FilterSelect />
//                 </div>

//                 {/* Search Bar */}
//                 <div className="w-[50%]">
//                     <SearchBar />
//                 </div>
//             </div>

//         </nav>
//     );
// };

// export default NavbarTwo;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa";
import FilterSelect from "./FilterSelect";
import SearchBar from "./SearchBar";
import AskQuestion from "../User/UserPostForm/AskQuestion";
import React from "react";

const NavbarTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="h-[60px] flex items-center justify-between w-full px-10 text-[#374151]">
      <div className="flex items-center justify-start px-5 gap-3 w-1/3">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#714B67] text-white px-2 py-1 rounded-md"
        >
          <FaQuestion className="text-xl" />
          <h1 className="text-xl font-semibold -tracking-tighter">Ask a Question</h1>
        </Link>
      </div>

      <div className="w-2/3 flex items-center justify-between gap-5 pl-10">
        <div className="w-[35%]">
          <FilterSelect />
        </div>
        <div className="w-[50%]">
          <SearchBar />
        </div>
      </div>

      {isModalOpen && <AskQuestion isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default NavbarTwo;