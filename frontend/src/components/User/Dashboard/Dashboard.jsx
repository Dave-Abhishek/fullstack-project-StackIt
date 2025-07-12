// /*
//     -> This is the dashboard of the founder. this has same design as the Get-discovered role dashboard.
//     -> This component is including the following features:
//         1. Create Post
//         5. Delete Post
//         2. View All Posts
//         3. Filter Posts by Status (All, Pending, Accepted, Rejected)
//         4. View All Applications (This feature is not implemented yet)
//         6. Start Searching
//     Important Note: In this code, we have implimented the NewCard.jsx component, we have initially designed PostNew.jsx but then design and requirements changed and so we made new component and so PostNew.jsx has not any relation with thie entire repo.
//     -> The developer has used the following libraries:
//         1. React
//         2. React Icons
//         3. React Modal
//         4. React Router Dom
//         5. React Toastify
//         6. AOS (Animate On Scroll)
// */
// import { FaTimes } from "react-icons/fa";
// import { BiCoinStack } from "react-icons/bi";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { FiCheckSquare } from "react-icons/fi";
// import { IoTrashBinOutline } from "react-icons/io5";
// import { HiDotsVertical } from "react-icons/hi";
// import PostNew from "./PostNew";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { MdOutlineHistory } from "react-icons/md";
// import { LuGalleryVerticalEnd } from "react-icons/lu";
// import { useState, useEffect, useRef } from "react";
// import Modal from "react-modal";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdOutlineAddToPhotos } from "react-icons/md";
// import { BsBookmarkStar } from "react-icons/bs";
// import { IoIdCard } from "react-icons/io5";
// import { IoLogOutOutline } from "react-icons/io5";
// import { IoMdSettings } from "react-icons/io";
// import { AiOutlineShop } from "react-icons/ai";
// import { IoClose } from "react-icons/io5";
// import FounderPostForm from "../FounderPostForm/FounderPostForm";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import NewCard from "./NewCard";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import "./Dashboard.css";
// import AccountSettings from "./AccountSettings";
// import ContactUs from "../../ContactUs";
// import PrivacyPolicies from "../../Auth/Policies/PrivacyPolicies";
// import TermsAndConditions from "../../Auth/Policies/TermsAndConditions";

// // Bind modal to root element for accessibility
// Modal.setAppElement("#root");

// // Reusable NoPostsFound Component
// const NoPostsFound = ({ openModal }) => (
//     <div className="text-center py-8 sm:py-10 lg:py-12 px-4">
//         <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <LuGalleryVerticalEnd className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" />
//         </div>
//         <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 mb-2">
//             No posts found
//         </h3>
//         {/* <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-4">
//             Create your first talent post to get started!
//         </p>
//         <button
//             onClick={openModal}
//             className="inline-flex items-center px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg transition-colors duration-200"
//         >
//             <MdOutlineAddToPhotos className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 mr-2" />
//             Create Post
//         </button> */}
//     </div>
// );

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [credits, setCredits] = useState(0);
//     // Below variable is to filter posts by category. It has four values: All, Pending, Accepted, Rejected
//     const [filter, setFilter] = useState("All");
//     // Below is Post variable that will store all the posts that are fetched from the backend
//     const [posts, setPosts] = useState([]);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [showMarketplacePopup, setShowMarketplacePopup] = useState(false);
//     const [showFavouritesPopup, setShowFavouritesPopup] = useState(false);
//     const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
//     const [showHistoryPopup, setShowHistoryPopup] = useState(false);
//     const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
//     const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
//     const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
//     const sidebarRef = useRef(null);
//     const hamburgerRef = useRef(null);
//     const firstName = localStorage.getItem("firstName");
//     const lastName = localStorage.getItem("lastName");
//     const phoneNumber = localStorage.getItem("phoneNumber");
//     const email = localStorage.getItem("email");

