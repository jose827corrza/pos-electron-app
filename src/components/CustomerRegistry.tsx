import { HiOutlineTrash } from 'react-icons/hi';
import { deleteCustomerFromCustomerCollection, removeCustomerRefFromStoreCustomersArray } from 'src/firebase/datastore';

import { Customer } from "src/types/customer"

interface Props {
  name: string, 
  documentId: string, 
  mainAddress: string, 
  cellPhone: string, 
  email: string, 
  secondaryAddress: string, 
  state: string, 
  city: string, 
  mayor: string, 
  phone: string,
  uid: string

}
export const CustomerRegistry = ({name, documentId, mainAddress, cellPhone, email, secondaryAddress, state, city, mayor, phone, uid}: Props) => {

  const deleteAction = async() => {
    console.log(`Borrando customer ${documentId}`);
    
    const test = await deleteCustomerFromCustomerCollection(documentId);
    await removeCustomerRefFromStoreCustomersArray(uid, test)
  }

  return (
    <li className="flex px-3" key={documentId}>
        <p className="font-bold">{documentId}</p>
        <p>{name}</p>
        <p>{mainAddress}</p>
        <p>{cellPhone}</p>
        <p>{secondaryAddress}</p>
        <p>{state}</p>
        <p>{email}</p>
        <p>{city}</p>
        <p>{mayor}</p>
        <p>{phone}</p>
        <button onClick={deleteAction}>
          < HiOutlineTrash />
        </button>
    </li>
  )
}
