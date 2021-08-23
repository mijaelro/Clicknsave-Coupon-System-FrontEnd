import ClientType from "./ClientTypeModel";

class CompanySignUpModel{
    public companyId:number;
    public name:string;
    public email: string;
    public password: string;
    public clientType:ClientType;
};
export default CompanySignUpModel;