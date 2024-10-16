"use client"
import { useContext, useEffect, useState } from 'react'


import { currencyFormatter } from './lib/utils'


// Chart
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

import ExpenseCategoryItem from './components/ExpenseCategoryItem';
import AddIncomeModal from './components/modals/AddIncomeModal';
import { FinanceContext } from './lib/store/FinanceContext';
import { authContext } from './lib/store/auth-context';
import AddExpenseModal from './components/modals/AddExpenseModal';
import Signin from './components/Signin';




chartjs.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [balance, setBalance] = useState(0)
  const { expenses, income } = useContext(FinanceContext)
  const {user} = useContext(authContext)



  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
  // console.log(income , expenses);



  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0)
    expenses.reduce((total, e) => {
      return total + e.total
    }, 0)
    setBalance(newBalance)
  }, [expenses, income])
if(!user){
  return <Signin />
}
  return (
    <>
      {/* AddIncome  Modal */}

      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />

      {/* Add Expense Modal */}

      <AddExpenseModal
        show={showExpenseModal}
        onClose={setShowExpenseModal}
      />

      <main className="container max-w-2xl px-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">

          <button
            onClick={() => {
              setShowExpenseModal(true)
            }}
            className="btn btn-primary">
            + Expenses
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => {
              setShowAddIncomeModal(true)
            }}>
            + Income
          </button>
        </section>

        {/* expenses */}

        <section className='py-6'>
          <h3 className='text-2xl '>My Expense</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map((expense => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  expense={expense}
                />
              )
            }
            ))}
          </div>
        </section>
        {/* chart section */}
        <section className='py-6'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    labels: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ['#18181b'],
                    borderWidth: 5,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
