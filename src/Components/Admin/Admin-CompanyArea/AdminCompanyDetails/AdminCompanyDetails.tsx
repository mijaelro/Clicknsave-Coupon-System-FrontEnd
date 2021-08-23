import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import ClientType from "../../../../models/ClientTypeModel";
import CompanyModel from "../../../../models/CompanyModel";
import { companyDeletedAction, companyUpdatedAction} from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import tokenAxios from "../../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import "./AdminCompanyDetails.css";

interface RouteParam {
    id: string;
};

interface CompanyDetailsProps extends RouteComponentProps<RouteParam> { };

const AdminCompanyDetails=(props:CompanyDetailsProps): JSX.Element=>{
 
  const id = +props.match.params.id;
  const [company,setCompany] = useState(store.getState().companiesState.companies.find((c) => c.id === id));
  const {register,handleSubmit,formState:{errors ,isDirty, isValid}} = useForm<CompanyModel>({
    mode: "onTouched"
        });
  const history = useHistory();
  const[companies,setCompanies] = useState(store.getState().companiesState.companies);
  const [disabled,setDisabled] = useState(true);
  const [name,setName] = useState(company?.name);
  const [email,setEmail] = useState(company?.email);
  const [password,setPassword] = useState(company?.password);

  const updateCompany = async (company:CompanyModel) => {
    try {
      company.id = id; 
      const response =await tokenAxios.put<CompanyModel>(globals.urls.admin+"company",company);
      store.dispatch(companyUpdatedAction( response.data));
      setCompany( response.data);
      notify.success(SccMsg.UPDATED_SUCCESS);
      history.push('/admin/companies'); 
      }catch (err) {
      notify.error(err.message);
      };
  };

  const fetchCompany = async() =>{
    setCompany(company);  
    return company;
  };

  useEffect(() => {
    if (store.getState().authLoginState.client?.clientType!==ClientType.admin) {
      notify.error(ErrMsg.PLS_LOGIN);
      history.push("/login");
    };
    
    try { 
      fetchCompany();
    }catch (err) {
      notify.error(err.message);
    };
    const unsubscribe = store.subscribe(()=>{
      setCompanies(store.getState().companiesState.companies);   
    });
    return unsubscribe;
  });

  const deleteCompany = async () => {
    const res = window.confirm(
      "Are you sure you want to delete id=" + id + "?"
    );
    if (res) {
      try {
        await tokenAxios.delete<CompanyModel>(globals.urls.admin+"company/"+id);
        store.dispatch(companyDeletedAction(id));
        notify.success(SccMsg.DELETED_SUCCESS);
        history.push('/admin/companies');
      }catch (err) {
       notify.error(err.message);
      };
    };
  };
   
  const handleName = (e: { target: { value: string; }; }) =>{
      setName(e.target.value);
    return name; 
  };
  const handleEmail = (e: { target: { value: string; }; }) =>{
      setEmail(e.target.value);
      return email; 
  };
  const handlePassword = (e: { target: { value: string; }; }) =>{
      setPassword(e.target.value);
    return password; 
  };


return(
  <div className="AdminCompanyDetails cardD ">
    {company && (
      <>
          <h2 id="niceTitle">Details</h2>
       <form onSubmit={handleSubmit(updateCompany)} >
          <Button  type="button" onClick={()=>setDisabled(false)} >✏️</Button> <br />

              <label>ID</label>
                <input type="text" disabled className="form-control"  name="id" defaultValue ={company?.id}
                {...register("id",{required:true})}/>  <br />
                
              <label>Name</label> 
                <input className="form-control" type="text" disabled={disabled}  name="name" defaultValue ={company?.name}
                    onChange={()=>handleName}{...register("name",{
                      required:true,
                      minLength:2,
                })}/>
             
                {errors.name?.type==='required' && <span id="errors">Missing name</span>}
                {errors.name?.type==='minLength' && <span id="errors">Name is too short</span>}

              <br />

              <label >Email</label>
                <input className="form-control" type="email"  disabled={disabled} name="email" defaultValue={company?.email} 
                    onChange={()=>handleEmail}{...register("email",{
                      required:true,
                      minLength:9,
                })}/>
          
                {errors.email?.type==='required' && <span id="errors">Missing email</span>}
                {errors.email?.type==='minLength' && <span id="errors" >Email is too short</span>}
                
                <br />

              <label >Password</label>
                <input  className="form-control" type="password" disabled={disabled} name="password" defaultValue={company?.password} 
                    onChange={()=>handlePassword}{...register("password",{
                      required:true,
                      minLength:4,
              })}/>
         
                {errors.password?.type==='required' && <span id="errors">Missing password</span>}
                {errors.password?.type==='minLength' && <span id="errors">  Password is too short</span>}
                <br />

             <Button  type="submit"  size="lg" disabled={!isDirty || !isValid}>✔️</Button>
             <Button onClick={() => deleteCompany()}  size="lg"> 🗑️</Button>
            
        </form>
             <Button><NavLink to="/admin/companies"><i className="tim-icons icon-double-left"></i></NavLink></Button>
      </>
    )}
  </div>
 );
};

export default AdminCompanyDetails;



