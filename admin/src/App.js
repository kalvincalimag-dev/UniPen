import React, {useState} from 'react'
import {AiOutlineMenuFold} from 'react-icons/ai'


export default function App() {

  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  const getNavWidth = () => (closedNav ? 'w-16' : 'w-56');


  return (
    <div className='flex'>
        {/*Nav Section */}
        <div className={getNavWidth() + ' h-screen bg-red-100 transition-width'}></div>

        {/*Content Section */}
        <div className='flex-1 min-h-screen bg-blue-100'>
          <button onClick={toggleNav}>
            <AiOutlineMenuFold size={25}/>
          </button>
        </div>
    </div>
  )
}