//     const openAccountSettingsModal = () => setIsAccountSettingsModalOpen(true);
//     const closeAccountSettingsModal = () => setIsAccountSettingsModalOpen(false);
//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);
//     const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//     const closeSidebar = () => setIsSidebarOpen(false);
//     const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//     const openContactUsModal = () => setIsContactUsModalOpen(true);
//     const closeContactUsModal = () => setIsContactUsModalOpen(false);
//     const openTermsModal = () => setIsTermsModalOpen(true);
//     const closeTermsModal = () => setIsTermsModalOpen(false);
//     const openPrivacyModal = () => setIsPrivacyModalOpen(true);
//     const closePrivacyModal = () => setIsPrivacyModalOpen(false);

//     const handleMarketplaceClick = () => {
//         setShowMarketplacePopup(true);
//         setIsSidebarOpen(false);
//     };

//     const handleFavouritesClick = () => {
//         setShowFavouritesPopup(true);
//         setIsSidebarOpen(false);
//     };

//     const handlePurchasedClick = () => {
//         setShowPurchasedPopup(true);
//         setIsSidebarOpen(false);
//     };

//     const handleHistoryClick = () => {
//         setShowHistoryPopup(true);
//         setIsSidebarOpen(false);
//     };

//     const fetchListings = async () => {
//         try {
//             const role = localStorage.getItem("role");
//             if (!role) {
//                 console.error("User ID or role not found in localStorage");
//                 return;
//             }
//             const endpoint = `https://test-api.klezy.com/api/get-discovered/get-all-listings-by-userId`;
//             const response = await fetch(endpoint, {
//                 method: "GET",
//                 credentials: "include",
//             });
//             if (!response.ok) throw new Error("Failed to fetch listings");
//             const res = await response.json();
//             const data = res.data;
//             console.log("Fetched Data:", data);
//             setPosts(Array.isArray(data) ? data : []);
//         } catch (error) {
//             console.error("Error fetching listings:", error);
//         }
//     };

//     const logout = async () => {
//         try {
//             await fetch(`https://test-api.klezy.com/api/auth/logout`, {
//                 method: "POST",
//                 credentials: "include",
//             });
//             localStorage.clear();
//             navigate("/");
//         } catch (err) {
//             console.error("Logout failed", err);
//         }
//     };

//     const fetchCredits = async () => {
//         try {
//             const response = await fetch(
//                 `https://test-api.klezy.com/api/credits/get-credits`,
//                 {
//                     method: "POST",
//                     credentials: "include",
//                 }
//             );
//             const data = await response.json();
//             setCredits(data.credits);
//         } catch (error) {
//             toast.error("Error fetching credits!");
//         }
//     };

//     useEffect(() => {
//         fetchCredits();
//         fetchListings();
//         Aos.init({ duration: 900 });
//     }, []);

//     // Effect to handle clicks outside the sidebar and disable background scrolling
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 isSidebarOpen &&
//                 sidebarRef.current &&
//                 !sidebarRef.current.contains(event.target) &&
//                 hamburgerRef.current &&
//                 !hamburgerRef.current.contains(event.target)
//             ) {
//                 setIsSidebarOpen(false);
//             }
//         };

//         // Check if any modal or sidebar is open
//         const isAnyModalOpen =
//             isModalOpen ||
//             isAccountSettingsModalOpen ||
//             isContactUsModalOpen ||
//             isTermsModalOpen ||
//             isPrivacyModalOpen ||
//             showMarketplacePopup ||
//             showFavouritesPopup ||
//             showPurchasedPopup ||
//             showHistoryPopup ||
//             isSidebarOpen;

//         if (isAnyModalOpen) {
//             document.addEventListener("mousedown", handleClickOutside);
//             document.body.style.overflow = "hidden"; // Prevent background scroll
//         } else {
//             document.body.style.overflow = "unset"; // Restore scrolling
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//             document.body.style.overflow = "unset"; // Cleanup on unmount
//         };
//     }, [
//         isSidebarOpen,
//         isModalOpen,
//         isAccountSettingsModalOpen,
//         isContactUsModalOpen,
//         isTermsModalOpen,
//         isPrivacyModalOpen,
//         showMarketplacePopup,
//         showFavouritesPopup,
//         showPurchasedPopup,
//         showHistoryPopup,
//     ]);

