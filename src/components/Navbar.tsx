import React from 'react';

const Navbar = () => {
  return (
    <header className='flex px-10 py-3 justify-center shadow-lg mb-10 w-full items-center'>
        <nav className='flex justify-between items-center w-full'>
            <h3 className='font-semibold leading-normal'>Insight<span className='text-orange-400'>IQ</span></h3>

            <button 
                type="button"
                onClick={() => window.open("https://github.com/AyodejiOmole")}
                className='bg-black shadow-sm rounded-full p-2 hover:bg-transparent hover:text-black hover:border hover:border-black text-white flex justify-center items-center'>Github project</button>
        </nav>
    </header>
  )
}

export default Navbar;
