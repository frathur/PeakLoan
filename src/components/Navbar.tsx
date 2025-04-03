import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user from localStorage on mount
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-indigo-600 text-2xl font-bold">PeakLoan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition duration-150">
                BORROW <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                <Link to="/personal-loans" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Personal Loans</Link>
                <Link to="/auto-loans" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Auto Loans</Link>
                <Link to="/home-loans" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Home Loans</Link>
              </div>
            </div>
            
            <Link to="/for-lenders" className="text-gray-700 font-medium hover:text-indigo-600 transition duration-150">
              FOR LENDERS
            </Link>
            
            <Link to="/for-dealers" className="text-gray-700 font-medium hover:text-indigo-600 transition duration-150">
              FOR DEALERS
            </Link>
            
            <div className="relative group">
              <button className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition duration-150">
                ABOUT <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                <Link to="/our-story" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Our Story</Link>
                <Link to="/team" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Our Team</Link>
                <Link to="/careers" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Careers</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition duration-150">
                RESOURCES <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Blog</Link>
                <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">FAQ</Link>
                <Link to="/help-center" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Help Center</Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* User Account / Login */}
          <div className="hidden lg:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-gray-700">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Profile</Link>
                    <Link to="/my-loans" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">My Loans</Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/register" className="text-gray-700 hover:text-indigo-600 font-medium">
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 font-medium"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-4">
              <div>
                <button className="flex justify-between w-full py-2 text-gray-700 font-medium">
                  BORROW <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-2">
                  <Link to="/personal-loans" className="block py-2 text-gray-600">Personal Loans</Link>
                  <Link to="/auto-loans" className="block py-2 text-gray-600">Auto Loans</Link>
                  <Link to="/home-loans" className="block py-2 text-gray-600">Home Loans</Link>
                </div>
              </div>
              
              <Link to="/for-lenders" className="block py-2 text-gray-700 font-medium">
                FOR LENDERS
              </Link>
              
              <Link to="/for-dealers" className="block py-2 text-gray-700 font-medium">
                FOR DEALERS
              </Link>
              
              <div>
                <button className="flex justify-between w-full py-2 text-gray-700 font-medium">
                  ABOUT <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-2">
                  <Link to="/our-story" className="block py-2 text-gray-600">Our Story</Link>
                  <Link to="/team" className="block py-2 text-gray-600">Our Team</Link>
                  <Link to="/careers" className="block py-2 text-gray-600">Careers</Link>
                </div>
              </div>
              
              <div>
                <button className="flex justify-between w-full py-2 text-gray-700 font-medium">
                  RESOURCES <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-2">
                  <Link to="/blog" className="block py-2 text-gray-600">Blog</Link>
                  <Link to="/faq" className="block py-2 text-gray-600">FAQ</Link>
                  <Link to="/help-center" className="block py-2 text-gray-600">Help Center</Link>
                </div>
              </div>
              
              {user ? (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700 mr-3">
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  <Link to="/profile" className="block py-2 text-gray-600">Profile</Link>
                  <Link to="/my-loans" className="block py-2 text-gray-600">My Loans</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-3">
                  <Link to="/register" className="text-gray-700 py-2 font-medium">
                    Register
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md text-center font-medium"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;