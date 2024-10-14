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
    removeIncomeItem: async () => { },
    addCategory: async () => { },
    removeExpenseItem: async () => { },
    removeExpenseCategory: async () =>{}
})

const FinanceContextProvider = ({ children }) => {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    const addCategory = async (category) => {
        try {
            const collectionRef = collection(db, 'expenses');

            const docSnap = await addDoc(collectionRef, {
                ...category,
                items: [],
            });
            setExpenses((prevExpenses) => {
                return [
                    ...prevExpenses,
                    {
                        id: docSnap.id,
                        items: [],
                        ...category
                    }
                ]
            })

        } catch (error) {
            throw error
        }
    }

    const addExpenseItem = async (expenseCategoryId, newExpense) => {
        const docRef = doc(db, "expenses", expenseCategoryId);
        try {
            await updateDoc(docRef, {
                items: [...newExpense.items],  // Update items array
                total: newExpense.total,
            })
            setExpenses(prevState => {
                const updatedExpenses = [...prevState]

                const foundIndex = updatedExpenses.findIndex((expense) => {
                    return expense.id === expenseCategoryId;
                })

                updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense }

                return updatedExpenses;
            })
        } catch (error) {
            throw error
        }
    }

    const removeExpenseItem = async (updatedExpense, expenseCategoryId) => {
        try {
            const docRef = doc(db, 'expenses', expenseCategoryId);
            await updateDoc(docRef, {
                ...updatedExpense,
            })

            setExpenses(prevExpenses => {
                const updatedExpenses = [...prevExpenses];
                const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCategoryId)
                updatedExpenses[pos].items = [...updatedExpense.items];
                updatedExpenses[pos].total = updatedExpense.total;

                return updatedExpenses
            })
        } catch (error) {
            throw error;
        }
    }

    const removeExpenseCategory = async (expenseCategoryId) =>{
        try {
            const docRef = doc(db , 'expenses' , expenseCategoryId)
            await deleteDoc(docRef)

            setExpenses(prevExpenses => {
                const updatedExpenses = prevExpenses.filter((expense) => expense.id  !== expenseCategoryId)

                return [...updatedExpenses]
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

    const values = {
        income,
        expenses,
        addIncomeItem,
        removeIncomeItem,
        addExpenseItem,
        removeExpenseItem,
        addCategory,
        removeExpenseCategory
    }

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