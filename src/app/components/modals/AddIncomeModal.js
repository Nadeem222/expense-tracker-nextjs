import { useRef, useContext } from 'react'



import Modal from '../Modal';

// Icons
import { FaRegTrashCan } from "react-icons/fa6";




import { FinanceContext } from '@/app/lib/store/FinanceContext';
import { currencyFormatter } from '@/app/lib/utils';






const AddIncomeModal = ({show, onClose}) => {

    const amountRef = useRef()
    const descriptionRef = useRef()
    const {income, addIncomeItem,removeIncomeItem } = useContext(FinanceContext)

    // Handler Functions
    const addIncomeHandler = async (e) => {
        e.preventDefault();

        const newIncome = {
            amount: parseFloat(amountRef.current.value),
            description: descriptionRef.current.value,
            createdAt: new Date()

        };

        try {
            
            await addIncomeItem(newIncome)
    
            amountRef.current.value = ""
            descriptionRef.current.value = ""
        } catch (error) {
            console.log(error.message);
            
        }




    }
    const deleteIncomeHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
        } catch (error) {
            console.log(error.message);
            
        }

    }
    
    
    return (
        <Modal
            show={show}
            onClose={onClose}>
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
                    })) : (<p>No Income history available</p>)}

                </div>
            </form>
        </Modal>
    )
}

export default AddIncomeModal