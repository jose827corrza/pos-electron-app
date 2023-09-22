import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';
import { deleteCustomerFromCustomerCollection, removeCustomerRefFromStoreCustomersArray } from '../firebase/datastore';

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
    <tr>
      <td className="font-bold">{documentId}</td>
      <td >{name}</td>
      <td >{cellPhone}</td>
      <td >{city}</td>
      <td >{mainAddress}</td>
      <td >{secondaryAddress}</td>
      <td >{state}</td>
      <td >{phone}</td>
      <td >{email}</td>
      <td >{mayor}</td>
      <td >
        <button onClick={deleteAction}>
          < HiPencilAlt />
        </button>
      </td>
      <td >
        <button onClick={deleteAction}>
          < HiOutlineTrash />
        </button>
      </td>
    </tr>
  )
}
