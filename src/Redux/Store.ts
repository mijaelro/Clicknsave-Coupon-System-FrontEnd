import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companiesReducer } from "./CompaniesState";
import { couponsStartReducer } from "./CouponsStartState";
import { couponsReducer } from "./CouponsState";
import { customersReducer } from "./CustomersState";


const reducers = combineReducers({ couponsState: couponsReducer,
    customersState:customersReducer,
    companiesState:companiesReducer,
    authLoginState:authReducer,
    couponsStartState:couponsStartReducer,
 });
const store = createStore(reducers);


export default store;