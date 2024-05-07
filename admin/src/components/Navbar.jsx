import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';
import { IoCreateOutline } from 'react-icons/io5';
import { FaFacebook, FaJournalWhills } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';

const NavItem = ({ to, value, Icon, closed }) => {
  const commonClasses = 'flex items-center space-x-2 p-2 block whitespace-nowrap';
  const activeClass = commonClasses + ' bg-green text-white';
  const inActiveClass = commonClasses + ' text-gray-500';

  return (
    <NavLink className={({ isActive }) => (isActive ? activeClass : inActiveClass)} to={to}>
      {Icon}
      <span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width overflow-hidden'}>
        {value}
      </span>
    </NavLink>
  );
};

export default function Navbar({ closed }) {
  return (
    <nav>
      <div className='flex justify-center p-4 pb-8 mt-2'>
        <img className='w-20' src="./unipenlogogold.png" alt="" />
      </div>
      <ul>
        <li><NavItem closed={closed} to='/' value='Home' Icon={<HiOutlineHome size={24} />} /></li>
        <li><NavItem closed={closed} to='/create-post' value='Create Article' Icon={<IoCreateOutline size={24} />} /></li>
      </ul>
      <ul className="justify-center mt-80 pt-4 gap-3">
        <li className="hover:bg-stone-800 hover:text-white hover:shadow-lg pb-1">
          <NavItem
            closed={closed}
            to="https://www.facebook.com/upangherald"
            value="The Student Herald"
            Icon={<FaFacebook size={24} color="#4267B2" />}
          />
        </li>
        <li className="hover:bg-stone-800 hover:text-white hover:shadow-lg pb-1">
          <NavItem
            closed={closed}
            to="https://issuu.com/thestudentsheraldofficial"
            value="Digital Newspapers"
            Icon={<CgWebsite size={24} color="#FF8E20" />}
          />
        </li>
        <li className="hover:bg-stone-800 hover:text-white hover:shadow-lg pb-1">
          <NavItem
            closed={closed}
            to="https://upangherald.blogspot.com/"
            value="Official Blogspot"
            Icon={<FaJournalWhills size={22} color="yellow" />}
          />
        </li>
      </ul>
    </nav>
  );
}

{/* <div className='grid grid-flow-col ml-4 mt-96 pt-12'>
  <div style={{ marginRight: '-2rem', marginLeft:'1rem'}}>
    <NavItem closed={closed} to='https://www.facebook.com/upangherald' Icon={<FaFacebook size={48} color='#4267B2 ' />} />
  </div>
  <div style={{ marginRight: '-2rem' }}>
    <NavItem closed={closed} to='https://issuu.com/thestudentsheraldofficial' Icon={<CgWebsite size={50} color='#FF8E20' />} />
  </div>
  <div className='mt-1'>
    <NavItem closed={closed} to='https://upangherald.blogspot.com/' Icon={<FaJournalWhills size={40} color='yellow' />} />
  </div>
</div> */}