//     const postsFiltered =
//         filter === "All"
//             ? posts
//             : posts.filter((post) => post.status === filter);

//     console.log("postFiltered: ", postsFiltered);

//     const filterOptions = [
//         {
//             key: "All",
//             label: "All Posts",
//             icon: <LuGalleryVerticalEnd className="w-4 h-4 sm:w-5 sm:h-5" />,
//         },
//         {
//             key: "Pending",
//             label: "Pending Posts",
//             icon: (
//                 <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-yellow-400 rounded-full" />
//             ),
//         },
//         {
//             key: "Accepted",
//             label: "Accepted Posts",
//             icon: (
//                 <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 rounded-full" />
//             ),
//         },
//         {
//             key: "Rejected",
//             label: "Rejected Posts",
//             icon: (
//                 <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-400 rounded-full" />
//             ),
//         },
//     ];

//     const menuItems = [
//         {
//             icon: <BsBookmarkStar className="w-4 h-4 sm:w-5 sm:h-5" />,
//             label: "Favourite Posts",
//             onClick: handleFavouritesClick,
//         },
//         {
//             icon: <IoIdCard className="w-4 h-4 sm:w-5 sm:h-5" />,
//             label: "Purchased Posts",
//             onClick: handlePurchasedClick,
//         },
//         {
//             icon: <MdOutlineHistory className="w-4 h-4 sm:w-5 sm:h-5" />,
//             label: "Purchase History",
//             onClick: handleHistoryClick,
//         },
//     ];

//     // const footerLinks = [
//     //     { label: "Feedback", onClick: openContactUsModal },
//     //     { label: "Terms & Conditions", onClick: openTermsModal },
//     //     { label: "Privacy & Policy", onClick: openPrivacyModal },
//     // ];

//     const footerLinks = [
//         { label: "Feedback", onClick: openContactUsModal },
//         { label: "Terms & Conditions", to: "/terms-and-conditions" },
//         { label: "Privacy & Policy", to: "/privacy-policy" },
//     ];

//     // Popup Component
//     const Popup = ({
//         isOpen,
//         onClose,
//         title,
//         icon,
//         description,
//         comingSoon = false,
//     }) => {
//         if (!isOpen) return null;

//         return (
//             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999] p-4 animate-fadeIn">
//                 <div
//                     className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300 animate-scaleIn"
//                     style={{
//                         animation: "scaleIn 0.3s ease-out forwards",
//                     }}
//                 >
//                     {/* Header with gradient background */}
//                     <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-t-2xl p-6 text-center relative">
//                         <button
//                             onClick={onClose}
//                             className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
//                         >
//                             <IoClose className="w-5 h-5" />
//                         </button>
//                         <div className="text-white text-4xl mb-3">{icon}</div>
//                         <h3 className="text-xl font-bold text-white mb-1">
//                             {title}
//                         </h3>
//                         {comingSoon && (
//                             <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm text-white font-medium">
//                                 <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
//                                 Coming Soon
//                             </div>
//                         )}
//                     </div>

//                     {/* Content */}
//                     <div className="p-6 text-center">
//                         <p className="text-gray-600 text-base leading-relaxed mb-6">
//                             {description}
//                         </p>

//                         {comingSoon ? (
//                             <div className="space-y-3">
//                                 <button
//                                     onClick={onClose}
//                                     className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
//                                 >
//                                     Got it!
//                                 </button>
//                                 <p className="text-xs text-gray-500">
//                                     We'll notify you when it's ready ✨
//                                 </p>
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={onClose}
//                                 className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200 transform hover:scale-105"
//                             >
//                                 Understood
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-col bg-gray-50 min-h-screen poppins-medium">
//             {/* Custom Styles */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from {
//                         opacity: 0;
//                     }
//                     to {
//                         opacity: 1;
//                     }
//                 }

