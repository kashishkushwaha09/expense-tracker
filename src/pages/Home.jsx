import React from 'react'
import WelcomeBanner from '../components/WelcomeBanner'
import ExpenseTracker from '../components/expense-manage/ExpenseTracker';

const 
Home = () => {
  return (
    <div>
        <WelcomeBanner/>
        <ExpenseTracker/>
    </div>
  )
}

export default Home;
