import React from 'react'
import home from '../assets/home.svg'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full bg-black text-white border-b border-gray-200">
       <nav className="flex justify-between items-center py-4">
            <div className="ml-7 text-xl font-bold">Umeed</div>
            <div>
                <ul className="flex list-none mr-12 space-x-6 items-center">
                    <NavLink to={'/'}>
                      <li className='my-2.5 mx-1.25'>
                        <img title="Home" src={home} className="w-6 h-6" alt="Home"/>
                      </li>
                    </NavLink>
                    <NavLink to={'/login'}>
                      <li className='my-2.5 mx-1.25'>
                        <img title="Login" src={home} className="w-6 h-6" alt="Login"/>
                      </li>
                    </NavLink>
                    <NavLink to={'/questions'}>
                      <li className='my-2.5 mx-1.25'>
                        <img title="Questions" src={home} className="w-6 h-6" alt="Questions"/>
                      </li>
                    </NavLink>
                    <NavLink to={'/analysis'}>
                      <li className='my-2.5 mx-1.25'>
                        <img title="Analysis" src={home} className="w-6 h-6" alt="Analysis"/>
                      </li>
                    </NavLink>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