//                 @keyframes scaleIn {
//                     from {
//                         opacity: 0;
//                         transform: scale(0.9) translateY(20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: scale(1) translateY(0);
//                     }
//                 }

//                 .animate-fadeIn {
//                     animation: fadeIn 0.3s ease-out;
//                 }

//                 .animate-scaleIn {
//                     animation: scaleIn 0.3s ease-out;
//                 }
//             `}</style>

//             {/* Navbar */}
//             <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//                 <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//                     <div className="flex items-center justify-between h-14 sm:h-16">
//                         {/* Logo */}
//                         <div className="flex items-center space-x-2 flex-shrink-0">
//                             <img
//                                 src="./Logo2.svg"
//                                 alt="Lezy Logo"
//                                 className="h-6 sm:h-7 lg:h-8 w-auto"
//                             />
//                         </div>

//                         {/* Desktop Navigation */}
//                         <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
//                             <div className="px-3 py-1.5 text-xs xl:text-sm text-violet-600 bg-purple-50 rounded-lg border border-purple-200 whitespace-nowrap">
//                                 🚀 Marketplace opening soon
//                             </div>
//                             <button
//                                 onClick={openModal}
//                                 className="inline-flex items-center px-3 xl:px-4 py-2 text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg shadow transition duration-200"
//                             >
//                                 <MdOutlineAddToPhotos className="w-4 h-4 xl:w-5 xl:h-5 mr-2" />
//                                 Create Post
//                             </button>
//                         </div>

//                         {/* Mobile/Tablet Navigation */}
//                         <div className="flex lg:hidden items-center space-x-2">
//                             <button
//                                 onClick={openModal}
//                                 className="inline-flex items-center px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-md shadow transition duration-200"
//                             >
//                                 <MdOutlineAddToPhotos className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
//                                 <span className="hidden xs:inline">Add</span>
//                                 <span className="xs:hidden">+</span>
//                             </button>

//                             <button
//                                 ref={hamburgerRef}
//                                 onClick={toggleSidebar}
//                                 className="p-1.5 sm:p-2 text-violet-700 bg-purple-100 hover:bg-purple-200 rounded-md transition duration-200"
//                             >
//                                 <svg
//                                     className="w-4 h-4 sm:w-5 sm:h-5"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile notification bar */}
//                 <div className="lg:hidden px-3 sm:px-4 py-2 bg-purple-50 border-t border-purple-200 text-center">
//                     <div className="inline-flex items-center space-x-1 text-xs sm:text-sm text-violet-600">
//                         <IoMdNotificationsOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         <span>Marketplace opening soon</span>
//                     </div>
//                 </div>
//             </nav>

//             {/* Overlay for mobile sidebar */}
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden"
//                     onClick={closeSidebar}
//                 />
//             )}

//             {/* Main Layout Container */}
//             <div className="flex-1 pt-[88px] sm:pt-[96px] lg:pt-16 flex min-h-0">
//                 <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-6 flex min-h-0">
//                     {/* Desktop Layout */}
//                     <div className="hidden lg:grid lg:grid-cols-12 xl:grid-cols-13 gap-4 xl:gap-6 w-full min-h-0">
//                         {/* Left Sidebar - Desktop */}
//                         <aside className="lg:col-span-3 xl:col-span-3 sticky top-20 self-start max-h-[calc(100vh-6rem)] bg-white rounded-xl shadow-sm">
//                             <div className="h-full flex flex-col p-4 overflow-y-auto">
//                                 {/* Marketplace Button */}
//                                 <div className="mb-4">
//                                     <button
//                                         onClick={handleMarketplaceClick}
//                                         className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg transition-colors duration-200"
//                                     >
//                                         <AiOutlineShop className="w-4 h-4 xl:w-5 xl:h-5 mr-2" />
//                                         Market Place
//                                     </button>
//                                 </div>

