import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function RootLayout() {

  return (

    <div className="min-h-screen flex flex-col bg-black">

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>

  )
}

export default RootLayout