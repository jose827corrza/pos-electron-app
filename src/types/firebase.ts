export interface UserDocument {
    // customers: Array<string>
    customers: Array<CustomerReference>
    name: string
    address: string
}

export type CustomerReference = {
    path: string;
    id: string;
}

export interface CustomerDocument {
    cellphone: string
    city: string
    documentId: string
    email: string
    mainAddress: string
    mayor: string
    name: string
    phone: string
    secondaryAddress: string
    state: string
}