//                                 <hr className="border-gray-200 mb-4" />

//                                 {/* Filter Buttons */}
//                                 <div className="space-y-1 mb-4">
//                                     {filterOptions.map(
//                                         ({ key, label, icon }) => (
//                                             <button
//                                                 key={key}
//                                                 onClick={() => setFilter(key)}
//                                                 className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${filter === key
//                                                     ? "bg-violet-100 text-violet-700"
//                                                     : "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
//                                                     }`}
//                                             >
//                                                 {icon}
//                                                 <span className="ml-2 xl:ml-3 truncate">
//                                                     {label}
//                                                 </span>
//                                             </button>
//                                         )
//                                     )}
//                                 </div>

//                                 <hr className="border-gray-200 mb-4" />

//                                 {/* Additional Menu */}
//                                 <div className="space-y-1 flex-1">
//                                     {menuItems.map(
//                                         ({ icon, label, onClick }) => (
//                                             <button
//                                                 key={label}
//                                                 onClick={onClick}
//                                                 className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                             >
//                                                 {icon}
//                                                 <span className="ml-2 xl:ml-3 truncate">
//                                                     {label}
//                                                 </span>
//                                             </button>
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                         </aside>

//                         {/* Main Content Area */}
//                         <div className="lg:col-span-6 xl:col-span-7 flex flex-col min-h-0">
//                             <div className="flex-1 overflow-y-auto">
//                                 {postsFiltered.length === 0 ? (
//                                     <NoPostsFound openModal={openModal} />
//                                 ) : (
//                                     <div className="space-y-4 lg:space-y-6 pb-6">
//                                         {postsFiltered.map((post) => (
//                                             <div
//                                                 key={post._id}
//                                                 className="w-full"
//                                             >
//                                                 <NewCard
//                                                     post={post}
//                                                     fetchListingsAll={
//                                                         fetchListings
//                                                     }
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Right Sidebar - Desktop */}
//                         <aside className="lg:col-span-3 xl:col-span-3 sticky top-20 self-start max-h-[calc(100vh-6rem)]">
//                             <div className="bg-white rounded-xl shadow-sm p-4 space-y-3 h-full flex flex-col">
//                                 {/* User Profile */}
//                                 <div className="flex items-center space-x-2">

//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-sm font-medium text-gray-900 truncate">
//                                             Hi, {firstName}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                             Good to see you again!
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <hr className="border-gray-200" />

//                                 {/* Account Actions */}
//                                 <div className="space-y-1">
//                                     <button
//                                         onClick={openAccountSettingsModal}
//                                         className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                     >
//                                         <IoMdSettings className="w-4 h-4 mr-2" />
//                                         Account Settings
//                                     </button>
//                                     <button
//                                         onClick={logout}
//                                         className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-200"
//                                     >
//                                         <IoLogOutOutline className="w-4 h-4 mr-2" />
//                                         Logout
//                                     </button>
//                                 </div>

//                                 <hr className="border-gray-200" />

//                                 {/* Footer Links */}
//                                 <div className="space-y-1 flex-1 overflow-y-auto">
//                                     {/* {footerLinks.map(({ label, onClick }) => (
//                                         <button
//                                             key={label}
//                                             onClick={onClick}
//                                             className="w-full px-3 py-2 text-sm text-gray-600 hover:text-violet-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
//                                         >
//                                             {label}
//                                         </button>
//                                     ))} */}
//                                     {footerLinks.map(({ label, to, onClick }) =>
//                                         to ? (
//                                             <Link
//                                                 key={label}
//                                                 to={to}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                             >
//                                                 <span>{label}</span>
//                                             </Link>
//                                         ) : (
//                                             <button
//                                                 key={label}
//                                                 onClick={() => {
//                                                     onClick?.();
//                                                     setIsSidebarOpen(false); // optional, if needed
//                                                 }}
//                                                 className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                             >
//                                                 <span>{label}</span>
//                                             </button>
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                         </aside>
//                     </div>

