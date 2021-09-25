import { useEffect, useState } from "react";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CouponModel from "../../../models/CouponModel";
import { couponAddedAction2 } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import "./CouponDetails.css";

interface RouteParam {
    id: string;
};

interface DetailsProps extends RouteComponentProps<RouteParam> { };

const  CouponDetails=(props:DetailsProps): JSX.Element =>{
    
    const id = +props.match.params.id;
    const[coupon,setCoupon] = useState(store.getState().couponsStartState.coupons.find((c) => c.id === id));
    const history = useHistory(); 
    const [disabled,setDisabled] = useState(true);
    
    const purchase = async(c:CouponModel) =>{
        if(store.getState().authLoginState.client?.clientType!==ClientType.customer||store.getState().authLoginState.client===null){
            history.push("/login");
            notify.error(ErrMsg.PLS_LOGIN);
        };
      
        try{
          const response = await tokenAxios.post<CouponModel>(globals.urls.customer+"purchase",c)
          store.dispatch(couponAddedAction2(response.data));
          history.push('/customer/coupons');
          notify.success(SccMsg.PURCHASED_COUPON);
        }catch(err){
          notify.error(err);
        };
      };

   

    useEffect(() => {
        if(store.getState().authLoginState.client?.clientType===ClientType.customer){
           setDisabled(false);
        };
    },[disabled]);

return (
    <div className="CouponDetails ">
			  {coupon&&
              (
            <>
                <h1 id="niceTitle">Details</h1>
                
                
                <div className="flip-card">
                  <div className="flip-card-inner">
                          <div className="flip-card-front ">
                            <img className="myImage" src={ globals.urls.company+'images/'+coupon?.id}alt={coupon.title}/>
                          </div>
                          <div className="flip-card-back">
                            <h1 id="niceTitle2">{coupon.title}</h1>
                            <h2 id="infovalue">{coupon.description}</h2> 
                            <span id="info">Category:<span id="infoval">{coupon.categoryType}</span></span> <br />
                            <span id="info">Price:<span id="infoval">{coupon.price}$</span></span> <br />
                            <span id="info">Expiration:<span id="infoval">{coupon.endDate}</span></span> <br />
                            <span id="info">Amount :<span id="infoval">{coupon.amount}</span></span> <br />
                            <span id="info">amount:<span id="infoval">{coupon.amount}</span></span> <br />
                            
                          </div>
                  </div>
                </div>
                            <br />
              <Button disabled={disabled} color="simple" onClick={()=>purchase(coupon)}>🛒</Button>
              <NavLink to="/coupons"><Button><i className="tim-icons icon-double-left"></i></Button></NavLink>
            </>
        )}
    </div>
  );
};

export default CouponDetails;
