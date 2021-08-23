import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "reactstrap";
import CouponModel from "../../../models/CouponModel";
import { couponsStartDownloadedAction } from "../../../Redux/CouponsStartState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CouponCards.css";

const CouponCards = ():JSX.Element=>{
  const [search,setSearch] = useState('');
  const[filteredCoupons,setFilteredCoupons] = useState([]);
  const[coupons,setCoupons] = useState(store.getState().couponsStartState.coupons);
  const[count,setCount] = useState(store.getState().couponsState.coupons.length);

  const fetchCoupons = async () => {
      if (store.getState().couponsStartState.coupons.length === 0) {
          const response = await axios.get<CouponModel[]>(globals.urls.coupons+"coupons");
          store.dispatch(couponsStartDownloadedAction(response.data));
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
      try{
        fetchCoupons();
      }
      catch(err){
        notify.error(err.message);
      };
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().couponsStartState.coupons.length);
    });
    return unsubscribe;
  });
        
  useEffect(() => {
    setFilteredCoupons( coupons.filter((c)=>{
    return c.title.toLowerCase().includes(search.toLowerCase())}));
  },[search,coupons]);

return(
    <div className="CouponCards">
      
      <h1 id="niceTitle"> Coupons</h1>
        {store.getState().couponsStartState.coupons.length===0&&<EmptyView msg="Loading coupons!"/>}
        <br />
        
          <div className="shortWidth">
                  <Input
                    type="text"
                    placeholder='Search...'
                    spellCheck={false}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
          </div>

          {store.getState().couponsStartState.coupons.length!==0&&
            (
            <ul>
            {filteredCoupons.map((coupon)=>
            
              <li key={coupon?.id}>
              <NavLink to={"/coupons/details/" + coupon?.id}>
                <div className="details">
                    <h2> {coupon.title}</h2>
                    <p> {coupon.price}$</p>
                    <p> {coupon.price}$</p>
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

export default CouponCards;


