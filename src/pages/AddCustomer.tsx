import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { appContext } from "../context/context"
import { createCustomerInCsutomerCollection, addCustomerToStoreList } from "../firebase/datastore";
import { Customer } from "src/types/customer";


export const AddCustomer = () => {

    const { uid } = useContext(appContext);

    const [cellPhone, setCellPhone] = useState('')
    const [city, setCity] = useState('')
    const [documentId, setDocumentId] = useState('')
    const [email, setEmail] = useState('')
    const [mainAddress, setMainAddress] = useState('')
    const [secondaryAddress, setSecondaryAddress] = useState('')
    const [mayor, setMayor] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [state, setState] = useState('')

    const registryCustomer = async() => {
        const custData: Customer = {
            documentId,
            name,
            city,
            cellPhone,
            email,
            mainAddress,
            secondaryAddress,
            mayor,
            phone,
            state
        }
        const newCustId = await createCustomerInCsutomerCollection(custData, uid);
        await addCustomerToStoreList(uid, newCustId);
        //Set blank
        setCellPhone('');
        setCity('');
        setDocumentId('');
        setEmail('');
        setMainAddress('');
        setSecondaryAddress('');
        setMayor('');
        setName('');
        setPhone('');
        setState('');
    }

  return (
    <div className="h-full flex justify-center items-center">
        <div className="w-1/2">
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="documentId">Documento</label>
                <input 
                    type="text"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    name="documentId"
                    required={true}
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Documento"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    required={true}
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Nombre y apellido"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="city">Ciudad</label>
                <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Ciudad de residencia"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="cellphone">Celular</label>
                <input 
                    type="text"
                    value={cellPhone}
                    onChange={(e) => setCellPhone(e.target.value)}
                    name="cellphone"
                    required={true}
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Celular"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="email">Correo Electronico</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Correo electronico"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="mainaddress">Direccion Principal</label>
                <input 
                    type="text"
                    value={mainAddress}
                    onChange={(e) => setMainAddress(e.target.value)}
                    name="mainaddress"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Direccion"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="secondaryaddress">Direccion Secundaria</label>
                <input 
                    type="text"
                    value={secondaryAddress}
                    onChange={(e) => setSecondaryAddress(e.target.value)}
                    name="secondaryaddress"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Direccion secundaria"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="mayor">Mayor</label>
                <input 
                    type="text"
                    value={mayor}
                    onChange={(e) => setMayor(e.target.value)}
                    name="mayor"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Mayor"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="phone">Telefono</label>
                <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Telefono"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <label htmlFor="state">Departamento</label>
                <input 
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    name="state"
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Departamento"
                />
            </div>
            <div className="grid md:flex md:justify-between py-2">
                <button 
                    onClick={registryCustomer}
                    className="m-2 rounded-lg bg-lime-500 px-2 hover:bg-lime-400"
                    >Registrar
                </button>
                <Link to={'/home'}>Regresar a Casa</Link>
            </div>
        </div>
    </div>
  )
}
