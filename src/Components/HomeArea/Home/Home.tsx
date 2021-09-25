
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import store from "../../../Redux/Store";
import "./Home.css";

function Home(): JSX.Element {

    const [client,setClient]=useState(store.getState().authLoginState.client);
    const [count, setCount] =useState(null);

    useEffect(() =>{   
        const unsubscribe = store.subscribe(() => {
          setCount(store.getState().couponsStartState.coupons);
         
        });
        return unsubscribe;
    });

    return (
        <div className="Home">

            <div >
                <img className="imgHome" src="https://c.tenor.com/8McIGu0Tf_QAAAAj/fire-joypixels.gif" alt="" /> 
                    <br/>
                    <br/>

                <h3>  In Click 'N' Save you'll find the hottest discounts</h3>

            {!client&&
                <>
                    <span id ="white">
                        For more info and purchase Sign up or Login
                    </span> <br /> <br />
                </>
            }
                </div>
                    {!client&&
                    <>
                    <NavLink   to="/signup"><Button color="primary" size="small"><span id="grey">SignUp</span></Button></NavLink>
                   <NavLink to="/login"> <Button color="primary" size="small"><span  id="grey">SignIn</span></Button> </NavLink><br />   
                    </>
                    }
                    <br />

                    <span >Follow the link bellow to se all coupons <br/></span> <br />
                    <NavLink id ="info" to="/coupons" exact><Button>See All</Button></NavLink><br /><br />
                
                <div>


            </div>
        </div>
    );
};

export default Home;
