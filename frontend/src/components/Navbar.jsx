import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = [
    { 
      id: 'home', 
      label: 'Prediksi CKD', 
      icon: <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> 
    },
    { 
      id: 'dashboard', 
      label: 'Dashboard Data', 
      icon: <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> 
    },
    { 
      id: 'education', 
      label: 'Pusat Edukasi', 
      icon: <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> 
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setActivePage('home')}>
            <span className="font-serif font-black text-2xl text-primary tracking-tight group-hover:text-secondary transition-colors">NephroAI</span>
            <span className="ml-2 w-2 h-2 rounded-full bg-secondary"></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 h-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center text-sm font-bold transition-all duration-200 border-b-2 h-full ${
                  activePage === item.id
                    ? 'text-primary border-primary'
                    : 'text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="md:hidden flex overflow-x-auto bg-white border-t border-gray-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`whitespace-nowrap flex-1 flex justify-center items-center py-4 px-4 text-xs font-bold transition-all border-b-2 ${
              activePage === item.id
                ? 'text-primary border-primary bg-stone-50'
                : 'text-gray-400 border-transparent hover:text-gray-700'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
