
// import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {


  return (

    <div className="bg-white h-screen">
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">Welcome Back, <span className="text-green-800">Admin!</span></h1>

              <p className="mt-1.5 text-md text-gray-500 max-w-lg">View the statistics about your business. Also manage and add products. 🎉</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                href={'/products'}
              >
                <span className="text-sm font-medium"> View Products </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-200 px-5 py-3 text-orange-500 transition hover:bg-gray-50 hover:text-orange-700 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> View Shop </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Grids */}
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
