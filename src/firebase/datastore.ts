import { getDocs, collection, doc, getDoc, setDoc, addDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, DocumentReference, query, where } from 'firebase/firestore';

import { dbStore as db } from './firebase'
import { Customer, CustomerV2 } from './../types/customer';
import { UserDocument } from '../types/firebase';



export const getStoreCustomersByRef = async(userId: string) => {
  console.log(userId);
  
  const customerReferences: string[] = []

  const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const customer = docSnap.data() as UserDocument;
      customer.customers.forEach(customer => {
        // console.log(customer);
        
        customerReferences.push(customer.id)
      })
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    // console.log(customerReferences);
    
    return customerReferences;
}

export const loadStoreCustomers = async(storeCustomers: string[]) => {
  // const customers: Customer[] = []
  const customers: CustomerV2[] = []

  storeCustomers.forEach(async(customerRef) => {
    const docRef = doc(db, 'customers', customerRef )
    const docSnap = await getDoc(docRef);
    
    
    const customerV2: CustomerV2 = {
      customerInfo: docSnap.data() as Customer,
      customerRef
    }
    customers.push(customerV2)
    
    
  });
  console.log(customers);
  return customers;
}
export const addCustomerToStoreList = async(usrId: string, customerId: string) => {
  //@ a given customer id, inserts it into the store customers reference array
  const docRefUser = doc(db, 'users', usrId);
  const docRefToInsert = doc(db, 'customers', customerId)
  await updateDoc(docRefUser, {
    // customers: arrayUnion(`customers/${customerId}`)
    customers: arrayUnion(docRefToInsert)
  })
};

export const createCustomerInCsutomerCollection = async(customerData: Customer, userId: string) => {
  /**
   * @returns id assignated to the new customer, to be added into the store customers array
   */
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    //Crearlo
    const userRef = doc(db, 'users', userId);
    setDoc(userRef, {})
  }
  const docNewCustomerRef = await addDoc(collection(db, 'customers'), customerData);
  return docNewCustomerRef.id;
}

export const addCustomerToStore = async(
  usrId: string,
  documentId: string, 
  name: string, 
  city: string, 
  cellPhone:string, 
  email: string, 
  mainAddress: string, 
  secondaryAddress: string, 
  mayor: string, 
  phone: string, 
  state: string) => {

  const custData: Customer= {
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

  // await setDoc(doc(db, 'users', usrId, 'customers'), custData);
  await addDoc(collection(db, 'users', usrId, 'customers-v2'), custData)

}

export const deleteCustomerFromCustomerCollection = async(customerId: string) => {
  const customerRef = doc(db, customerId)
  await deleteDoc(customerRef);
  return customerId;
}

export const removeCustomerRefFromStoreCustomersArray = async(userId: string, customerReference: string) => {
  const customerRef = doc(db, 'users', userId);

  await updateDoc(customerRef, {
    customers: arrayRemove(customerReference)
  })
}

export const getCustomerInformation = async(userId: string, customerId: string) => {
  let  customer: Customer = {
    cellPhone: '',
    city: '',
    documentId: '',
    email: '',
    mainAddress: '',
    secondaryAddress: '',
    mayor: '',
    name: '',
    phone: '',
    state: ''
  }
  const q = query(collection(db, 'customers'), where('documentId', '==', customerId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    customer = doc.data() as Customer;
  })
  return customer;
}