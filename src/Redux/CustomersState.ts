import CustomerModel from "../models/CustomerModel";

export class CustomersAppState {
    public customers: CustomerModel[] = [];
};

export enum CustomerActionType {
    CustomersDownloaded= "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted"
};

export interface CustomerAction {
    type: CustomerActionType;
    payload?: any;
};

export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomerActionType.CustomersDownloaded, payload: customers };
};
export function customerAddedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.CustomerAdded, payload: customer };
};
export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.CustomerUpdated, payload: customer };
};
export function customerDeletedAction(id:number): CustomerAction {
    return { type: CustomerActionType.CustomerDeleted, payload: id };
};

export function customersReducer(currentState: CustomersAppState = new CustomersAppState(),action:CustomerAction): CustomersAppState{
    
    const newState = {...currentState};
    
    switch (action.type) {
        case CustomerActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomerActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.CustomerUpdated:
            const idx = newState.customers.findIndex(c => c.id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        case CustomerActionType.CustomerDeleted:
            newState.customers = newState.customers.filter(c=>c.id !== action.payload);
            break;   
    };

    return newState;
};