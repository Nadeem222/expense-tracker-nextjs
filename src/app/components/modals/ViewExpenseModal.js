import React, {useContext} from 'react'
import Modal from '../Modal'
import { currencyFormatter } from '@/app/lib/utils'
import { FaRegTrashAlt } from "react-icons/fa";
import { FinanceContext } from '@/app/lib/store/FinanceContext';


const ViewExpenseModal = ({ show, onClose, expense }) => {
  // console.log(expense);

  const { removeExpenseItem } = useContext(FinanceContext)
 const deleteExpenseItemHandler = async (item) =>{
  try {
    const updatedItems = expense.items.filter((i) = i.id !== item.id)
     
    const updatedExpense = {
      items: [...updatedItems],
      total : expense.total - item.amount,
    };

    await removeExpenseItem(updatedExpense , expense.id)
  } catch (error) {
    console.log(error.message);
    
  }
 }
  return (
    <>
      <Modal
        show={show}
        onClose={onClose}>
        <div className="flex items-center justify-between" >
          <h2 className='text-4xl'>{expense.title}</h2>
          <button className="btn btn-danger">Delete</button>
        </div>
        <div>
          <h3 className='my-4 text-2xl'>Expense History</h3>
          {expense.items.map((item) => {


            // Date formater

            const createdAt = item.createdAt
            const formattedDate = createdAt?.toMillis
              ? new Date(createdAt.toMillis()).toISOString()
              : createdAt instanceof Date
                ? createdAt.toISOString() // JavaScript Date object
                : new Date(createdAt).toISOString();


            return <div key={item.id} className='flex items-center justify-between'>
              <small>{formattedDate}</small>
              <p className='flex items-center gap-2'>{currencyFormatter(item.amount)}
                <button onClick={() =>{
                  deleteExpenseItemHandler(item)
                }}>
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          })}
        </div>
      </Modal>
    </>
  )
}

export default ViewExpenseModal