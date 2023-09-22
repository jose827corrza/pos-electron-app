import React, { useEffect, useState } from 'react'
import { getStoreCustomersByRef, loadStoreCustomers } from '../firebase/datastore';
import { Customer } from 'src/types/customer';

export const useLoadCustomers = (uid: string, loadingTime: number, ...args: any) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading){
            (async() => {
                const customerRefs = await getStoreCustomersByRef(uid);
                const test = await loadStoreCustomers(customerRefs);
                setCustomers(test);
            })()
            setTimeout(() => {
                setIsLoading(false)
            }, loadingTime)
        }
    },[...args])
  return {
    customers,
    isLoading,
    setIsLoading,
  }
}
