import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import "./Terms.css";

function Terms(): JSX.Element {
    return (
        <div className="Terms">
            <h1 id="niceTitle2">There are no terms for now ...</h1>
			<img src="https://media.giphy.com/media/39pGKIF075UuS7nxrI/giphy.gif" alt="jk" />
            <br /><br />
            <Button><NavLink to="/home"><i className="tim-icons icon-double-left"></i></NavLink></Button>
        </div>
    );
};

export default Terms;
