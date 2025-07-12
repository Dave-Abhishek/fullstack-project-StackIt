// import { IoIosSearch } from "react-icons/io";
// import { MdPeopleOutline } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import TermsAndConditions from "../Policies/TermsAndConditions";
// import PrivacyPolicies from "../Policies/PrivacyPolicies";
// import Modal from "react-modal";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
// import { MdOutlineEmail } from "react-icons/md";
// import { LuPhone } from "react-icons/lu";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const Login = () => {
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("Founder");
//     const [errors, setErrors] = useState({});
//     const [formError, setFormError] = useState("");
//     const navigate = useNavigate();
//     const [loginMethod, setLoginMethod] = useState("email");
//     const [showPassword, setShowPassword] = useState(false);
//     // const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
//     // const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

//     // Below MySwl is used to show popup alerts when Login is successful.
//     const MySwal = withReactContent(Swal);

// /**
//     * Validates whether the given email string is in a proper email format.
//     * Uses a regular expression to check for a standard email structure:
//     * - Starts with one or more non-whitespace, non-@ characters
//     * - Followed by an @ symbol
//     * - Followed by one or more non-whitespace, non-@ characters
//     * - Followed by a dot (.)
//     * - Ends with one or more non-whitespace characters
//     *
// */
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const validatePhone = (phone) => {
//         const cleanedPhone = phone.replace(/[^\d+]/g, "");
//         const phoneRegex = /^\+?\d{10,15}$/;
//         return phoneRegex.test(cleanedPhone);
//     };

//     useEffect(() => {
//         if (role) {
//             setErrors((prev) => ({ ...prev, role: "" }));
//         }
//     }, [role]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormError("");
//         const newErrors = {
//             emailOrPhone: !emailOrPhone,
//             password: !password,
//             role: !role,
//         };
//         // console.log(newErrors);
//         if (Object.values(newErrors).some((error) => error)) {
//             setErrors({
//                 ...newErrors,
//                 emailOrPhone: !emailOrPhone ? "This field is required" : "",
//                 password: !password ? "This field is required" : "",
//                 role: !role ? "Please select a role" : "",
//             });
//             setFormError("All fields are required!");
//             return;
//         }

//         if (loginMethod === "email" && !validateEmail(emailOrPhone)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 emailOrPhone: "Please enter a valid email address!",
//             }));
//             setFormError("Please enter a valid email address!");
//             return;
//         }

//         if (loginMethod === "phone" && !validatePhone(emailOrPhone)) {
//             setErrors((prev) => ({
//                 ...prev,
//                 emailOrPhone: "Please enter a valid phone number!",
//             }));
//             setFormError("Please enter a valid phone number!");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 `https://test-api.klezy.com/api/auth/signin`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include",
//                     body: JSON.stringify({
//                         emailOrPhone,
//                         password,
//                         role,
//                     }),
//                 }
//             );

//             const data = await response.json();
//             console.log("DATA:", data);
//             if (data.success) {
//                 localStorage.setItem("role", JSON.stringify(data.role));
//                 localStorage.setItem("firstName", data.firstName);
//                 localStorage.setItem("middleName", data.middleName);
//                 localStorage.setItem("lastName", data.lastName);
//                 localStorage.setItem("email", data.email);
//                 localStorage.setItem("phoneNumber", data.phoneNumber);

//                 if (data.role === "GetDiscovered") {
//                     await MySwal.fire({
//                         title: "🎉 Login Successful!",
//                         text: "Redirecting you to the dashboard...",
//                         icon: "success",
//                         showConfirmButton: false,
//                         timer: 2000,
//                         timerProgressBar: true,
//                         backdrop: `rgba(161, 0, 255, 0.1)`,
//                         customClass: {
//                             popup: "rounded-lg shadow-lg",
//                             title: "text-lg font-semibold",
//                             content: "text-gray-700",
//                         },
//                     });
//                     navigate("/dashboad-getDiscovered");
//                 } else if (data.role === "Founder") {
//                     await MySwal.fire({
//                         title: "🎉 Login Successful!",
//                         text: "Redirecting you to the dashboard...",
//                         icon: "success",
//                         showConfirmButton: false,
//                         timer: 1000,
//                         timerProgressBar: true,
//                         backdrop: `rgba(161, 0, 255, 0.1)`,
//                         customClass: {
//                             popup: "rounded-lg shadow-lg",
//                             title: "text-lg font-semibold",
//                             content: "text-gray-700",
//                         },
//                     });
//                     navigate("/dashboard-founder");
//                 } else {
//                     setFormError("Unknown role. Access denied.");
//                 }
//             } else {
//                 if (data.message === "Invalid Password!") {
//                     setErrors((prev) => ({
//                         ...prev,
//                         password: data.message,
//                     }));
//                 }
//                 setFormError(data.message || "Login failed. Please try again.");
//             }
//         } catch (error) {
//             setFormError(
//                 error.message || "An error occurred. Please try again."
//             );
//         }
//     };

//     // const handleSignUp = () => {
//     //     navigate("/signupnew");
//     // };

//     const pageVariants = {
//         initial: { opacity: 0, x: 50 },
//         animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//         exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
//     };

//     // Functions to control Terms modal
//     // const openTermsModal = () => {
//     //     console.log("Opening Terms Modal");
//     //     setIsTermsModalOpen(true);
//     // };
//     // const closeTermsModal = () => setIsTermsModalOpen(false);

//     // // Functions to control Privacy modal
//     // const openPrivacyModal = () => {
//     //     console.log("Opening Privacy Modal");
//     //     setIsPrivacyModalOpen(true);
//     // };
//     // const closePrivacyModal = () => setIsPrivacyModalOpen(false);

//     // const modalStyles = {
//     //     content: {
//     //         top: "50%",
//     //         left: "50%",
//     //         right: "auto",
//     //         bottom: "auto",
//     //         marginRight: "-50%",
//     //         transform: "translate(-50%, -50%)",
//     //         width: "100%",
//     //         maxWidth: "800px",
//     //         maxHeight: "90vh",
//     //         overflowY: "auto",
//     //         padding: "4px",
//     //         borderRadius: "12px",
//     //         backgroundColor: "#ffffff",
//     //         border: "none",
//     //     },
//     //     overlay: {
//     //         backgroundColor: "rgba(0, 0, 0, 0.6)",
//     //         zIndex: 1000,
//     //     },
//     // };

//     // console.log(errors);
//     return (
//         <>
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key="login-page"
//                     className="font-sans min-h-screen bg-violet-100 flex flex-col gap-3 sm:gap-5 items-center justify-center p-3 sm:p-4 bg-cover bg-center"
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     variants={pageVariants}
//                 >
//                     <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
//                         <div className="absolute -right-[50%] top-[120%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[887px] lg:h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[50px] sm:blur-[75px] lg:blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                         <div className="absolute -left-[5%] -top-[20%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[887px] lg:h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[50px] sm:blur-[75px] lg:blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//                         <div className="absolute -right-[60%] -top-[10%] rounded-full w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[914px] lg:h-[914px] border-[50px] sm:border-[75px] lg:border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                         <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[814px] lg:h-[814px] border-[50px] sm:border-[75px] lg:border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
//                     </div>
//                     <form
//                         className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 h-fit w-full max-w-xs sm:max-w-sm md:max-w-md z-10"
//                         onSubmit={handleSubmit}
//                         noValidate
//                     >
//                         <div className="text-xs sm:text-sm text-start text-red-500">
//                             <p className="">
//                                 {formError !== "Invalid Password!"
//                                     ? `${formError}`
//                                     : ""}
//                             </p>
//                         </div>
//                         <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
//                             Sign In
//                         </h2>

//                         {/* <div className="mb-4 sm:mb-6 text-start">
//                             <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-gray-600 font-semibold">
//                                 I want to
//                             </p>
//                             <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
//                                 {["Founder", "GetDiscovered"].map((option) => (
//                                     <button
//                                         key={option}
//                                         type="button"
//                                         onClick={() => {
//                                             setRole(option);
//                                             setErrors((prev) => ({
//                                                 ...prev,
//                                                 role: "",
//                                             }));
//                                             setFormError("");
//                                         }}
//                                         className={`flex w-full items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border-2 rounded-lg sm:rounded-xl hover:border-purple-500 transition-all duration-300 ${role === option
//                                             ? "border-purple-600 text-white bg-purple-600"
//                                             : "border-gray-200 text-gray-600"
//                                             } ${errors.role ? "border-red-500" : ""
//                                             }`}
//                                     >
//                                         {option === "Founder" ? (
//                                             <>
//                                                 <span className="text-xs sm:text-sm font-medium">
//                                                     <FiSearch className="w-3 h-3 sm:w-4 sm:h-4" />
//                                                 </span>{" "}
//                                                 <span className="hidden xs:inline">Discover Talent</span>
//                                                 <span className="xs:hidden">Discover Talent</span>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <span className="text-xs sm:text-sm font-medium">
//                                                     <MdPeopleOutline className="w-3 h-3 sm:w-4 sm:h-4" />
//                                                 </span>{" "}
//                                                 <span className="hidden xs:inline">Get Discovered</span>
//                                                 <span className="xs:hidden">Get Discovered</span>
//                                             </>
//                                         )}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div> */}

//                         <div className="mb-3 sm:mb-4 text-start">
//                             <p className="text-xs sm:text-sm mb-2 text-gray-600 font-semibold">
//                                 Login using
//                             </p>
//                             <div className="flex justify-center w-full border border-gray-200 rounded-lg p-0.5">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setLoginMethod("email");
//                                         setEmailOrPhone("");
//                                         setErrors((prev) => ({
//                                             ...prev,
//                                             emailOrPhone: "",
//                                         }));
//                                         setFormError("");
//                                     }}
//                                     className={`w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold ${loginMethod === "email"
//                                         ? "bg-purple-600 text-white rounded-lg"
//                                         : "text-gray-500"
//                                         } transition-all duration-200`}
//                                 >
//                                     <span className="text-sm sm:text-lg">
//                                         <MdOutlineEmail />
//                                     </span>{" "}
//                                     Email
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setLoginMethod("phone");
//                                         setEmailOrPhone("");
//                                         setErrors((prev) => ({
//                                             ...prev,
//                                             emailOrPhone: "",
//                                         }));
//                                         setFormError("");
//                                     }}
//                                     className={`w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold ${loginMethod === "phone"
//                                         ? "bg-purple-600 text-white rounded-lg"
//                                         : "text-gray-500"
//                                         }`}
//                                 >
//                                     <span className="text-sm sm:text-lg">
//                                         <LuPhone />
//                                     </span>{" "}
//                                     Phone
//                                 </button>
//                             </div>
//                         </div>

//                         {loginMethod === "phone" ? (
//                             <div className="mb-3 sm:mb-4">
//                                 <PhoneInput
//                                     country={"in"}
//                                     value={emailOrPhone}
//                                     onChange={(value) => {
//                                         setEmailOrPhone(value);
//                                         setFormError("");
//                                     }}
//                                     containerClass="w-full"
//                                     inputClass={`w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base text-gray-900 border ${errors.emailOrPhone
//                                         ? "border-red-500"
//                                         : "border-gray-300"
//                                         } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
//                                     buttonClass="border-gray-300 h-10 sm:h-12"
//                                     dropdownClass="h-28"
//                                     containerStyle={{
//                                         height: "40px",
//                                         width: "100%",
//                                     }}
//                                     inputStyle={{
//                                         height: "40px",
//                                         width: "100%",
//                                         border: "1px #e5e7eb solid",
//                                         fontSize: "14px",
//                                     }}
//                                     buttonStyle={{
//                                         position: "absolute",
//                                         left: "5px",
//                                         top: "5px",
//                                         height: "32px",
//                                         width: "32px",
//                                         backgroundColor: "transparent",
//                                         border: "none",
//                                         outline: "none",
//                                     }}
//                                 />
//                             </div>
//                         ) : (
//                             <div className="mb-3 sm:mb-4">
//                                 <input
//                                     type="email"
//                                     value={emailOrPhone}
//                                     onChange={(e) => {
//                                         setEmailOrPhone(e.target.value);
//                                         setFormError("");
//                                     }}
//                                     className={`w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base border ${errors.emailOrPhone
//                                         ? "border-red-500"
//                                         : "border-gray-200"
//                                         } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
//                                     placeholder="Enter your email address"
//                                 />
//                             </div>
//                         )}

//                         <div className="mb-3 sm:mb-4 relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 value={password}
//                                 onChange={(e) => {
//                                     setPassword(e.target.value);
//                                     setFormError("");
//                                 }}
//                                 className={`w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base border ${errors.password
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                     } rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500`}
//                                 placeholder="Enter your password"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-500"
//                             >
//                                 {showPassword ? (
//                                     <FaEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" />
//                                 ) : (
//                                     <FaEye size={16} className="sm:w-[18px] sm:h-[18px]" />
//                                 )}
//                             </button>
//                         </div>
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 w-full gap-2 sm:gap-0">
//                             {errors.password && (
//                                 <p className="text-red-500 text-xs sm:text-sm order-2 sm:order-1 w-full sm:flex-1 text-start">
//                                     {errors.password === "Invalid Password!"
//                                         ? `${errors.password}`
//                                         : ""}
//                                 </p>
//                             )}
//                             {/* <a
// 								href="./forgot-password"
// 								className="text-purple-600 text-xs sm:text-sm hover:underline order-1 sm:order-2 text-end sm:flex-shrink-0"
// 								onClick={() => router.push("/forgot-password")}
// 							>
// 								Forgot password?
// 							</a> */}
//                             <Link
//                                 to="/forgot-password"
//                                 className="text-purple-600 text-xs sm:text-sm hover:underline order-1 sm:order-2 text-end sm:flex-shrink-0"
//                             >
//                                 Forgot password?
//                             </Link>
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full bg-purple-600 text-white p-2.5 sm:p-3 text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-all duration-300"
//                         >
//                             Sign In →
//                         </button>

//                         {/* <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
// 							Don't have an account?{" "}
// 							<a
// 								href="#"
// 								className="text-purple-600 hover:underline"
// 								onClick={handleSignUp}
// 							>
// 								Sign up for free
// 							</a>
// 						</p> */}
//                         <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
//                             Don't have an account?{" "}
//                             <Link
//                                 to="/signup"
//                                 className="text-purple-600 hover:underline"
//                             >
//                                 Sign up for free
//                             </Link>
//                         </p>
//                     </form>

//                     {/* <p className="text-sm sm:text-lg text-gray-500 mt-[10px] text-center z-10 px-4">
// 						By signing up, you agree to our{" "}
// 						<span
// 							className="text-[#A100FF] underline cursor-pointer"
// 							onClick={openTermsModal}
// 						>
// 							terms & conditions
// 						</span>
// 						{" & "}
// 						<span
// 							className="text-[#A100FF] underline cursor-pointer"
// 							onClick={openPrivacyModal}
// 						>
// 							Privacy Policy
// 						</span>
// 					</p> */}
//                     {/* <p className="text-sm sm:text-lg text-gray-500 mt-[10px] text-center -z-10 px-4">
//                         By signing up, you agree to our{" "}
//                         <Link
//                             to="/terms-and-conditions"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-[#A100FF] underline cursor-pointer"
//                         >
//                             terms & conditions
//                         </Link>{" "}
//                         &{" "}
//                         <Link
//                             to="/privacy-policy"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-[#A100FF] underline cursor-pointer"
//                         >
//                             Privacy Policy
//                         </Link>
//                     </p> */}
//                 </motion.div>
//                 {/* <Modal
// 					isOpen={isTermsModalOpen}
// 					onRequestClose={closeTermsModal}
// 					style={modalStyles}
// 					key={"terms-and-conditions"}
// 				>
// 					<div className="p-6">
// 						<TermsAndConditions onClose={closeTermsModal} />
// 					</div>
// 				</Modal>
// 				<Modal
// 					isOpen={isPrivacyModalOpen}
// 					onRequestClose={closePrivacyModal}
// 					style={modalStyles}
// 					key={"privecy-policy"}
// 				>
// 					<div className="p-6 h-full w-full">
// 						<PrivacyPolicies onClose={closePrivacyModal} />{" "}
// 					</div>
// 				</Modal> */}
//             </AnimatePresence>
//         </>
//     );
// };

// export default Login;

import React from 'react'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login