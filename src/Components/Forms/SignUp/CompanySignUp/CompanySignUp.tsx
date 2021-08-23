import "./CompanySignUp.css";
import { useForm } from "react-hook-form";
import {  NavLink, useHistory } from "react-router-dom";
import tokenAxios from "../../../../Services/InterceptorAxios";
import globals from "../../../../Services/Globals";
import store from "../../../../Redux/Store";
import { registerAction1 } from "../../../../Redux/AuthState";
import notify, { SccMsg } from "../../../../Services/Notification";
import CompanySignUpModel from "../../../../models/CompanySignUpModel";
import ClientType from "../../../../models/ClientTypeModel";
import { useEffect, useState } from "react";
import { couponsClearedAction } from "../../../../Redux/CouponsState";
import classnames from "classnames";
import "../../../../assets/css/nucleo-icons.css";
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

function CompanySignUp(): JSX.Element {
    const [fullNameFocus, setFullNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [coupons,setCoupons] = useState(null);
    const history = useHistory(); 
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid	 },
    } = useForm<CompanySignUpModel>({ mode: "onTouched" });

  async function send(company: CompanySignUpModel){
      try{ 
          const response = await tokenAxios.post<CompanySignUpModel>(globals.urls.client+"signup",company);
          store.dispatch(registerAction1(response.data));
          notify.success(SccMsg.REGISTER_SUCCESS);
          history.push("/company"); 
        }
        catch(err){
            notify.error(err.message);
       };
  };

  useEffect(() => {
      store.dispatch(couponsClearedAction());

        const unsubscribe = store.subscribe(()=>{
            setCoupons(store.getState().couponsState.coupons);
        });
          return unsubscribe; 
  });

return (
    <div className="section section-signup">
        <Container>
        <div className="squares square-1" />
        <div className="squares square-2" />
        <div className="squares square-3" />
        <div className="squares square-4" />
            <Row className="row-grid justify-content-between align-items-center">
   
              <Col className="mb-lg-auto" lg="6">
                <Card className="card-register">
                  <CardHeader>
                  <CardImg alt="..." src={require("../../../../assets/img/square-purple-1.png").default}/>
                  <CardTitle tag="h4">{' '}SignUp</CardTitle>
                  </CardHeader>
              <CardBody>
                  <Form className="form" onSubmit={handleSubmit(send)}>
                          <InputGroup className={classnames({"input-group-focus": fullNameFocus,})}>
                            <InputGroupAddon addonType="prepend" >
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                    
                                      <Input
                                      name="name"
                                        placeholder="Name"
                                        type="text"
                                        onFocus={(e) => setFullNameFocus(true)}
                                        onBlur={(e) => setFullNameFocus(false)}
                                        {...register("name",{
                                          required:true,
                                          minLength:2,
                                      })}
                                      />
                                      <br />
                                        {errors.name?.type==='required' && <span id="errors">Missing name</span>}
                                        {errors.name?.type==='minLength' && <span id="errors">Name is too short</span>}

                                        <br />
                            </InputGroup>
                            
                            <InputGroup>
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
                              
                              <option value={ClientType.company}>COMPANY</option>                  
                            
                              
                      </Input>
                      <br />
                      <span id="errors">{errors.clientType?.message}</span>
                      
                      <br />

                        </InputGroup> 
                        <FormGroup check className="text-left">
                          <Label check>
                            <Input required type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <NavLink  to="/terms" exact>
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

export default CompanySignUp;
