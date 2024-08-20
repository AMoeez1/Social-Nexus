import React from 'react'

export const Sm_layout = ({children}) => {
  return (
    <>
      <div className="h-full grid grid-cols-12">
        <div className="lg:col-span-2 md:col-span-1 col-span-10">
          <div className="hidden sm:block xl:hidden">
            <Sm_Sidebar/>
          </div>
        </div>

        <main className="container mx-auto bg-gray-100 col-span-11 w-full lg:col-span-10 xl:pl-12 pl-10 h-full ">
          {children}
        </main>
        {/* Footer */}
      </div>
      <div className="bg-gray-800 text-gray-300 fixed w-full" style={{ top: '70%' }}>
        <Footer />
      </div>
    </>
  )
}