//                     {/* Mobile/Tablet Layout */}
//                     <div className="lg:hidden w-full flex flex-col min-h-0">
//                         {/* Mobile Sidebar */}
//                         <aside
//                             ref={sidebarRef}
//                             className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen
//                                 ? "translate-x-0"
//                                 : "-translate-x-full"
//                                 }`}
//                         >
//                             <div className="h-full flex flex-col">
//                                 {/* Mobile Sidebar Header */}
//                                 <div className="px-4 py-3 border-b border-gray-200 bg-white">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <img
//                                                 src="./Logo.svg"
//                                                 alt="Lezy Logo"
//                                                 className="h-5 w-auto flex-shrink-0"
//                                             />
//                                             <div className="ml-2 flex items-center gap-2">
//                                                 <span className="text-base font-semibold text-gray-900">
//                                                     lezy
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <button
//                                             onClick={closeSidebar}
//                                             className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                                         >
//                                             <IoClose className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                                     {/* User Profile */}
//                                     <div>
//                                         <div className="flex items-center space-x-2">
//                                             {/* <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//                                                 <img
//                                                     src="https://i.pinimg.com/736x/df/f2/c6/dff2c64108660e659bc12bfa306b56a3.jpg"
//                                                     alt="Profile"
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </div> */}
//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-sm font-medium text-gray-900 truncate">
//                                                     Hi, {firstName}
//                                                 </p>
//                                                 <p className="text-xs text-gray-500">
//                                                     Good to see you again!
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <hr className="border-gray-200 mt-3" />
//                                     </div>

//                                     {/* Marketplace Button */}
//                                     <div>
//                                         <button
//                                             onClick={handleMarketplaceClick}
//                                             className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#a100ff] hover:bg-violet-700 rounded-lg transition-colors duration-200"
//                                         >
//                                             <AiOutlineShop className="w-5 h-5 mr-2" />
//                                             Market Place
//                                         </button>
//                                     </div>

//                                     <hr className="border-gray-200" />

//                                     {/* Filter Buttons */}
//                                     <div className="space-y-1.5">
//                                         {filterOptions.map(
//                                             ({ key, label, icon }) => (
//                                                 <button
//                                                     key={key}
//                                                     onClick={() => {
//                                                         setFilter(key);
//                                                         setIsSidebarOpen(false);
//                                                     }}
//                                                     className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${filter === key
//                                                         ? "bg-violet-100 text-violet-700"
//                                                         : "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
//                                                         }`}
//                                                 >
//                                                     {icon}
//                                                     <span className="ml-3">
//                                                         {label}
//                                                     </span>
//                                                 </button>
//                                             )
//                                         )}
//                                     </div>

//                                     <hr className="border-gray-200" />

//                                     {/* Additional Menu */}
//                                     <div className="space-y-1.5">
//                                         {menuItems.map(
//                                             ({ icon, label, onClick }) => (
//                                                 <button
//                                                     key={label}
//                                                     onClick={onClick}
//                                                     className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                                 >
//                                                     {icon}
//                                                     <span className="ml-3">
//                                                         {label}
//                                                     </span>
//                                                 </button>
//                                             )
//                                         )}
//                                     </div>

