import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import ClientType from "../../../../models/ClientTypeModel";
import CustomerModel from "../../../../models/CustomerModel";
import {customersDownloadedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import tokenAxios from "../../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import "./AdminCustomerCards.css";

const AdminCustomerCards =():JSX.Element =>{
  
  const[customers,setCustomers] = useState(store.getState().customersState.customers);
  const history = useHistory();

  const fetchCustomers = async () => {
 
    if (store.getState().customersState.customers.length === 0) {
        const response = await tokenAxios.get<CustomerModel[]>(globals.urls.admin+"customers");
        store.dispatch(customersDownloadedAction(response.data));
    if(response.data.length!==0){
        setCustomers(response.data);
        notify.success(SccMsg.DOWNLOADED_COMPANIES);
      return response.data;
    }
    else{
        notify.error(ErrMsg.NO_COMPANIES);
      return 0;
        };
      };
    };

  useEffect(() => {
    if (store.getState().authLoginState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
    try{
        fetchCustomers();
    }
    catch(err){
         notify.error(err.message);
    };
      const unsubscribe = store.subscribe(() => {
        setCustomers( store.getState().customersState.customers); 
      });     
    return unsubscribe;
  });

  
return(
    <div className="AdminCustomerCards AdminCards">
          {customers&&
            <div className="widthCustom">
                <h1>Customers</h1>
                <h3>There are {store.getState().customersState.customers.length} customers in the system </h3>
                <h3>you can always add new companies or customers!!</h3> <br />
                {store.getState().customersState.customers.length===0&&<EmptyView msg="customers on the way!"/>} <br />
              <Button className="btn-round" color="info"  onClick={() =>history.push('/admin/addCustomer')}>➕ </Button>
            </div>
          }
            
           
    
          {store.getState().customersState.customers.length!==0&&customers.map((c) =>
       
              <div key={c.id}  className="cardd">
                <div className="boxx">
                  <div className="contentt">
                      <h2>{c.id}</h2>
                      <h3> {c.firstName} </h3>
                      <p>{c.email}</p> <br /><br />
                      <NavLink to={"/admin/customers/details/" + c.id}>⇥</NavLink>
                  </div>
                </div>
              </div>
          )}
      </div>
  );
};

export default AdminCustomerCards;
