import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import ClientType from "../../../../models/ClientTypeModel";
import CustomerModel from "../../../../models/CustomerModel";
import { customerDeletedAction, customerUpdatedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import tokenAxios from "../../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../../Services/Notification";
import "./AdminCustomerDetails.css";

interface RouteParam {
    id: string;
};

interface CustomerDetailsProps extends RouteComponentProps<RouteParam> { };

const AdminCustomerDetails =(props:CustomerDetailsProps): JSX.Element=>{
 
  const id = +props.match.params.id;
  const [customer,setCustomer] = useState(store.getState().customersState.customers.find((c) => c.id === id));
  const {register,handleSubmit,formState:{errors,isDirty, isValid	 }} = useForm< CustomerModel>({
    mode: "onTouched"
        });
  const history = useHistory();
  const[customers,setCustomers] = useState(store.getState().customersState.customers);
  const [disabled,setDisabled] = useState(true);
  const [firstName,setFirstName] = useState(customer?.firstName);
  const [lastName,setLastName] = useState(customer?.lastName);
  const [email,setEmail] = useState(customer?.email);
  const [password,setPassword] = useState(customer?.password);

  const updateCustomer = async (customer:CustomerModel) => {
    try {
      customer.id = id; 
      const response =await tokenAxios.put<CustomerModel>(globals.urls.admin+"customer",customer);
      store.dispatch(customerUpdatedAction( response.data));
      setCustomer( response.data);
      notify.success(SccMsg.UPDATED_SUCCESS);  
      history.push('/admin/customers'); 
    }catch (err) {
      notify.error(err.message);
    };
  };

  const fetchCustomer = async() =>{
    setCustomer(customer);  
    return customer;
  };

  useEffect(() => {
    if (store.getState().authLoginState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
    try { 
        fetchCustomer();
    }catch (err) {
        notify.error(err.message);
    };
      const unsubscribe = store.subscribe(()=>{
        setCustomers(store.getState().customersState.customers);    
    });
    return unsubscribe;
  });

  const deleteCustomer = async () => {
    const res = window.confirm(
      "Are you sure you want to delete id=" + id + "?"
    );
    if (res) {
      try {
        await tokenAxios.delete<CustomerModel>(globals.urls.admin+"company/"+id);
        store.dispatch(customerDeletedAction(id));
        notify.success(SccMsg.DELETED_SUCCESS);
        history.push('/admin/customers');
      }catch (err) {
       notify.error(err.message);
      };
    };
  };
   
  const handleFirstName = (e: { target: { value: string; }; }) =>{
      setFirstName(e.target.value);
      return firstName; 
  };
  const handleLastName = (e: { target: { value: string; }; }) =>{
      setLastName(e.target.value);
      return lastName; 
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
    <div className="AdminCustomerDetails cardD">
    {customer && (
      <>
            <h2 id="niceTitle">Details</h2>
       <form onSubmit={handleSubmit(updateCustomer)} >
          <Button  type="button" onClick={()=>setDisabled(false)} >✏️</Button> <br />
  
              <label>ID</label>
                <input className="form-control" type="number" disabled  name="id" defaultValue ={customer?.id}
                    {...register("id",{required:true})}/> <br />
                 
              <label>FirstName</label>
                <input className="form-control" type="text" disabled={disabled}  name="firstName" defaultValue ={customer?.firstName}
                    onChange={()=>handleFirstName}{...register("firstName",{
                        required:true,
                        minLength:2,
                })}/>   
                {errors.firstName?.type==='required' && <span id="errors">Missing name</span>}
                {errors.firstName?.type==='minLength' && <span id="errors">Name is too short</span>}
                <br />

              <label>LastName</label>
                <input className="form-control" type="text" disabled={disabled}  name="lastName" defaultValue ={customer?.lastName}
                    onChange={()=>handleLastName}{...register("lastName",{
                        required:true,
                        minLength:2,
                })}/>
                {errors.lastName?.type==='required' && <span id="errors">Missing name</span>}
                {errors.lastName?.type==='minLength' && <span id="errors">Name is too short</span>}
                <br />

              <label >Email</label>
                <input className="form-control" type="email" disabled={disabled} name="email" defaultValue={customer?.email} 
                    onChange={()=>handleEmail}{...register("email",{
                        required:true,
                        minLength:9,
                })}/>
                {errors.email?.type==='required' && <span id="errors">Missing email</span>}
                {errors.email?.type==='minLength' && <span id="errors">Email is too short</span>}
                <br />

              <label >Password</label>
                <input className="form-control" type="password" disabled={disabled} name="password" defaultValue={customer?.password} 
                    onChange={()=>handlePassword}{...register("password",{
                        required:true,
                        minLength:4,
                })}/>
                {errors.password?.type==='required' && <span id="errors">Missing password</span>}
                {errors.password?.type==='minLength' && <span id="errors">Password is too short</span>}
                <br />

              <Button  type="submit"  size="lg" disabled={!isDirty || !isValid}>✔️</Button>
              <Button onClick={() => deleteCustomer()}  size="lg"> 🗑️</Button>
       </form>
              <Button><NavLink to="/admin/customers"><i className="tim-icons icon-double-left"></i></NavLink></Button>

      </>
    )}
    </div>
  );
};



export default AdminCustomerDetails;



