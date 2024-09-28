'use client'

import React from 'react'
import { createContext, useState, useEffect } from 'react'
// firbase
import { db } from "../../lib/fireBase"
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore'

export const FinanceContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    addExpenseItem: async () => { },
    removeIncomeItem: async () => { }
})

const FinanceContextProvider = ({ children }) => {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    const addExpenseItem = async(expenseCategoryId , newExpense) =>{
        const docRef = doc(db , "expenses" , expenseCategoryId);
        try {
            await updateDoc(docRef ,{...newExpense})
            setExpenses(prevState=>{
                const updatedExpenses = [...prevState]

                const foundIndex = updatedExpenses.find((expense) => {
                    return expense.id === expenseCategoryId;
                }) 

                updatedExpenses[foundIndex] = {id: expenseCategoryId , ...newExpense}

                return updatedExpenses;
            })
        } catch (error) {
            throw error
        }
    }

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, "income")

        try {
            const docSnap = await addDoc(collectionRef, newIncome)

            setIncome(prevState => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome,
                    }
                ]
            })


        } catch (error) {
            console.log(error.message);
            throw error


        }
    }
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId)
        try {

            await deleteDoc(docRef)

            // update State
            setIncome((prevState) => {
                return prevState.filter((i) => i.id !== incomeId);
            })

        } catch (error) {
            console.log(error.message);
            throw error

        }
    }

    const values = { income, expenses, addIncomeItem, removeIncomeItem , addExpenseItem }
    
    useEffect(() => {
        const getIncome = async () => {
            const collectionRef = collection(db, "income");
            const docsSnap = await getDocs(collectionRef)

            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                }
            })
            setIncome(data)
        }
        const getExpenseData = async () => {
            const collectionRef = collection(db, 'expenses');
            const docSnap = await getDocs(collectionRef);
            console.log(docSnap);
            
            const data = docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setExpenses(data)
        }
        getIncome()
        getExpenseData()
    }, [])

    return <FinanceContext.Provider
        value={values}>
        {children}
    </FinanceContext.Provider>
}

export default FinanceContextProvider