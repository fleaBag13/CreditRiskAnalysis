import React from 'react'
import { navLinks } from '../constants'

const Navbar = () => {
  return (
    <nav className='py-6 justify-between items-center navbar px-4'>
      <h2 className='font-semibold p-5 text-lg'>CredHelp</h2>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins
            font-normal
            cursor-pointer text-[16px]
            ${index===navLinks.length-1 ? 'mr-0' : 'mr-10'}`}>
              <a href={`${nav.id}`}>
                {nav.title}
              </a>
          </li>
        ))}
      </ul>

      </nav>
  )
}

export default Navbar
