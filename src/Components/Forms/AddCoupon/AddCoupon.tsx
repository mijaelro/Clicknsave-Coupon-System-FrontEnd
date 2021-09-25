import {  useForm } from 'react-hook-form';
import "./AddCoupon.css";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import tokenAxios from "../../../Services/InterceptorAxios";
import globals from "../../../Services/Globals";
import { couponAddedAction } from "../../../Redux/CouponsState";
import CategoryType from "../../../models/CategoryTypeModel";
import ClientType from "../../../models/ClientTypeModel";
import CouponPayLoadModel from "../../../models/CouponPayLoadModel";
import { Button, Input } from "reactstrap";

function AddCoupon(): JSX.Element {
    
    const {register,handleSubmit,formState:{errors,isDirty, isValid}} = useForm<CouponPayLoadModel>({ mode: "onTouched" });
    const [client,setClient] = useState(store.getState().authLoginState.client);
    const [count,setCount] = useState(store.getState().couponsState.coupons.length);
    const [coupon,setCoupon] = useState(null);
    const history = useHistory();
   
    useEffect(()=>{
        if(store.getState().authLoginState.client?.clientType!==ClientType.company){
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
            const unsubscribe = store.subscribe(() => {
                setCount(store.getState().couponsState.coupons.length);
            });
          return unsubscribe;
    });
    
    async function send(coupon:CouponPayLoadModel) {
        try{
            const formData = new FormData();
            formData.append("companyId",coupon.companyId.toString());
            formData.append("title",coupon.title);
            formData.append("amount",coupon.amount.toString());
            formData.append("categoryType",coupon.categoryType);
            formData.append("description",coupon.description);
            formData.append("startDate",coupon.startDate.toString());
            formData.append("endDate",coupon.endDate.toString());
            formData.append("price",coupon.price.toString());
            formData.append("image",coupon.image.item(0));
            const response = await tokenAxios.post<CouponPayLoadModel>(globals.urls.company+"coupon",formData);
            const added = response.data;
            store.dispatch(couponAddedAction(added));
            setCoupon(response.data);
            notify.success(SccMsg.ADDED_COUPON);
            history.push('/company/coupons');
        }
        catch (err) {
           notify.error(err.message)
        };
    };

return (
    <div className="AddCoupon cardD">
		<h1 id="niceTitle">Add Coupon</h1>
        <form onSubmit={handleSubmit(send)} >
                    
                <label>CompanyId</label> 
                    <input className="form-control" type="number" name="companyId" 
                    defaultValue={client.clientId}
                        {...register("companyId")}/>
                        <br />
                <label>Amount</label> 
                    <input className="form-control" type="number" name="amount" step="1"
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
                <Input   id="exampleSelect1" type="select" defaultValue={CategoryType.food} className="form-control" {...register("categoryType",{
                        required:{
                        value:true,
                        message:'you must choose a category'
                        }
                })}>
                        <option defaultValue=""  disabled hidden>Choose here</option>
                        <option  id="dark1" value={CategoryType.food}>FOOD</option>
                        <option  id="dark1" value={CategoryType.electronics}>ELECTRONICS</option>
                        <option  id="dark1" value={CategoryType.restaurant}>RESTAURANT</option>
                        <option  id="dark1" value={CategoryType.vacation}>VACATION</option>
                        <option  id="dark1" value={CategoryType.lifeStyle}>LIFE STYLE</option>
                </Input>
                <br />
                <span id="errors">{errors.categoryType?.message}</span>
                
                <br />
                <label >Description</label>
                <input className="form-control" type="text" name="description" 
                    {...register("description",{
                        required:true,
                        minLength:10,
                    })}/>
                <br />
                {errors.description?.type==='required' && <span id="errors">Missing description</span>}
                {errors.description?.type==='minLength' && <span id="errors">Description is too short</span>}
                <br />

                <label>Start-Date</label>
                <input className="form-control" type="date" name="startDate"{...register("startDate",{
                        required:{
                        value:true,
                        message:'you must choose a starting date'
                        }
                })}/>
                <br />
                <span id="errors">{errors.startDate?.message}</span>
                <br />
                <label className="label-control">End-Date</label>
                <input type="date" className="form-control datepicker" name="endDate" {...register("endDate",{
                        required:{
                        value:true,
                        message:'you must choose an expiration date'
                        }
                })}/>
                <br />
                <span id="errors">{errors.endDate?.message}</span>
                <br />

                <label>Price</label>
                <input className="form-control" type="number" name="price" step="0.01" 
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
                <span id="errors">{errors.price?.message}</span>
                <br/>

                <label>Title</label>
                <input className="form-control" type="text" name="title" 
                    {...register("title",{
                        required:true,
                        minLength:2,
                    })}/>
                     <br />
                {errors.title?.type==='required' && <span id="errors">Missing title</span>}
                {errors.title?.type==='minLength' && <span id="errors">Title is too short</span>}

                <br />
                
                <label>Image</label>
                <input className="form-control" type="file" name="image" accept="image/*"  {...register("image",
                {required: true}
                )} 
                />
                <br/>
                 {errors.image && <span id="errors">Missing image</span>}
                <br />

                <br />
               <NavLink to="/company/coupons"> <Button color="danger">✖️</Button></NavLink>
                <Button color="success" variant="contained" type="submit" disabled={!isDirty || !isValid}> ✔️</Button>

        </form>
    </div>
  );
};

export default AddCoupon;