//                                     {/* Account Settings */}
//                                     <div>
//                                         <hr className="border-gray-200" />
//                                         <div className="space-y-2 mt-4">
//                                             <h3 className="text-sm font-medium text-gray-900 mb-2">
//                                                 Account
//                                             </h3>
//                                             <button
//                                                 onClick={() => {
//                                                     openAccountSettingsModal();
//                                                     setIsSidebarOpen(false);
//                                                 }}
//                                                 className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                             >
//                                                 <IoMdSettings className="w-5 h-5 mr-2" />
//                                                 Account Settings
//                                             </button>
//                                             <button
//                                                 onClick={() => {
//                                                     logout();
//                                                     setIsSidebarOpen(false);
//                                                 }}
//                                                 className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-200"
//                                             >
//                                                 <IoLogOutOutline className="w-5 h-5 mr-2" />
//                                                 Logout
//                                             </button>
//                                         </div>
//                                         <hr className="border-gray-200" />
//                                         <div className="space-y-1.5">
//                                             {/* {footerLinks.map(
//                                                 ({ label, onClick }) => (
//                                                     <button
//                                                         key={label}
//                                                         onClick={() => {
//                                                             onClick();
//                                                             setIsSidebarOpen(
//                                                                 false
//                                                             );
//                                                         }}
//                                                         className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                                     >
//                                                         <span className="ml-3">
//                                                             {label}
//                                                         </span>
//                                                     </button>
//                                                 )
//                                             )} */}
//                                             {footerLinks.map(({ label, to, onClick }) =>
//                                                 to ? (
//                                                     <Link
//                                                         key={label}
//                                                         to={to}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                                     >
//                                                         <span>{label}</span>
//                                                     </Link>
//                                                 ) : (
//                                                     <button
//                                                         key={label}
//                                                         onClick={() => {
//                                                             onClick?.();
//                                                             setIsSidebarOpen(false); // optional, if needed
//                                                         }}
//                                                         className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-violet-700 rounded-lg transition-colors duration-200"
//                                                     >
//                                                         <span>{label}</span>
//                                                     </button>
//                                                 )
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </aside>

//                         {/* Mobile Main Content */}
//                         <div className="flex-1 overflow-y-auto">
//                             {postsFiltered.length === 0 ? (
//                                 <NoPostsFound openModal={openModal} />
//                             ) : (
//                                 <div className="space-y-4 pb-6">
//                                     {postsFiltered.reverse().map((post) => (
//                                         <div key={post._id} className="w-full">
//                                             <NewCard
//                                                 post={post}
//                                                 fetchListingsAll={fetchListings}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//                     <div className="bg-white rounded-3xl w-full max-w-[95%] sm:max-w-[800px] h-[90vh] flex flex-col border border-violet-200 shadow-2xl">
//                         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                             <h2 className="text-2xl font-bold text-[#A100FF] tracking-tight">
//                                 Create New Post
//                             </h2>
//                             <button
//                                 onClick={() => closeModal()}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <svg
//                                     className="w-6 h-6"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     ></path>
//                                 </svg>
//                             </button>
//                         </div>
//                         <div className="flex-1 overflow-y-auto">
//                             <FounderPostForm
//                                 onClose={closeModal}
//                                 fetchListings={fetchListings}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Modal
//                 isOpen={isAccountSettingsModalOpen}
//                 style={{
//                     content: {
//                         top: "50%",
//                         left: "50%",
//                         right: "auto",
//                         bottom: "auto",
//                         marginRight: "-50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "95%",
//                         maxWidth: "800px",
//                         maxHeight: "90vh",
//                         overflowY: "auto",
//                         padding: "0",
//                         borderRadius: "12px",
//                         backgroundColor: "#ffffff",
//                         border: "none",
//                     },
//                     overlay: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         // backdropFilter: "blur(8px)",
//                         WebkitBackdropFilter: "blur(8px)",
//                         zIndex: 1000,
//                     },
//                 }}
//             >
//                 <AccountSettings onClose={closeAccountSettingsModal} />
//             </Modal>

//             <Modal
//                 isOpen={isContactUsModalOpen}
//                 style={{
//                     content: {
//                         top: "50%",
//                         left: "50%",
//                         right: "auto",
//                         bottom: "auto",
//                         marginRight: "-50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "95%",
//                         maxWidth: "500px",
//                         maxHeight: "90vh",
//                         zIndex: "90",
//                         overflowY: "auto",
//                         padding: "0",
//                         borderRadius: "12px",
//                         backgroundColor: "#ffffff",
//                         border: "none",
//                     },
//                     overlay: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         // backdropFilter: "blur(8px)",
//                         WebkitBackdropFilter: "blur(8px)",
//                         zIndex: 1000,
//                     },
//                 }}
//             >
//                 <ContactUs
//                     firstName={firstName}
//                     phoneNumber={phoneNumber}
//                     lastName={lastName}
//                     email={email}
//                     type="Feedback"
//                     onClose={closeContactUsModal}
//                 />
//             </Modal>

