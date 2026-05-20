import React from 'react'
import ExpenseNav from '../ExpenseNav'

const Layout = ({children}) => {
  return (
    <>
     <ExpenseNav/>
    <div>{children}</div>
    </>
   
  )
}

export default Layout