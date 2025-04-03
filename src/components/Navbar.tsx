import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Retrieve user from localStorage on mount.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <div className="flex items-center">
             <span className="text-teal-500 text-2xl font-bold">PeakLoan</span>
            </div>
          </Link>
          <div className="hidden md:flex space-x-6">
            <div className="relative group">
              <button className="nav-link flex items-center">
                BORROW <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <Link to="/for-lenders" className="nav-link">
              FOR LENDERS
            </Link>
            <Link to="/for-dealers" className="nav-link">
              FOR DEALERS
            </Link>
            <div className="relative group">
              <button className="nav-link flex items-center">
                ABOUT <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="nav-link flex items-center">
                RESOURCES <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {user ? (
            <div className="relative inline-block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                  {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                </div>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700">
              LOG IN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
