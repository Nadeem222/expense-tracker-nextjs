"use client"
import { useState } from 'react'
import ExpenseCategoryItem from './components/ExpenseCategoryItem';
import { currencyFormatter } from './lib/utils'
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

chartjs.register(ArcElement, Tooltip, Legend);
const DummyData = [
  { id: 1, title: "Entertainment", color: '#000', total: 500 },
  { id: 2, title: "Party", color: '#000', total: 1000 },
  { id: 3, title: "Movies", color: '#000', total: 200 },
  { id: 4, title: "Holiday", color: '#000', total: 800 },
];
export default function Home() {
  const [modalOpen, setModalOpen] = useState(true)
  return (
    <>
      {/* Models */}
      {modalOpen && (

        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4'>
            <button
              onClick={() => {
                return setModalOpen(false)
              }}
              className='w-10 h-10 mb-4 font-bold rounded-full bg-slate-600'>
              X
            </button>
            <h1>I am a modal</h1>

          </div>
        </div>

      )}
      <main className="container max-w-2xl px-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">

          <button
            onClick={() => {
              return setModalOpen(true)
            }}
            className="btn btn-primary">
            + Expenses
          </button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* expenses */}

        <section className='py-6'>
          <h3 className='text-2xl '>My Expense</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {DummyData.map((expense => {
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
                labels: DummyData.map((expense) => expense.title),
                datasets: [
                  {
                    labels: "Expenses",
                    data: DummyData.map((expense) => expense.total),
                    backgroundColor: DummyData.map((expense) => expense.color),
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
