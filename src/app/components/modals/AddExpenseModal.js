import React, { useRef, useContext, useState } from 'react'
import { currencyFormatter } from '@/app/lib/utils';
import Modal from '../Modal';

const AddExpenseModal = ({ show, onClose }) => {
    const [expenseAmount, setExpenseAmount] = useState("");

    return (
        <Modal
            show={show}
            onClose={onClose}>
            <div>
                <label>Enter an amount..</label>
                <input
                    type='number'
                    min={0.01}
                    step={0.01}
                    placeholder='Enter expense amount'
                    value={expenseAmount}
                    onChange={(e) => { setExpenseAmount(e.target.value) }}
                />
            </div>
        </Modal>
    )
}

export default AddExpenseModal