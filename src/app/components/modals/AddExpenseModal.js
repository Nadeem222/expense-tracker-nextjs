import React from 'react'
import { currencyFormatter } from '@/app/lib/utils';

const AddExpenseModal = () => {
  return (
      <Modal
          show={show}
          onClose={onClose}>
          <form onSubmit={addIncomeHandler} className='input-group'>
              <div className='input-group'>
                  <label htmlFor='amount'>Expense Amount</label>
                  <input
                      name='amount'
                      ref={amountRef}
                      type='number'
                      min={0.01}
                      step={0.01}
                      placeholder='Enter expense Amount'
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
                  })) : (<p>No expense history available</p>)}

              </div>
          </form>
      </Modal>
  )
}

export default AddExpenseModal