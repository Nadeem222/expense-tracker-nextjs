"use client"
import { useState ,useRef , useEffect} from 'react'


import { currencyFormatter } from './lib/utils'

import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

import ExpenseCategoryItem from './components/ExpenseCategoryItem';
import Modal from './components/Modal';

// firbase

import {db} from "./lib/fireBase"
import {collection ,addDoc, getDocs, deleteDoc ,doc} from 'firebase/firestore'

// Icons

import { FaRegTrashCan } from "react-icons/fa6";


chartjs.register(ArcElement, Tooltip, Legend);
const DummyData = [
  { id: 1, title: "Entertainment", color: '#000', total: 500 },
  { id: 2, title: "Party", color: '#000', total: 1000 },
  { id: 3, title: "Movies", color: '#000', total: 200 },
  { id: 4, title: "Holiday", color: '#000', total: 800 },
];
export default function Home() {
  const [modalOpen, setModalOpen] = useState(true)

  const [income ,  setIncome] = useState([])

  console.log(income);
  
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)

  const amountRef = useRef()
  const descriptionRef = useRef()

  // Handler Function

  const addIncomeHandler = async (e) =>{
    e.preventDefault();

    const newIncome = {
      amount : parseFloat(amountRef.current.value),
      description : descriptionRef.current.value,
      createdAt : new Date()

    };

    const collectionRef = collection(db , 'income');

    try {
      const docSnap = await addDoc(collectionRef , newIncome)

      setIncome(prevState => {
       return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          }
        ]
      })

      amountRef.current.value = ""
      descriptionRef.current.value = ""
    } catch (error) {
      console.log(error.message);
      
    }

    
    
  }
  const deleteIncomeHandler = async (incomeId) => {
    const docRef = doc(db , 'income' , incomeId)
    try {
      
      await deleteDoc(docRef)

      // update State
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      })

    } catch (error) {
      console.log(error.message);
      
    }

  }
  useEffect(() => {
    const getIncome = async () =>{
      const collectionRef = collection(db , "income");
      const docsSnap = await getDocs(collectionRef)

      const data = docsSnap.docs.map((doc) => {
        return{
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }
      })
      setIncome(data)
    }
    getIncome()
  } , [])

  return (
    <>
      {/* A Models */}
      <Modal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className='input-group'>
          <div className='input-group'>
            <label htmlFor='amount'>Income Amount</label>
            <input
              name='amount'
              ref={amountRef}
              type='number'
              min={0.01}
              step={0.01}
              placeholder='Enter Income Amount'
              required />

          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor='description'>Description</label>
            <input
              name='description'
              ref={descriptionRef}
              type='text'
              placeholder='Enter income description'
              required />

          </div>
          <button
          className='btn btn-primary'>Add Entry</button>

          <div className='flex flex-col gap-4 mt-6'>
            <h3 className='text-2xl font-bold'>
              Income History
            </h3>
            {income && income.length > 0 ? (income.map((i) => {
              return (
                <div
                  className='flex items-center justify-between'
                  key={i.id}>
                  <div>
                    <p className='font-semibold'>{i.description}</p>
                    <small className='text-xs'>{i.createdAt.toISOString()}</small>
                  </div>
                  <p className='flex items-center gap-2'>
                    {currencyFormatter(i.amount)}
                    <button
                    onClick={() => {
                      deleteIncomeHandler(i.id)
                    }}
                    >
                      <FaRegTrashCan />
                      </button>
                  </p>
                </div>
              )
            })) : (<p>No Income history available</p>) }
          
          </div>
        </form>
      </Modal>
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
