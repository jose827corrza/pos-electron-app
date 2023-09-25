import { useEffect, useState } from 'react'
import { getStoreCustomersByRef, loadStoreCustomers } from '../firebase/datastore';
import { CustomerV2 } from '../types/customer';

export const useLoadCustomers = (uid: string, loadingTime: number, ...args: any) => {

    const [customers, setCustomers] = useState<CustomerV2[]>([]);
    const [customersRefs, setCustomersRefs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading){
            (async() => {
                const customerR = await getStoreCustomersByRef(uid);
                const test = await loadStoreCustomers(customerR);
                setCustomers(test);
                setCustomersRefs(customerR);
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
    customersRefs,
  }
}
