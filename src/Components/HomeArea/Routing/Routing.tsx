import {HashRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminCompanyDetails from "../../Admin/Admin-CompanyArea/AdminCompanyDetails/AdminCompanyDetails";
import CompanyCouponDetails from "../../Company/CompanyCouponDetails/CompanyCouponDetails";
import Login from "../../Forms/Login/Login";
import Logout from "../../Forms/Logout/Logout";
import Page404 from "../../SharedArea/Page404/Page404";
import Home from "../Home/Home";
import CouponCards from "../../Coupons/CouponCards/CouponCards";
import CouponDetails from "../../Coupons/CouponDetails/CouponDetails";
import AddCoupon from "../../Forms/AddCoupon/AddCoupon";
import AddCompany from "../../Forms/AddCompany/AddCompany";
import AddCustomer from "../../Forms/AddCustomer/AddCustomer";
import AdminCompanyCards from "../../Admin/Admin-CompanyArea/AdminCompanyCards/AdminCompanyCards";
import CustomerCouponDetails from "../../Customer/CustomerCouponDetails/CustomerCouponDetails";
import CustomerCouponCards from "../../Customer/CustomerCouponCards/CustomerCouponCards";
import CompanyCouponCards from "../../Company/CompanyCouponCards/CompanyCouponCards";
import SignUp from "../../Forms/SignUp/SignUp";
import CompanySignUp from "../../Forms/SignUp/CompanySignUp/CompanySignUp";
import CustomerSignUp from "../../Forms/SignUp/CustomerSignUp/CustomerSignUp";
import AdminCustomerCards from "../../Admin/Admin-CustomerArea/AdminCustomerCards/AdminCustomerCards";
import AdminCustomerDetails from "../../Admin/Admin-CustomerArea/AdminCustomerDetails/AdminCustomerDetails";
import Terms from "../../LayoutArea/Terms/Terms";
import About from "../../SharedArea/About/About";
import CompanyDetails from "../../Company/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../Customer/CustomerDetails/CustomerDetails";

function Routing(): JSX.Element {
 
    return (
        <div className="Routing">
            <HashRouter>
			 <Switch>

                <Route path = '/home' component={Home} exact/>
                <Route path = '/terms' component={Terms} exact/>
                <Route path = '/about' component={About} exact/>
                

                <Route path = '/coupons' component={CouponCards} exact/>
                <Route path = '/coupons/details/:id' component={CouponDetails} exact/>

                <Route path = '/signup' component={SignUp} exact/>
                <Route path = '/companySignUp' component={CompanySignUp} exact/>
                <Route path = '/customerSignUp' component={CustomerSignUp} exact/>

                <Route path = '/login' component={Login} exact/>
                <Route path = '/logout' component={Logout} exact/>

                <Route path = '/admin' component={AdminCompanyCards} exact/> 
                <Route path = '/admin/addCompany' component={AddCompany} exact/> 
                <Route path = '/admin/addCustomer' component={AddCustomer} exact/> 

                <Route path = '/admin/companies' component={AdminCompanyCards} exact/>
                <Route path = '/admin/customers' component={AdminCustomerCards} exact/>
                <Route path = '/admin/companies/details/:id' component={AdminCompanyDetails} exact/>
                <Route path = '/admin/customers/details/:id' component={AdminCustomerDetails} exact/>

                <Route path = '/company' component={CompanyCouponCards} exact/>
                <Route path = '/company/dets' component={CompanyDetails} exact/>
                <Route path = '/company/coupons' component={CompanyCouponCards} exact/>
                <Route path = '/company/coupons/details/:id' component={CompanyCouponDetails} exact/>
                <Route path = '/company/addcoupon' component={AddCoupon} exact/>

                <Route path = '/customer' component={CustomerCouponCards} exact/>
                <Route path = '/customer/dets' component={CustomerDetails} exact/>
                <Route path = '/customer/coupons' component={CustomerCouponCards} exact/>
                <Route path = '/customer/coupons/details/:id' component={CustomerCouponDetails} exact/>
                <Route path = '/customer/purchase' component={CouponCards} exact/>

                <Redirect from='/' to='home' exact/>
                <Redirect from='' to='home' exact/>
                <Redirect from='/*' to='home' exact/>
                <Route  component={Page404} exact/>

            </Switch>
            </HashRouter>
        </div>
    );
};

export default Routing;
