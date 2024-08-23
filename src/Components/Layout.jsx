import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Sm_Sidebar from './Sm_Sidebar';

export default function Layout({ children }) {
  return (
    <>
      <div className="h-full grid grid-cols-12 overflow-x-hidden overflow-y-hidden">
        <div className="lg:col-span-2 md:col-span-1 col-span-10">
          <div className="xl:block hidden">
            <Sidebar />
          </div>
          <div className="hidden sm:block xl:hidden">
            <Sm_Sidebar/>
          </div>
          <div className="">
            <Header />
          </div>
        </div>

        <main className="container mx-auto bg-gray-100 col-span-11 w-full lg:col-span-10 xl:pl-12 pl-10 h-full ">
          {children}
        </main>
        {/* Footer */}
      </div>
      <div className="bg-gray-100 fixed w-full" style={{ top: '92.5vh' }}>
        <Footer />
      </div>
    </>
  );
}
