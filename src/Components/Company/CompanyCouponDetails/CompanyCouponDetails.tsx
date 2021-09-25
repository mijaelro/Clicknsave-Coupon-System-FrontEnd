import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Input from "reactstrap/lib/Input";
import CategoryType from "../../../models/CategoryTypeModel";
import ClientType from "../../../models/ClientTypeModel";
import CouponModel from "../../../models/CouponModel";
import CouponPayLoadModel from "../../../models/CouponPayLoadModel";
import { couponsDeletedAction, couponUpdatedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import "./CompanyCouponDetails.css";

interface RouteParam {
  id: string;
};
interface CouponDetailsProps extends RouteComponentProps<RouteParam> { };

const CompanyCouponDetails = (props: CouponDetailsProps) => {

  const id = +props.match.params.id;
  const {register,handleSubmit,formState:{errors}} = useForm< CouponPayLoadModel>({
    mode: "onTouched"
        });
  const [coupon, setCoupon] = useState(store.getState().couponsState.coupons.find((c) => c.id === id));
  const[coupons,setCoupons] = useState(store.getState().couponsState.coupons);
  const[client,setClient] = useState(store.getState().authLoginState.client);
  const history = useHistory();
  const [disabled,setDisabled] = useState(true);
  const[amount,setAmount] = useState(coupon?.amount);
  const[category,setCategory] = useState(coupon?.categoryType);
  const[description,setDescription] = useState(coupon?.description);
  const[startDate,setStartDate] = useState(coupon?.startDate);
  const[endDate,setEndDate] = useState(coupon?.endDate);
  const[price,setPrice] = useState(coupon?.price);
  const[title,setTitle] = useState(coupon?.title);
 
  const fetchCoupon = async () => {
    setCoupon(coupon);
    return coupon;
  };

  const updateCoupon = async (coupon: CouponModel) => {
    try {
        coupon.id = id;
        coupon.companyId = client?.clientId
        const response = await tokenAxios.put<CouponModel>(globals.urls.company+"coupon",coupon);
        store.dispatch(couponUpdatedAction(response.data));
        setCoupon(response.data);
        notify.success(SccMsg.UPDATED_SUCCESS);
        history.push("/company/coupons");
    } catch (err) {
      notify.error(err.message);
    };
  };

  const deleteCoupon = async () => {
    const res = window.confirm(
      "Are you sure you want to delete id=" + id + "?"
    );
    if (res) {
      try {
        await tokenAxios.delete<CouponModel>(globals.urls.company+"coupon/"+id);
        store.dispatch(couponsDeletedAction(id));
        notify.success(SccMsg.DELETED_SUCCESS);
        history.push('/company/coupons');
      } catch (err) {
       notify.error(err.message);
      };
    };
  };

  useEffect(() => {
    if (store.getState().authLoginState.client?.clientType!==ClientType.company) {
      notify.error(ErrMsg.PLS_LOGIN);
      history.push("/login");
    };
    try { 
      fetchCoupon();
    }catch (err) {
      notify.error(err);
    };
    const unsubscribe = store.subscribe(()=>{
      setCoupons(store.getState().couponsState.coupons);
    });
    return unsubscribe;
  });
  

  const handleDescription =  (e: { target: { value: string; }; }) =>{
    setDescription(e.target.value);
    return description; 
  };
  const handleAmount =  (e: { target: { value: number; }; }) =>{
    setAmount(e.target.value);
    return amount; 
  };
  const handleCategory =  (e: { target: { value: CategoryType; }; }) =>{
    setCategory(e.target.value);
    return category; 
  };
  const handleEndDate=  (e: { target: { value: string; }; }) =>{
    setEndDate(e.target.value);
    return endDate; 
  };
  const handleStartDate =  (e: { target: { value: string; }; }) =>{
    setStartDate(e.target.value);
    return startDate; 
  };
  const handlePrice =  (e: { target: { value: number; }; }) =>{
    setPrice(e.target.value);
    return price; 
  };
  const handleTitle =  (e: { target: { value: string; }; }) =>{
    setTitle(e.target.value);
    return title; 
  };

return (
    <div className="CompanyCouponDetails cardD">
     
      {coupon && (
        <>
              <h1 id="niceTitle">Details</h1>
         <form onSubmit={handleSubmit(updateCoupon)}>
         <Button  type="button" onClick={()=>setDisabled(false)} >✏️</Button>
         <br /><br />

              <label>ID</label>
                <input className="form-control" type="number" disabled  name="id" defaultValue ={coupon?.id}
                    {...register("id",{required:true})}/> <br /> 

                {<img src={ globals.urls.company+'images/'+coupon?.id}alt={coupon.title}/>}
                <br/>
                <br />

                <label>CompanyId</label> 
                    <input className="form-control" disabled type="number" name="companyId" 
                    value={client?.clientId}
                        {...register("companyId")}/>
                        <br />

                <label>Amount</label> 
                    <input className="form-control" disabled={disabled}   onChange={()=>handleAmount}
                      type="number" name="amount" step="1" defaultValue={coupon?.amount}
                        {...register("amount",{
                            required: {
                            value:true,
                            message:'Missing Amount'
                        },
                            min:{
                            value:0,
                            message:'Amount must be greater than zero'
                        }
                    })}/>
                <br />
                <span id="errors">{errors.amount?.message}</span>
                <br />

                <label>Category</label>
                <Input type="select" className="form-control" onChange={()=>handleCategory}
                 disabled={disabled} defaultValue={coupon?.categoryType}{...register("categoryType",{
                        required:{
                        value:false,
                        message:'you must choose a category'
                        }
                })}>
                        <option defaultValue=""  hidden>Choose here</option>
                        <option id="dark1" value={CategoryType.food}>FOOD</option>
                        <option id="dark1" value={CategoryType.electronics}>ELECTRONICS</option>
                        <option id="dark1" value={CategoryType.restaurant}>RESTAURANT</option>
                        <option id="dark1" value={CategoryType.vacation}>VACATION</option>
                        <option id="dark1" value={CategoryType.lifeStyle}>LIFE STYLE</option>
                </Input>
                <br />
                <span id="errors">{errors.categoryType?.message}</span>
                
                <br />
                <label >Description</label>
                <input className="form-control" onChange={()=>handleDescription} type="text" name="description"
                 disabled={disabled} defaultValue={coupon?.description}
                    {...register("description",{
                        required:true,
                        minLength:10,
                    })}/>
                <br />
                {errors.description?.type==='required' && <span  id="errors">Missing description</span>}
                {errors.description?.type==='minLength' && <span  id="errors">Description is too short</span>}
                <br />

                <label>Start-Date</label>
                <input className="form-control" onChange={()=>handleStartDate} type="date" name="startDate"
                 disabled={disabled} defaultValue={coupon?.startDate}{...register("startDate",{
                        required:{
                        value:true,
                        message:'you must choose a starting date'
                        }
                })}/>
                <br />
                <span  id="errors">{errors.startDate?.message}</span>
                <br />
                
                <label>End-Date</label>
                <input className="form-control" onChange={()=>handleEndDate} type="date"
                  disabled={disabled} name="endDate"  defaultValue={coupon?.endDate} {...register("endDate",{
                        required:{
                        value:true,
                        message:'you must choose an expiration date'
                        }
                })}/>
                <br />
                <span  id="errors">{errors.endDate?.message}</span>
                <br />

                <label>Price</label>
                <input className="form-control" onChange={()=>handlePrice} type="number" name="price" step="0.1"
                 disabled={disabled}  defaultValue={coupon?.price}
                {...register("price",
                    {
                        required: {
                            value:true,
                            message:'Missing price'},
                        min:{
                            value:0,
                            message:'Price must be greater than zero'}
                    }
                )}/>
                <br />
                <span  id="errors">{errors.price?.message}</span>
                <br/>

                <label>Title</label>
                <input className="form-control" onChange={()=>handleTitle} type="text" name="title"
                 disabled={disabled}  defaultValue={coupon?.title}
                    {...register("title",{
                        required:true,
                        minLength:2,
                    })}/>
                     <br />
                {errors.title?.type==='required' && <span  id="errors">Missing title</span>}
                {errors.title?.type==='minLength' && <span  id="errors">Title is too short</span>}

                <br /><br />
               
                <Button  type="submit"  size="lg" disabled={disabled}>✔️</Button>
                <Button onClick={() => deleteCoupon()}  size="lg"> 🗑️</Button>
            
               
            </form>
            <NavLink to="/company/coupons"><Button><i className="tim-icons icon-double-left"></i></Button></NavLink>

        </>
      )}
    </div>
  );
};

export default CompanyCouponDetails;


