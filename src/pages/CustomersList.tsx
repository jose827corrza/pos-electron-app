import { CustomerRegistry } from "../components/CustomerRegistry"
import { useEffect, useContext, useState } from 'react';
import { appContext } from "src/context/context";
import { useLoadCustomers } from "src/hooks/useLoadCustomers";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export const CustomersList = () => {
    const { uid } = useContext(appContext);
    // const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [initialLoading, setInitialLoading] = useState(true)
    const loadingTime = 2000;
    const { customers } = useLoadCustomers(uid, loadingTime);
    useEffect(() => {
        setTimeout(() => {
            setInitialLoading(false);
        }, 2000)
    }, [])

    
    
  return (
    <>
    {
        initialLoading ?
        <Loading />
        :
        <div>
            <h2>Lista de usuarios</h2>
            <ul>
                {
                    customers.map( customer => 
                            (
                                < CustomerRegistry
                                    key={customer.documentId}
                                    name={customer.name} 
                                    cellPhone={customer.cellPhone} 
                                    city={customer.city} 
                                    documentId={customer.documentId} 
                                    email={customer.email} 
                                    mainAddress={customer.mainAddress} 
                                    secondaryAddress={customer.secondaryAddress} 
                                    mayor={customer.mayor} 
                                    phone={customer.phone} 
                                    uid={uid} 
                                    state={customer.state} />
                            )
                        )
                }
            </ul>
            <Link to={'/home'}> Regresar</Link>
        </div>
    }
    </>
    
  )
}



