import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../models/CredentialsModel";
import {  NavLink, useHistory } from "react-router-dom";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/AuthState";
import ClientModel from "../../../models/ClientModel";
import ClientTypeModel from "../../../models/ClientTypeModel";
import tokenAxios from "../../../Services/InterceptorAxios";
import ClientType from "../../../models/ClientTypeModel";
import notify, { SccMsg } from "../../../Services/Notification";
import classnames from "classnames";
import "../../../assets/css/nucleo-icons.css";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
  } from "reactstrap";


function Login(): JSX.Element {

    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const {register,handleSubmit, formState: { errors, isDirty, isValid	 }} = useForm<CredentialsModel>({ mode: "onTouched" });
    const history = useHistory();

     
    async function send(credentials: CredentialsModel) {
        try{ 
            const response = await tokenAxios.post<ClientModel>(globals.urls.client+"login",credentials);
            store.dispatch(loginAction(response.data));
            notify.success(SccMsg.LOGIN_SUCCESS);
          if(response.data.clientType===ClientType.company){
              history.push('/company'); 
          };
          if(response.data.clientType===ClientType.customer){
              history.push('/customer'); 
          };
          if(response.data.clientType===ClientType.admin){
              history.push('/admin');
          };
        }
        catch(err){
             notify.error(err);
        };
    };

return (
       
   <div className="Login section section-signup">
      <Container>
        <div className="squares square-1" />
        <div className="squares square-2" />
        <div className="squares square-3" />
        <div className="squares square-4" />
        <Row className="row-grid justify-content-between align-items-center">
         
          <Col className="mb-lg-auto" lg="6">
            <Card className="card-register">
              <CardHeader>
                <CardImg
                  alt="..."
                  src={require("../../../assets/img/square-purple-1.png").default}
                />
                <CardTitle  tag="h4">{' '}Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form" onSubmit={handleSubmit(send)}>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend" >
                      <InputGroupText>
                      <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
            
                    <Input
                    name="email"
                      placeholder="Email"
                      type="email"
                      onFocus={(e) => setEmailFocus(true)}
                      onBlur={(e) => setEmailFocus(false)}
                      {...register("email",{
                        required:true,
                        minLength:9,
                    })}
                    />
                {errors.email?.type==='required' && <span id="errors">Missing email</span>}
                {errors.email?.type==='minLength' && <span id="errors">Email is too short</span>}
               
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      placeholder="Password"
                      type="password"
                      onFocus={(e) => setPasswordFocus(true)}
                      onBlur={(e) => setPasswordFocus(false)}
                      {...register("password",{
                        required:true,
                        minLength:4,
                    })}
                    />
                     <br />
                {errors.password?.type==='required' && <span id="errors">Missing password</span>}
                {errors.password?.type==='minLength' && <span id="errors">Password is too short</span>}
                <br />

                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": passwordFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                       
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                     name="clientType"
                     placeholder="clientType"
                     type="select"
                     id="exampleSelect1"
                    {...register("clientType",{
                        required:{
                        value:true,
                        message:'you must choose a clientType'
                        }
                })}>
                        
                        <option value=""  disabled hidden>Choose here</option>
                        <option id="dark1" value={ClientTypeModel.admin}>ADMIN</option>
                        <option id="dark1" value={ClientTypeModel.company}>COMPANY</option>
                        <option id="dark1" value={ClientTypeModel.customer}>CUSTOMER</option>
                       
                        
                </Input>
                <br />
                <span id="errors">{errors.clientType?.message}</span>
                
                <br />

                  </InputGroup> 
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input type="checkbox" required />
                      <span className="form-check-sign" />I agree to the{" "}
                      <NavLink to="/terms" exact>
                        terms and conditions
                      </NavLink>
                      .
                    </Label>
                  </FormGroup>
                  <CardFooter>
                 
                <Button type="submit" className="btn-round" color="primary" size="lg" disabled={!isDirty || !isValid}>✔️</Button>
                <Button className="btn-round" color="primary" size="lg" onClick={() =>{history.push("/home")}}>✖️</Button>
                
              </CardFooter>
                </Form>
              </CardBody>
             
            </Card>
          </Col>
        </Row>
      </Container>           
    </div>
  );
};

export default Login;

