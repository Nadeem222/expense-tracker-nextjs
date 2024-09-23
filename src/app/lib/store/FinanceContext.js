'use client'

import React from 'react'
import {createContext , useState , useEffect} from 'react'
// firbase
import { db } from "../../lib/fireBase"
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore'

export const FinanceContext = createContext({
    income: [],
    addIncomeItem : async() => {},
    removeIncomeItem : async () => {}
})

const FinanceContextProvider = ({children}) =>{
    const [income , setIncome] = useState()

    const addIncomeItem =async (newIncome) => {
        const collectionRef = collection(bd , "income")

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
    const removeIncomeItem =async (incomeId) => {
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

    const values = {income , addIncomeItem , removeIncomeItem}
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
        getIncome()
    }, [])

    return <FinanceContext.Provider 
    value={values}>
        {children}
    </FinanceContext.Provider>
}

export default FinanceContextProvider