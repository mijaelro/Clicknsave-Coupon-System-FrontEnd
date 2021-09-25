import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import ClientType from "../../../../models/ClientTypeModel";
import CompanyModel from "../../../../models/CompanyModel";
import {companiesDownloadedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import tokenAxios from "../../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import "./AdminCompanyCards.css";

const AdminCompanyCards=():JSX.Element=>{
  
  const[companies,setCompanies] = useState(store.getState().companiesState.companies);
  const history = useHistory();

  const fetchCompanies = async () => {
 
    if (store.getState().companiesState.companies.length === 0) {
        const response = await tokenAxios.get<CompanyModel[]>(globals.urls.admin+"companies");
        store.dispatch(companiesDownloadedAction(response.data));
    if(response.data.length!==0){
        setCompanies(response.data);
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
        fetchCompanies();
      }
    catch(err){
        notify.error(err);
      };
      const unsubscribe = store.subscribe(() => {
        setCompanies( store.getState().companiesState.companies);
      });     
    return unsubscribe;
  });

  
return(
    <div className="AdminCompanyCards AdminCards">

            {companies&&
              <div className="widthCustom">
                    <h1>Companies</h1>
                    <h3>There are {store.getState().companiesState.companies.length} companies in the system </h3>
                    <h3>you can always add new companies or customers!!</h3> <br/>
                    {store.getState().companiesState.companies.length===0&&<EmptyView msg="Loading companies!"/>}
                    <br />
                  <Button className="btn-round" color="info" onClick={() =>history.push('/admin/addCompany')}>➕</Button>
              </div>
            }
           
    
            {store.getState().companiesState.companies.length!==0&&
           
            companies.map((c) =>
            
                <div key={c.id} className="cardd">
                  <div className="boxx">
                    <div className="contentt">
                      <h2>{c.id}</h2>
                      <h3> {c.name} </h3>
                      <p>{c.email}</p> <br /><br />
                      <NavLink to={"/admin/companies/details/" + c.id}>⇥</NavLink>
                    </div>
                  </div>
                </div>
            )}
    </div>
  );
};

export default AdminCompanyCards;
