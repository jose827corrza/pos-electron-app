import { getDocs, collection, doc, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';

import { dbStore as db } from './firebase'
import { Customer } from './../types/customer';

export const getStoreCustomers = async(userId: string) => {
    const storeCustomers: Customer[] = []
    
    const querySnapshot = await getDocs(collection(db, "users", userId, "customers-v2"));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(`${doc.id} => ${doc.data().name}`);
        const test = doc.data() as Customer;
        storeCustomers.push(test)
    });
    return storeCustomers;
}

export const getStoreCustomersByRef = async(userId: string) => {

  const customerReferences: string[] = []

  const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().customers[1].path);
      docSnap.data().customers.forEach(customer => {
        customerReferences.push(customer.path)
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    return customerReferences;
}

export const loadStoreCustomers = async(storeCustomers: string[]) => {
  const customers: Customer[] = []

  storeCustomers.forEach(async(customerRef) => {
    const docRef = doc(db, customerRef )
    const docSnap = await getDoc(docRef);
    // const customer: Customer = {
    //   name: docSnap.data().name
    // }
    customers.push(docSnap.data() as Customer)
  });
}
export const addCustomerToStoreList = async(usrId: string, customerId: string) => {
  //@ a given customer id, inserts it into the store customers reference array
  const docRef = doc(db, 'users', usrId);
  await updateDoc(docRef, {
    customers: arrayUnion(`customers/${customerId}`)
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