import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {  CardTitle } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CustomerModel from "../../../models/CustomerModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify from "../../../Services/Notification";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const [customer,setCustomer] = useState<CustomerModel>();
    const [coupons,setCoupons] = useState(store.getState().couponsState.coupons);
    const history = useHistory();

    const fetchDets = async ()=>{
        try{
        const response = await tokenAxios.get<CustomerModel>(globals.urls.customer+"details");
        setCustomer(response.data);
        }catch(err){
            notify.error(err);
        }
    }

    useEffect(() => {
        if(store.getState().authLoginState.client.clientType!==ClientType.customer){
            notify.error("NOT ALLOWED");   
            history.push("/login");
        }
        fetchDets();
        const unsubscribe = store.subscribe(() => {
            setCoupons(store.getState().couponsState.coupons);
        });
        return unsubscribe;
    })

    return (

        <div className="CustomerDetails">
                <CardTitle >
                    <h1 id="niceTitle">Details</h1>
                    <h2><span className="attr">Id:</span>{customer?.id}</h2> 
                    <h2><span className="attr"> User:</span> {customer?.firstName} {" "} {customer?.lastName} <br /></h2>
                    <h2><span className="attr">Email:</span>  {customer?.email}</h2>
                    <h2><span className="attr"> Password:</span> {customer?.password}</h2>
                    <h2><span  className="attr">Coupons:</span> {coupons.length}</h2>

                </CardTitle>
        </div>
    );
}

export default CustomerDetails;
