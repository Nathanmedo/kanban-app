import React from 'react'
import useWindowSize from '../customHooks/useWindowSize'

function Header() {
    
  return (
    <header className='w-full bg-green-300 px-6 py-3'>
        <div className='font-Poppins'>
          <div className='flex items-baseline gap-2'>
            <h1 className='text-3xl font-bold'>The Kanban App</h1>
            <div className='text-lg font-medium'>Created with React Js</div>
          </div>
          
          {/* <div>WindowHeight: {windowHeight}, windowWidth: {windowWidth}</div> */}
        </div>
    </header>
  )
}

export default Header;