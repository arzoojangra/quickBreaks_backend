import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="bg-white border-orange-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="/QuickBreaks.png"
              className="h-6 sm:h-10"
              alt="Quick Breaks Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Quick Breaks
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="/leaves"
              className="text-black-800 hover:bg-orange-200 focus:ring-4 focus:ring-orange-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Leaves Dashboard
            </a>
            <a
              href="/partners"
              className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none "
            >
              Partners Dashboard
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
