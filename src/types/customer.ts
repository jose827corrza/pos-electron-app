export interface Customer {
    cellPhone: string;
    city: string;
    documentId: string;
    email: string;
    mainAddress: string;
    secondaryAddress: string;
    mayor: string;
    name: string;
    phone: string;
    state:string;
}

export interface  CustomerV2 {
    customerInfo: Customer
    customerRef: string
}


