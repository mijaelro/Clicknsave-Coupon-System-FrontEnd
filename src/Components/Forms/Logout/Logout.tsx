import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthState";
import { couponsClearedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { SccMsg } from "../../../Services/Notification";

function Logout(): JSX.Element {
  const history = useHistory();

  const logOut = async()=>{
    await tokenAxios.delete(globals.urls.client+"logout");
    store.dispatch(logoutAction());
    history.push("/home");
    notify.success(SccMsg.LOGOUT_SUCCESS);
  }

   useEffect(()=>{
      store.dispatch(couponsClearedAction());
      try{
        logOut();
      }
      catch (err) {
       notify.error(err.message);
      }
    });
    
return (
  <></>
 );
};

export default Logout;
