import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Header() {
    const router = useRouter();
    const { pathname } = router;

    const active = 'text-green-600 transition hover:text-green-500/75 p-3 rounded-md bg-gray-200'
    const inActive = 'text-gray-500 transition hover:text-gray-500/75 p-3'

    return (
        <div >
            <header className="bg-white border-b w-screen ">
                <div className="mx-auto w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <a className="block text-teal-600" href="#">
                                <span className="sr-only">Home</span>
                                <Image
                                    src="/Logo.png"
                                    width={180}
                                    height={180}
                                    alt="Picture of the author"
                                />


                            </a>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link
                                            className={pathname === '/' ? active : inActive}
                                            href="/"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className={pathname === '/products' ? active : inActive}
                                            href="/products"
                                        >
                                            Products
                                        </Link>
                                    </li>

                                    <li>
                                         {/* <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Categories </a>   */}
                                          <Link
                                            className={pathname === '/Category' ? active : inActive}
                                            href="/categories"
                                        >
                                            Categories
                                        </Link>

                                    </li>

                                    <li>
                                        {/* <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Order </a> */}
                                        <Link
                                            className={pathname === '/orders' ? active : inActive}
                                            href="/orders"
                                        >
                                            Orders
                                        </Link>
                                    </li>

                                    <li>
                                        {/* <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Settings </a> */}
                                        <Link
                                            className={pathname === '/settings' ? active : inActive}
                                            href="/settings"
                                        >
                                            Settings
                                        </Link>

                                    </li>


                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                {/* <a
                                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                    href="#"
                                >
                                    Login
                                </a> */}

                                {/* <div className="hidden sm:flex">
                                    <a
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                                        href="#"
                                    >
                                        Register
                                    </a>
                                </div> */}
                            </div>
                            <div className="h-10 w-10">
                                <img className="h-full w-full rounded-full object-cover object-center" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Logo" />

                            </div>

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

