import { useEffect, useState } from "react";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import ClientType from "../../../models/ClientTypeModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import "./CustomerCouponDetails.css";

interface RouteParam {
    id: string;
};

interface CustomerDetailsProps extends RouteComponentProps<RouteParam> { };

const  CustomerCouponDetails=(props:CustomerDetailsProps): JSX.Element =>{
    
    const id = +props.match.params.id;
    const[coupon,setCoupon] = useState(store.getState().couponsState.coupons.find((c) => c.id === id));
    const history = useHistory();

    const fetchCoupon = async () => {
        setCoupon(coupon);
        notify.success(SccMsg.COUPON_LOADED);
        return coupon; 
    };

    useEffect(() => {
        if (store.getState().authLoginState.client?.clientType!==ClientType.customer) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
          };
        try {
            fetchCoupon();
        }catch (err) {
            notify.error(err.message);
        };
    });

return (
    <div className="CustomerCouponDetails ">
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
            <Button><NavLink to="/customer/coupons"><i className="tim-icons icon-double-left"></i></NavLink></Button>
        
         </>
      )}
    </div>
  );
};

export default CustomerCouponDetails;
