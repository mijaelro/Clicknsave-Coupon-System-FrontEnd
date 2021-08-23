import ClientType from "./ClientTypeModel";

class Client{
    public email: string;
    public password: string;
    public clientType: ClientType;
    public clientId:number;
    public clientName:string;
    public token: object;
};

export default Client;