import { useEffect,useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CouponModel from "../../../models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CompanyCouponCards.css";


const CompanyCouponCards = () => {
  const [coupons, setCoupons] = useState([]);
  const [count,setCount]=useState(0);
  const history = useHistory();

  const fetchCoupons = async () => {
    
    if (count === 0) {
        const response = await tokenAxios.get<CouponModel[]>(globals.urls.company+"coupons");
        store.dispatch(couponsDownloadedAction(response.data));

        if(response.data.length!==0){
            setCoupons(response.data);
            notify.success(SccMsg.DOWNLOADED_COUPONS);
          return response.data; 
        } 
        else{
            notify.error(ErrMsg.NO_COUPONS);
        return 0;
        };
    };
  };
 
  
  useEffect(() => {
    if (store.getState().authLoginState.client?.clientType!==ClientType.company) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
      try{
        fetchCoupons();
        }   
      catch(err){
        notify.error(err.message);
        };
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState().couponsState.coupons.length);
        });
        return unsubscribe;
    });

return (
    <div className="CompanyCouponCards CouponCards">
          <h1 id="niceTitle">Coupons</h1>

          {store.getState().couponsState.coupons.length===0&&<EmptyView msg="Loading coupons!"/>}

          <h1>There are {store.getState().couponsState.coupons.length} coupons in your company</h1>

          <Button className="btn-round" color="info" onClick={()=>{history.push("/company/addcoupon")}}>➕</Button>
      
          {store.getState().couponsState.coupons.length!==0&&  
          (
            <ul>
              {coupons.map((coupon) =>
                    <li key={coupon?.id} >
                    <NavLink to={"/company/coupons/details/" + coupon?.id } exact>
                
                        <div className="details">
                            <h2> {coupon?.title}</h2>
                            <p> {coupon?.price}$</p>
                            <p> {coupon?.price}$</p>
                            
                            <img src={ globals.urls.company+'images/'+coupon?.id}alt={coupon?.title}/>
                            <img src={globals.urls.company+'images/'+coupon?.id}alt={coupon?.title}/>
                            
                        </div>
                    </NavLink>
                    </li> 
              )}
            </ul>
          )}
    </div>
  );
};

export default CompanyCouponCards;
