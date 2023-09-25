import { CustomerRegistry } from "../components/CustomerRegistry"
import { useEffect, useContext, useState } from 'react';
import { appContext } from "../context/context";
import { useLoadCustomers } from "../hooks/useLoadCustomers";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export const CustomersList = () => {
    const { uid } = useContext(appContext);
    // const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [initialLoading, setInitialLoading] = useState(true)
    const loadingTime = 2000;
    const { customers, customersRefs } = useLoadCustomers(uid, loadingTime);
    useEffect(() => {
        setTimeout(() => {
            setInitialLoading(false);
        }, 2000)
    }, [customers, customersRefs])

  console.log(customers);
  console.log('**');
  console.log(customersRefs);
    
  return (
    <>
            <h1 className="text-2xl">Lista de usuarios</h1>
        <div className="w-full flex justify-center items-center">
            <table className="border-collapse border border-slate-800 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600 bg-gray-500">Documento</th>
                        <th className="border border-slate-600 bg-gray-500">Nombre</th>
                        <th className="border border-slate-600 bg-gray-500">Celular</th>
                        <th className="border border-slate-600 bg-gray-500">Ciudad</th>
                        <th className="border border-slate-600 bg-gray-500">Direccion</th>
                        <th className="border border-slate-600 bg-gray-500">Direccion Secundaria</th>
                        <th className="border border-slate-600 bg-gray-500">Departamento</th>
                        <th className="border border-slate-600 bg-gray-500">Telefono</th>
                        <th className="border border-slate-600 bg-gray-500">Correo</th>
                        <th className="border border-slate-600 bg-gray-500">Mayor</th>
                        <th className="border border-slate-600 bg-gray-500">Editar</th>
                        <th className="border border-slate-600 bg-gray-500">Borrar</th>
                    </tr>
                </thead>
                {
                    initialLoading ?
                    <></>
                    :
                <tbody>
                        {
                            customers.map( customer => 
                                (
                                    < CustomerRegistry
                                        key={customer.customerInfo.documentId}
                                        name={customer.customerInfo.name} 
                                        cellPhone={customer.customerInfo.cellPhone} 
                                        city={customer.customerInfo.city} 
                                        documentId={customer.customerInfo.documentId} 
                                        email={customer.customerInfo.email} 
                                        mainAddress={customer.customerInfo.mainAddress} 
                                        secondaryAddress={customer.customerInfo.secondaryAddress} 
                                        mayor={customer.customerInfo.mayor} 
                                        phone={customer.customerInfo.phone} 
                                        uid={uid} 
                                        state={customer.customerInfo.state}
                                        customerRef={customer.customerRef} /> //TODO
                                )
                            )
                        }
                </tbody>
                }
            </table>
        </div>
            {
                initialLoading ?
                <div className="w-full flex justify-center items-center">

                    <Loading />
                </div>
                :
                <></>
            }
            <Link to={'/home'}> Regresar</Link>
    </>
    
  )
}



