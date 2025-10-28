import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Products',to:'/das' },
    { name: 'Vendors',to:'/dashboard' },
    { name: 'Leads' , to:'/'},
    
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-[#082c4f] h-screen flex flex-col justify-between shadow-lg fixed">
      {/* Top Section: Profile */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <div>
            <p className="text-white text-lg font-semibold">Admin</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item?.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#8E44AD] text-white shadow-md"
                    : "text-[#BDC3C7] hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span className="text-md font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className=' w-full flex items-center justify-center'>
        <button
          onClick={handleLogout}
          className="text-md w-[70%] text-center font-medium py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all duration-200 mb-6 shadow-md cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
