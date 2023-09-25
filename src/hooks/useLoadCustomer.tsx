import { useEffect, useState } from 'react'
import { getCustomerInformation } from '../firebase/datastore';
import { Customer } from 'src/types/customer';

export const useLoadCustomer = (uid: string, customerId: string | undefined, loadingTime: number, ...args: any) => {

    const [customer, setCustomer] = useState<Customer>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading){
            (async() => {
                if(customerId == undefined){
                    return undefined
                }
                const customerInfo = await getCustomerInformation(uid, customerId);
                setCustomer(customerInfo);
            })()
            setTimeout(() => {
                setIsLoading(false)
            }, loadingTime)
        }
    },[...args])
  return {
    customer,
    isLoading,
    setIsLoading,
  }
}
