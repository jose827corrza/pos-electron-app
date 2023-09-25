import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';
import { deleteCustomerFromCustomerCollection, removeCustomerRefFromStoreCustomersArray } from '../firebase/datastore';


import { Link } from 'react-router-dom';

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
  customerRef: string
}
export const CustomerRegistry = ({name, documentId, mainAddress, cellPhone, email, secondaryAddress, state, city, mayor, phone, uid, customerRef}: Props) => {

  const deleteAction = async() => {
    console.log(`Borrando customer ${customerRef}`);
    
    await deleteCustomerFromCustomerCollection(customerRef);
    await removeCustomerRefFromStoreCustomersArray(uid, customerRef)
  }

  return (
    <tr>
      <td className="font-bold border border-slate-700">{documentId}</td>
      <td className='border border-slate-700'>{name}</td>
      <td className='border border-slate-700'>{cellPhone}</td>
      <td className='border border-slate-700'>{city}</td>
      <td className='border border-slate-700'>{mainAddress}</td>
      <td className='border border-slate-700'>{secondaryAddress}</td>
      <td className='border border-slate-700'>{state}</td>
      <td className='border border-slate-700'>{phone}</td>
      <td className='border border-slate-700'>{email}</td>
      <td className='border border-slate-700'>{mayor}</td>
      <td className='border border-slate-700'>
        <Link to={`/edit-customer/${customerRef}`}>
          < HiPencilAlt />
        </Link>
      </td>
      <td className='border border-slate-700'>
        <Link onClick={deleteAction} to={'/get-customers'}>
          < HiOutlineTrash />
        </Link>
      </td>
    </tr>
  )
}
