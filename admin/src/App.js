import React, { useState } from 'react';
import { MdSwitchRight, MdSwitchLeft } from 'react-icons/md';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import NotFound from './components/NotFound';
import UpdatePost from './components/UpdatePost';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

export default function App() {
  const [closedNav, setClosedNav] = useState(false);
  const toggleNav = () => {
    setClosedNav(!closedNav);
  };
  const getNavWidth = () => (closedNav ? 'w-16' : 'w-56');
  const location = useLocation();

  // Render the SearchForm only on the home page
  const renderSearchForm = location.pathname === '/';

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Nav Section */}
      <div
        className={`${getNavWidth()} min-h-screen transition-width bg-[#2E2E2E] text-white shadow-lg`}
      >
        <div className="sticky top-0">
          <Navbar closed={closedNav} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-h-screen bg-[#EEEEEE] overflow-y-auto">
        <div className="sticky top-0 bg-white py-2 px-4 shadow-md">
          <div className="flex items-center justify-between">
            <button onClick={toggleNav}>
              {closedNav ? (
                <MdSwitchLeft color="#222831" size={20} />
              ) : (
                <MdSwitchRight color="#222831" size={20} />
              )}
            </button>
            {renderSearchForm && <SearchForm className="w-full" />}
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
