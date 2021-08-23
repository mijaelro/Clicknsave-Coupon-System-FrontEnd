import CompanyModel from "../models/CompanyModel";

export class CompaniesAppState {
    public companies: CompanyModel[] = [];
};

export enum CompaniesActionType {
    CompaniesDownloaded= "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted",
    CompanyDownloaded = "CompanyDownloaded"
};

export interface CompanyAction {
    type: CompaniesActionType;
    payload?: any;
};

export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
};
export function companyDownloadedAction(id: number): CompanyAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: id };
};
export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
};
export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
};
export function companyDeletedAction(id:number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
};

export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(),action:CompanyAction): CompaniesAppState{
    
    const newState = {...currentState}; 
    
    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
            case CompaniesActionType.CompanyDownloaded:
                newState.companies = action.payload;
                break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;

        case CompaniesActionType.CompanyUpdated:

            const idx = newState.companies.findIndex(c => c.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(c=>c.id !== action.payload);
            break;
    };

    return newState;
};