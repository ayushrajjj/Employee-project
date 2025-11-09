import React from 'react'

const Navbar = () => {
  return (
    <div>
         <div className='bg-slate-800 h-16 px-16 flex  items-center'>
      <h1 className="text-5xl font-bold text-white ">Em Service</h1>
     <div className="space-x-4 ml-auto "> 
      <a  className="hover:text-blue-500 text-white" href="#">Home</a>
      <a  className="hover:text-blue-500 text-white" href="#">Profile</a>
      <a  className="hover:text-blue-500 text-white" href="#">Log out</a></div>
    </div>
    </div>
  )
}

export default Navbar