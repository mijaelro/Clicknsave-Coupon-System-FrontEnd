import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CardTitle } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CompanyModel from "../../../models/CompanyModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify from "../../../Services/Notification";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const [company,setCompany] = useState<CompanyModel>()
    const [coupons,setCoupons] = useState(store.getState().couponsState.coupons);
    const history = useHistory();

    const fetchDets = async ()=>{
        try{
        const response = await tokenAxios.get<CompanyModel>(globals.urls.company+"details");
        setCompany(response.data);
        }catch(err){
            notify.error(err);
        }
    }

    useEffect(() => {
        if(store.getState().authLoginState.client.clientType!==ClientType.company){
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
        <div className="CompanyDetails">
            <CardTitle >
                    <h1 id="niceTitle">Details</h1>
                    <h2><span className="attr">Id:</span>{company?.id}</h2> 
                    <h2><span className="attr"> User:</span> {company?.name} </h2>
                    <h2><span className="attr">Email:</span>  {company?.email}</h2>
                    <h2><span className="attr"> Password:</span> {company?.password}</h2>
                    <h2><span  className="attr">Coupons:</span> {coupons.length}</h2>

                </CardTitle>
        </div>
    );
}

export default CompanyDetails;
