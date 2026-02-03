import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header'
function Layout({isPremium}) {
  return (
    <div>
    <Header isPremium={isPremium}/>
    <Outlet/>
    </div>
  )
}

export default Layout