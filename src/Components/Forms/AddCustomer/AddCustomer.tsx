import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useHistory } from "react-router-dom";
import ClientType from "../../../models/ClientTypeModel";
import CustomerModel from "../../../models/CustomerModel";
import { customerAddedAction } from "../../../Redux/CustomersState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
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

   
function AddCustomer(): JSX.Element{
    const [fullNameFocus, setFullNameFocus] = useState(false);
    const [fullLastNameFocus, setFullLastNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const[customers,setCustomers] = useState(store.getState().customersState.customers);
    const {register,handleSubmit,formState:{errors,isDirty, isValid},} = useForm<CustomerModel>({ mode: "onTouched" });
    const history = useHistory();

    useEffect(()=>{
        if(store.getState().authLoginState.client?.clientType!==ClientType.admin){
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };       
        const unsubscribe = store.subscribe(() => {
            setCustomers(store.getState().customersState.customers);
 
        });
        return unsubscribe;
    });
        
    async function send(customer:CustomerModel) {
        try{
            const formData = new FormData();
            formData.append("firstName",customer.firstName);
            formData.append("lastName",customer.lastName);
            formData.append("email",customer.email);
            formData.append("password",customer.password);
            const response = await tokenAxios.post<CustomerModel>(globals.urls.admin+"customer",formData);
            store.dispatch(customerAddedAction(response.data));
            history.push('/admin/customers');
            notify.success(SccMsg.ADDED_CUSTOMER);
        }
        catch (err) {
           notify.error(err.message);
        };
    };
    
 return (
    <div className="AddCustomer section section-signup">
        <Container>
                <div className="squares square-1" />
                <div className="squares square-2" />
                <div className="squares square-3" />
                <div className="squares square-4" />
            <Row className="row-grid justify-content-between align-items-center">

                <Col className="mb-lg-auto" lg="6">
                    <Card className="card-register ">
                        <CardHeader>
                            <CardImg  id="cardImage1"
                            alt="..." 
                            src={require("../../../assets/img/square-purple-1.png").default}
                            />
                                <CardTitle id="abs1" tag="h4"> Add</CardTitle>
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
                                            name="firstName"
                                            placeholder="FirstName"
                                            type="text"
                                            onFocus={(e) => setFullNameFocus(true)}
                                            onBlur={(e) => setFullNameFocus(false)}
                                            {...register("firstName",{
                                            required:true,
                                            minLength:2,
                                        })}
                                        />
                                        <br />
                                            {errors.firstName?.type==='required' && <span id="errors">Missing name</span>}
                                            {errors.firstName?.type==='minLength' && <span id="errors">Name is too short</span>}

                                            <br />
                            </InputGroup>
                            <InputGroup className={classnames({"input-group-focus": fullLastNameFocus,})}>
                                <InputGroupAddon addonType="prepend" >
                                    <InputGroupText>
                                        <i className="tim-icons icon-single-02" />
                                    </InputGroupText>
                                </InputGroupAddon>

                                            <Input
                                                name="lastName"
                                                placeholder="LastName"
                                                type="text"
                                                onFocus={(e) => setFullLastNameFocus(true)}
                                                onBlur={(e) => setFullLastNameFocus(false)}
                                                {...register("lastName",{
                                                required:true,
                                                minLength:2,
                                            })}
                                            />
                                            <br />
                                                {errors.lastName?.type==='required' && <span id="errors">Missing LastName</span>}
                                                {errors.lastName?.type==='minLength' && <span id="errors">LastName is too short</span>}

                                                <br />
                            </InputGroup>

                            <InputGroup  className={classnames({"input-group-focus": emailFocus,})}>
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


                                            <InputGroup className={classnames({"input-group-focus": passwordFocus,})}>
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
                                        <FormGroup check className="text-left">
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />I agree to the{" "}
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            terms and conditions
                                            </a>
                                            .
                                        </Label>
                                        </FormGroup>
                            <CardFooter >

                                <div className="centeral">
                                    <Button type="submit" className="btn-round" color="primary" size="lg" disabled={!isDirty || !isValid}>✔️</Button>
                                    <Button  className="btn-round"  color="primary" size="lg" onClick={() =>{history.push("/admin/customers")}}>✖️</Button>
                                </div>
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

export default AddCustomer;


