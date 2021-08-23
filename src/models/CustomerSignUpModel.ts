import ClientType from "./ClientTypeModel";

class CustomerSignUpModel{
    public customerId:number;
    public firstName:string;
    public lastName:string;
    public email: string;
    public password: string;
    public clientType:ClientType;
};
export default CustomerSignUpModel;