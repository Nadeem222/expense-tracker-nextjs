import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";

import { authContext } from '../lib/store/auth-context';

const Signin = () => {

    const {googleLoginHandler} = useContext(authContext)
    return (
        <main className='container max-w-2xl px-6 mx-auto'>
            <h1 className='mb-6 text-6xl font-bold text-center'>Welcome 👋 </h1>

            <div className='flex flex-col text-center overflow-hidden shadow-md shadow-slate-500'>
                <div className='h-52'>
                    <img
                        className='object-cover w-full h-full'
                        src=''
                    />
                </div>
                <div className='px-4 py-4'>
                    <h3 className='text-2xl text-center'>Please sign in to continue</h3>
                    <button onClick={googleLoginHandler} className='flex gap-2 self-start p-2 mx-auto font-medium text-white align-middle bg-gray-600 rounded-lg'>
                        <FcGoogle className='text-2xl' />
                        Google
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Signin