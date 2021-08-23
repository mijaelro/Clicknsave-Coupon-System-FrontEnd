import {  useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CouponModel from "../../../models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CustomerCouponCards.css";


const CustomerCouponCards = ():JSX.Element=>{
    const[coupons,setCoupons] = useState(store.getState().couponsState.coupons);
    const[count,setCount] = useState(0);
    const history = useHistory();

    const fetchCoupons = async () => {
      if (count === 0) {
          const response = await tokenAxios.get<CouponModel[]>(globals.urls.customer+"coupons");
          store.dispatch(couponsDownloadedAction(response.data));
      if(response.data.length!==0){
          setCoupons(response.data);
          notify.success(SccMsg.DOWNLOADED_COUPONS);
        return response.data;
      }
      else{
        notify.error(ErrMsg.NO_COUPONS);
        setCount(0);
        return 0;
        };
      };
    };
    
      useEffect(() => {
        if (store.getState().authLoginState.client?.clientType!==ClientType.customer) {
          notify.error(ErrMsg.PLS_LOGIN);
          history.push("/login");
        }
        try{
          fetchCoupons()
        }catch(err){
          notify.error(err.message);
        }
       const unsubscribe = store.subscribe(() => {
          setCount(store.getState().couponsState.coupons.length);
       });
       return unsubscribe;
      });    

return(
    <div className="CustomerCouponCards CouponCards ">
        <h1 id="niceTitle">Coupons</h1>
		      <h3>you have {count} coupons.</h3>
          <span>if you wanna purchase more coupons i invite you to choose which on the following link <br/> </span>
          
          {count===0&&<EmptyView msg="Loading coupons"/>}
          <br />

          <Button color="secondary"><NavLink  to='/coupons' exact>Coupons</NavLink></Button>

           {count!==0&&( 
              <ul>
             
           {coupons.map((coupon)=>
           
                <li key={coupon?.id}>
                <NavLink to={"/customer/coupons/details/" + coupon?.id}>
                  
                    <div className="details">
                        <h2> {coupon.title}</h2>
                        <p> {coupon.price}</p>
                        <p> {coupon.price}</p>

                        <img src={ globals.urls.company+'images/'+coupon?.id}alt={coupon.title}/>
                        <img src={globals.urls.company+'images/'+coupon?.id}alt={coupon.title}/>
                        
                    </div>
                  </NavLink>
              
                </li>
          )}
            </ul>
          )}
    </div>
  );
};

export default CustomerCouponCards;
