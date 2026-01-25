import React, { useState } from 'react'
import Expenseform from '../components/Expenseform'
import Expenselist from '../components/ExpenseList'


function Home() {
  const [isSubmit , setIsSubmit] = useState(false)
  return (
    <>
    <Expenseform setIsSubmit={setIsSubmit} isSubmit={isSubmit}/>
    <Expenselist isSubmit={isSubmit}/>
    </>
  )
}

export default Home