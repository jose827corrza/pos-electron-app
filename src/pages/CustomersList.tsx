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
    const { customers } = useLoadCustomers(uid, loadingTime);
    useEffect(() => {
        setTimeout(() => {
            setInitialLoading(false);
        }, 2000)
    }, [])

    
    
  return (
    <>
            <h1 className="text-2xl">Lista de usuarios</h1>
        <div className="w-full flex justify-center items-center">
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <tr>
                        <th  className="border border-slate-600">Documento</th>
                        <th className="border border-slate-600">Nombre</th>
                        <th className="border border-slate-600">Celular</th>
                        <th className="border border-slate-600">Ciudad</th>
                        <th className="border border-slate-600">Direccion</th>
                        <th className="border border-slate-600">Direccion Secundaria</th>
                        <th className="border border-slate-600">Departamento</th>
                        <th className="border border-slate-600">Telefono</th>
                        <th className="border border-slate-600">Correo</th>
                        <th className="border border-slate-600">Mayor</th>
                        <th className="border border-slate-600">Editar</th>
                        <th className="border border-slate-600">Borrar</th>
                    </tr>
                </thead>
                {
                    initialLoading ?
                    <div className="w-full flex justify-center items-center">

                        <Loading />
                    </div>
                    :
                <tbody>
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
                </tbody>
                }
            </table>
        </div>
            <Link to={'/home'}> Regresar</Link>
    </>
    
  )
}