//             {/* Below is Terms and conditions Modal */}
//             {/* <Modal
//                 isOpen={isTermsModalOpen}
//                 onRequestClose={closeTermsModal}
//                 style={{
//                     content: {
//                         top: "50%",
//                         left: "50%",
//                         right: "auto",
//                         bottom: "auto",
//                         marginRight: "-50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "95%",
//                         maxWidth: "800px",
//                         maxHeight: "90vh",
//                         overflowY: "auto",
//                         padding: "25px",
//                         borderRadius: "12px",
//                         backgroundColor: "#ffffff",
//                         border: "none",
//                     },
//                     overlay: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         // backdropFilter: "blur(8px)",
//                         WebkitBackdropFilter: "blur(8px)",
//                         zIndex: 1000,
//                     },
//                 }}
//             >
//                 <TermsAndConditions onClose={closeTermsModal} />
//             </Modal> */}

//             {/* Below is Privecy Policy Modal */}
//             {/* <Modal
//                 isOpen={isPrivacyModalOpen}
//                 onRequestClose={closePrivacyModal}
//                 style={{
//                     content: {
//                         top: "50%",
//                         left: "50%",
//                         right: "auto",
//                         bottom: "auto",
//                         marginRight: "-50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "95%",
//                         maxWidth: "800px",
//                         maxHeight: "90vh",
//                         overflowY: "auto",
//                         padding: "25px",
//                         borderRadius: "12px",
//                         backgroundColor: "#ffffff",
//                         border: "none",
//                     },
//                     overlay: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         // backdropFilter: "blur(8px)",
//                         WebkitBackdropFilter: "blur(8px)",
//                         zIndex: 1000,
//                     },
//                 }}
//             >
//                 <PrivacyPolicies onClose={closePrivacyModal} />
//             </Modal> */}

//             {/* Marketplace Popup */}
//             <Popup
//                 isOpen={showMarketplacePopup}
//                 onClose={() => setShowMarketplacePopup(false)}
//                 title="Marketplace"
//                 icon={<AiOutlineShop />}
//                 description="Find and connect with amazing people who matches your vision, skills and vibe.  Marketplace will open once there are sufficient people on the platform."
//                 comingSoon={true}
//             />

//             {/* Other Popups */}
//             <Popup
//                 isOpen={showFavouritesPopup}
//                 onClose={() => setShowFavouritesPopup(false)}
//                 title="Favourite Posts"
//                 icon={<BsBookmarkStar />}
//                 description="View and manage all your saved posts/connections in one place."
//                 comingSoon={true}
//             />

//             <Popup
//                 isOpen={showPurchasedPopup}
//                 onClose={() => setShowPurchasedPopup(false)}
//                 title="Purchased Posts"
//                 icon={<IoIdCard />}
//                 description="Access all the connections that you have made. You purchased posts/connections will be available here."
//                 comingSoon={true}
//             />

//             <Popup
//                 isOpen={showHistoryPopup}
//                 onClose={() => setShowHistoryPopup(false)}
//                 title="Purchase History"
//                 icon={<MdOutlineHistory />}
//                 description="Track all your purchase history and transactions. Keep records of your spending."
//                 comingSoon={true}
//             />
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState } from 'react';
import NavbarTwo from '../../Home/NavbarTwo';
import AskQuestion from '../UserPostForm/AskQuestion';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <NavbarTwo onAskClick={() => setIsModalOpen(true)} />
      <AskQuestion isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
