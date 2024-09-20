import ExpenseCategoryItem from './components/ExpenseCategoryItem';
import { currencyFormatter } from './lib/utils'

const DummyData = [
  {
    id: 1,
    title: "Entertainment",
    color: '#000',
    amount: 500
  },
  {
    id: 2,
    title: "party",
    color: '#000',
    amount: 1000
  },
  {
    id: 3,
    title: "Movies",
    color: '#000',
    amount: 200
  },
  {
    id: 4,
    title: "Holiday",
    color: '#000',
    amount: 800
  },

]
export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">

      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
      </section>
      <section className="flex items-center gap-2 py-3">

        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* expenses */}

      <section className='py-6'>
        <h3 className='text-2xl '>My Expense</h3>
        <div className='flex flex-col gap-4 mt-4'>
          {DummyData.map((expense => {
            return (
              <ExpenseCategoryItem
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            )
          }
          ))}
        </div>
      </section>
      {/* chart section */}
      <section className='py-6'>
        <h3 className='text-2xl'>Stats</h3>
      </section>
    </main>
  );
}
