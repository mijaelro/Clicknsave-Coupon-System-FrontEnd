import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  NavLink, useHistory } from "react-router-dom";
import ClientType from "../../../models/ClientTypeModel";
import CompanyModel from "../../../models/CompanyModel";
import { companyAddedAction } from "../../../Redux/CompaniesState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import "./AddCompany.css";
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


function AddCompany(): JSX.Element {
    const {register,handleSubmit,formState: {errors,isDirty,isValid},
      } = useForm<CompanyModel>({ mode: "onTouched" });

    const [nameFocus, setNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const[companies,setCompanies] = useState(store.getState().companiesState.companies);
    const history = useHistory();
   
    useEffect(()=>{
        if(store.getState().authLoginState.client?.clientType!==ClientType.admin){
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
        const unsubscribe = store.subscribe(() => {
            setCompanies( store.getState().companiesState.companies);
            return unsubscribe;
          });
        
      });

    async function send(company:CompanyModel) {
        try{
            const formData = new FormData();
            formData.append("name",company.name);
            formData.append("email",company.email);
            formData.append("password",company.password);
            const response = await tokenAxios.post<CompanyModel>(globals.urls.admin+"company",formData);
            store.dispatch(companyAddedAction(response.data));
            history.push('/admin/companies');
            notify.success(SccMsg.ADDED_COMPANY);
        }
        catch (err) {
          notify.error(err.message);
        }
    };

return (
  <div className="AddCompany section section-signup">
        <Container>
    <div className="squares square-1" />
    <div className="squares square-2" />
    <div className="squares square-3" />
    <div className="squares square-4" />
        <Row className="row-grid justify-content-between align-items-center">

             <Col className="mb-lg-auto" lg="6">
                <Card className="card-register">
                    <CardHeader>
                        <CardImg alt="..." src={require("../../../assets/img/square-purple-1.png").default}/>
                            <CardTitle tag="h4">{'  '} Add</CardTitle>
                    </CardHeader>

                      <CardBody>

                        <Form className="form" onSubmit={handleSubmit(send)}>
                              <InputGroup className={classnames({"input-group-focus": nameFocus,})}>
                                  <InputGroupAddon addonType="prepend" >
                                      <InputGroupText>
                                          <i className="tim-icons icon-single-02" />
                                      </InputGroupText>
                                  </InputGroupAddon>
                    
                                          <Input
                                          className="form-control"
                                              name="name"
                                              placeholder="Name"
                                              type="text"
                                              onFocus={(e) => setNameFocus(true)}
                                              onBlur={(e) => setNameFocus(false)}
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

                              <InputGroup  className={classnames({"input-group-focus": emailFocus,})}>
                                  <InputGroupAddon addonType="prepend" >
                                      <InputGroupText>
                                          <i className="tim-icons icon-email-85" />
                                      </InputGroupText>
                                  </InputGroupAddon>
                    
                                              <Input
                                              className="form-control"
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


                              <InputGroup className={classnames({"input-group-focus": passwordFocus,})}>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                      <i className="tim-icons icon-lock-circle" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                              <Input
                                              className="form-control"
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
                              <FormGroup check className="text-left">
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />I agree to the{" "}
                                    <NavLink to="/terms" exact>
                                    terms and conditions.
                                    </NavLink>         
                                  
                                </Label>
                              </FormGroup>
                                          <CardFooter>

                                              <Button type="submit" className="btn-round"  color="primary" size="lg" disabled={!isDirty || !isValid}>✔️</Button>
                                              <Button className="btn-round" color="primary" size="lg" onClick={() =>{history.push("/admin/customers")}}>✖️</Button>
                                              
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

export default AddCompany;


