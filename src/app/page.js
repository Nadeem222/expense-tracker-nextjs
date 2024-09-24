"use client"
import { useContext, useState } from 'react'


import { currencyFormatter } from './lib/utils'


// Chart
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

import ExpenseCategoryItem from './components/ExpenseCategoryItem';
import AddIncomeModal from './components/modals/AddIncomeModal';
import { FinanceContext } from './lib/store/FinanceContext';




chartjs.register(ArcElement, Tooltip, Legend);
const DummyData = [
  { id: 1, title: "Entertainment", color: '#000', total: 500 },
  { id: 2, title: "Party", color: '#000', total: 1000 },
  { id: 3, title: "Movies", color: '#000', total: 200 },
  { id: 4, title: "Holiday", color: '#000', total: 800 },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true)
  
  const {expenses}= useContext(FinanceContext)



  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)





  return (
    <>
      {/* AddIncome  Modal */}

      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />

      <main className="container max-w-2xl px-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">

          <button
            onClick={() => {

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
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
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
