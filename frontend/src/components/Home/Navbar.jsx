import { PiCubeFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        // in nav, there is one property given "-mt-10". take care of that.                     
        <nav className="h-[60px] flex items-center justify-between w-full px-10 text-[#374151]">
            {/* Logo */}
            <div className="flex items-center justify-start px-5 gap-3">
                <Link to="/" className="flex items-center gap-2">
                    <PiCubeFill className="scale-x-[-1] text-2xl text-[#714B67]" />
                    <h1 className="text-2xl font-semibold -tracking-tighter ">StackIt</h1>
                </Link>
            </div>

            <div className="flex items-center justify-center gap-16">
                <div className="flex items-center justify-center gap-8 flex-nowrap text-md font-medium">
                    <button
                        onClick={() => navigate('/about-us')}
                        className="whitespace-nowrap cursor-pointer"
                    >
                        About Us
                    </button>
                </div>

                {/* Search Bar */}
                {/* <button
                    onClick={() => navigate('/login')}
                    className="hover:bg-[#714B67] hover:text-white text-[#714B67] cursor-pointer text-md font-medium border-2  border-[#714B67] px-6 py-2 rounded-full transition-all duration-300"
                >
                    Login
                </button> */}
            </div>
        </nav>
    );
};

export default Navbar;