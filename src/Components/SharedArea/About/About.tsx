import "./About.css";

function About(): JSX.Element {
    return (
        <div className="About">
			<h1 id="niceTitle">About</h1>
            <span>This is a coupon management page , built with React.js and Spring Framework</span> <br />
            <span>To see the page functionalities you have to sign up or login </span> <br /><br />
            
                <h4 id="niceTitle3">Admin:</h4>
                <ul>
                    <li>Get All companies/customers</li>
                    <li>Get company/customer</li>
                    <li>Add company/customer</li>
                    <li>Delete company/customer</li>
                    <li>Update company/customer</li>
                </ul>

                <h4 id="niceTitle3">Company:</h4>
                <ul>
                    <li>Get All company coupons</li>
                    <li>Get company coupon</li>
                    <li>Add Coupon</li>
                    <li>Delete Coupon</li>
                    <li>Update Coupon</li>
                </ul>

                <h4 id="niceTitle3">Customer:</h4>
                <ul>
                    <li>Get All Coupons</li>
                    <li>Get Customer coupon</li>
                    <li>Purchase (add) Coupon</li>
                </ul>

                <span><span id="errors">note:</span>everyone can see All coupons at All times <br/> just go to Home and press See All coupons!</span><br /><br />
                <span>Made by <a href="https://www.linkedin.com/in/mijael-rofe-42a264180/" target="_blank"  rel="noreferrer" >Mijael Rofe</a></span><br />
                      

        </div>
    );
}

export default About;
