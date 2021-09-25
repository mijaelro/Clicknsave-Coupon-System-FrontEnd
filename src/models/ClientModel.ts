import ClientType from "./ClientTypeModel";

class Client{
    public clientEmail: string;
    public clientPassword: string;
    public clientType: ClientType;
    public clientId:number;
    public clientName:string;
    public clientLastName:string;
    public token: object;
};

export default Client;