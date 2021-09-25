import {  useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import ClientType from "../../../models/ClientTypeModel";
import CouponModel from "../../../models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerCategoryFilter from "../CustomerCategoryFilter/CustomerCategoryFilter";
import CustomerMaxPriceFilter from "../CustomerMaxPriceFilter/CustomerMaxPriceFilter";
import "./CustomerCouponCards.css";


const CustomerCouponCards = ():JSX.Element=>{
    const[coupons,setCoupons] = useState(store.getState().couponsState.coupons);
    const[count,setCount] = useState(0);
    const [search,setSearch] = useState('');
    const[filteredCoupons,setFilteredCoupons] = useState([]);
    const [filteredCategory,setFilteredCategory] = useState('ALL');
    const [filteredPrice,setFilteredPrice] = useState(500);
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
    
    const saveFilterValue = (selectedCategory:any)=>{setFilteredCategory(selectedCategory)};
    const saveFilterValue2 = (selectedPrice:number)=>{setFilteredPrice(selectedPrice)};
  
  
    useEffect(() => {
      setFilteredCoupons( coupons.filter((c)=>{
      return c.title.toLowerCase().includes(search.toLowerCase())}));
    },[search,coupons]);
  
    
    useEffect(() => {
      setFilteredCoupons( coupons.filter((c)=>{
        if(filteredCategory.toString()==="ALL"){
          return filteredCoupons;
        }else {
          return c?.categoryType?.toString()===filteredCategory;
        }
      }));
    },[filteredCategory,coupons]);
    
  
    useEffect(() => {
      setFilteredCoupons( coupons.filter((c)=>{
        if(filteredPrice.toString()==="ALL"){
          return filteredCoupons;
        }else {
          return (c?.price<=filteredPrice);
        }
      }));
    },[filteredPrice,coupons]);

      useEffect(() => {
        if (store.getState().authLoginState.client?.clientType!==ClientType.customer) {
          notify.error(ErrMsg.PLS_LOGIN);
          history.push("/login");
        }
        try{
          fetchCoupons()
        }catch(err){
          notify.error(err);
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
          
          <br />

         <NavLink  to='/coupons' exact> <Button color="secondary">Coupons</Button></NavLink>


           {count!==0&&( 

              <>
 <br />
  
  <div className="flexFilter">
    <div className="filterItem1">
       <CustomerMaxPriceFilter onSaveFilterValue={saveFilterValue2} selected={filteredPrice}/>
    </div>
    <div className="filterItem1">
       <CustomerCategoryFilter onSaveFilterValue={saveFilterValue} selected={filteredCategory}/>
    </div>
  </div>
  
  <br />

  <div className="shortWidth">
          <Input
            type="text"
            placeholder='Search...'
            spellCheck={false}
            onChange={(e)=>setSearch(e.target.value)}
          />
  </div>

              <ul>
             
           {filteredCoupons.map((coupon)=>
           
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
            </>
          )}

{filteredCoupons.length===null||filteredCoupons.length===0&&<EmptyView msg={"no filtered coupons found... "}/>}

    </div>
  );
};

export default CustomerCouponCards;
