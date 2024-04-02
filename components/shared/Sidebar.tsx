"use client"

import { navLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { HandleLoginUser } from '@/lib/actions/users.actions'
import { useEffect } from 'react'
import { useVariableContext } from '@/context/ContextProvider'


const Sidebar = () => {

    const currentpath = usePathname()
    const { setcurrentUser } = useVariableContext()



    useEffect(() => {

        const HandleThisLogin = async () => {

            const user = await HandleLoginUser()
            setcurrentUser(user)

        }

        HandleThisLogin()

    }, [])





    return (



        <aside className='sidebar'>


            {/* Logo */}
            <Link href="/" className="sidebar-logo">
                <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
            </Link>


            {/* After Sign In */}
            <SignedIn>

                <ul className="nav-box nav-function">
                    {navLinks.slice(0, 6).map((link) => {

                        const isCurrent = currentpath === link.route ? 'curr-tab' : ''

                        return (

                            <li className={`nav-item ${isCurrent} `} key={link.route}>
                                <Link href={link.route} className={`nav-item `}>
                                    <Image src={link.icon} alt="logo" width={24} height={24} />
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>




                <div className="user-profile-box">
                    <ul className="nav-box nav-profile">
                        {navLinks.slice(6).map((link) => {

                            const isCurrent = currentpath === link.route ? 'curr-tab' : ''

                            return (

                                <li className={`nav-item ${isCurrent} `} key={link.route}>
                                    <Link href={link.route} className={`nav-item `}>
                                        <Image src={link.icon} alt="logo" width={24} height={24} />
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>


                    <div className="user-btn">
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>




            </SignedIn>





            {/* Sign Out */}
            <SignedOut>
                <button className='nav-item login-btn curr-tab'>
                    <Link href="/sign-in" className='nav-item' >
                        Login
                    </Link>
                </button>
            </SignedOut>




        </aside>
    )
}

export default Sidebar