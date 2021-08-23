import ClientModel from "../models/ClientModel";
import CustomerSignUpModel from "../models/CustomerSignUpModel";
import CompanySignUpModel from "../models/CompanySignUpModel";

export class AuthState{
    public client: ClientModel =null;
    public constructor(){
        const storedUser = JSON.parse(localStorage.getItem('client'));
            if(storedUser) {
                this.client = storedUser;
            };
    };
};

export enum AuthActionType {
    SignUp = "SignUp",
    Login = "Login",
    Logout = "Logout"
};

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
};

export function registerAction1(company: CompanySignUpModel): AuthAction {
    return { type: AuthActionType.SignUp,payload:company };
};
export function registerAction2(customer: CustomerSignUpModel): AuthAction {
    return { type: AuthActionType.SignUp,payload:customer };
};
export function loginAction(client: ClientModel): AuthAction {
    return { type: AuthActionType.Login ,payload:client};
};
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout};
};
export function authReducer(currentState: AuthState = new AuthState(),
                            action:AuthAction): AuthState{
    const newState = {...currentState};
    switch(action.type){
        case AuthActionType.SignUp: 
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); 
            break;
        case AuthActionType.Login:
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); 
            break;
        case AuthActionType.Logout:
            newState.client = null;
            localStorage.removeItem("client");
            break;      
    };
    return newState; 
};