import { NavLink } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import "./SignUp.css";

function SignUp(): JSX.Element {
    return (
        <div className="SignUp">
             <h2 id="niceTitle">SignUp</h2>
                <div className="container1">
                    <div className="item">
                    <NavLink id="info" to="/companySignUp"><Button size="lg">Company</Button></NavLink>
                    </div>
                    <div className="item1">
                    <NavLink  id="info" to="/customerSignUp"><Button size="lg" color="default">Customer</Button></NavLink>
                    </div>
                </div>

            <div className="item2"><NavLink to="/home"><Button color="info"><i className="tim-icons icon-double-left"></i></Button></NavLink></div>

        </div>
    );
};

export default SignUp;
