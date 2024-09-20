import React from 'react'
import { currencyFormatter } from '../lib/utils'


const ExpenseCategoryItem = ({ color, title, total }) => {
    // console.log("Color:" , color);

    return (
        <button>

            <div className='flex ite justify-between px-4 py-4 bg-slate-700 rounded-3xl'>
                <div className='flex items-center gap-2'>

                    <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor:  color  }} />
                    <h4 className='capitalize'>{title}</h4>
                </div>
                <p>{currencyFormatter(total)}</p>
            </div>
        </button>
    )
}

export default ExpenseCategoryItem