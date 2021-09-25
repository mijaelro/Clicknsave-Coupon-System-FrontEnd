import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IndexNavbar.css"
import ClientType from "../../../models/ClientTypeModel";
import store from "../../../Redux/Store";
import AuthMenu from "../AuthMenu/AuthMenu";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function IndexNavbar(){
  const[client,setClient] = useState(store.getState().authLoginState.client);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  	
	useEffect(()=>{
		const unsubscribe = store.subscribe(() => {
			setClient(store.getState().authLoginState.client);
			return unsubscribe;
		});
	});

  React.useEffect(() => {
      window.addEventListener("scroll", changeColor);
      return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    };
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
 
return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">

          <NavbarBrand to="/" exact="true" tag={Link} id="navbar-brand">
            <span>Click 'n' Save ◉ </span>Coupons
          </NavbarBrand>

          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Mijael Rofe
          </UncontrolledTooltip>

            <button
              aria-expanded={collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>

        </div>

            <Collapse
              className={"justify-content-end " + collapseOut}
              navbar
              isOpen={collapseOpen}
              onExiting={onCollapseExiting}
              onExited={onCollapseExited}
            >

          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Click 'n' Save
                </a>
              </Col>

              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
              
            </Row>
          </div>

          <Nav navbar>
            <UncontrolledDropdown id="DropDownMenu" nav>
              <DropdownToggle id="DropDownMenu"
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Menu
              </DropdownToggle>
        
              <DropdownMenu className="dropdown-with-icons">
              {!client?
                <>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/home" exact="true">Home</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/coupons" exact="true">All coupons</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">About</DropdownItem>
                </>
				      : client.clientType===ClientType.admin?
                <>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/admin/companies" exact="true">AdminCompanies</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link}  to ="/admin/customers" exact="true">AdminCustomers</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link}  to = "/home" exact="true">Home</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">About</DropdownItem>
                </>
				      :client.clientType===ClientType.company ? 
                <>
                  <DropdownItem id="DropdownItem" tag={Link}  to = "/company/coupons" exact="true">Company-Coupons</DropdownItem>   
                  <DropdownItem id="DropdownItem" tag={Link}  to = "/home" exact="true">Home</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">About</DropdownItem>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/company/dets" exact="true">Details</DropdownItem>
                </>
				      : client.clientType===ClientType.customer ? 
                <>
                <DropdownItem id="DropdownItem" tag={Link}  to = "/customer" exact="true">Coupons</DropdownItem>
                <DropdownItem id="DropdownItem"  tag={Link} to ="/customer/purchase" exact="true">Purchase-coupons</DropdownItem>
                <DropdownItem id="DropdownItem" tag={Link} to = "/customer/dets" exact="true">Details</DropdownItem>
                <DropdownItem id="DropdownItem" tag={Link}  to = "/home" exact="true">Home</DropdownItem>
                <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">About</DropdownItem>
                </>
			        :null
			        }
              
                  </DropdownMenu>
                </UncontrolledDropdown>
              
              <AuthMenu/>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
