import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/Airbnb_Logo_Bélo.svg.png'
import NavBar from './navbar'
import SearchBar from './searchBar'

const Header = ({ placeholder }: { placeholder?: string }) => {
  return (
    <header className='sticky top-0 z-50 bg-white shadow-md py-5'>
    <div className='container grid grid-cols-3 '>
      <Link href={'/'} className='relative flex items-center h-10 my-auto'>
      <Image src={logo.src} alt="logo"
      width={150}
      height={100}
      className='object-contain object-left'
      />
      </Link>
      <SearchBar placeholder={placeholder}/>
      <NavBar/>
    </div>
    </header>
  )
}

export default Header
