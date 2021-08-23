import { Notyf } from "notyf";

export enum SccMsg {
  PURCHASED_COUPON = "PURCHASED COUPON",
 
  ADDED_COMPANY = 'COMPANY ADDED',
  ADDED_CUSTOMER = 'CUSTOMER ADDED',
  ADDED_COUPON = "COUPON ADDED",
 
  DOWNLOADED_COMPANIES = 'ALL COMPANIES FETCHED',
  DOWNLOADED_CUSTOMERS = 'ALL CUSTOMERS FETCHED',
  DOWNLOADED_COUPONS = 'ALL COUPONS FETCHED',
  
  LOGIN_SUCCESS = "LOGIN SUCCESSFUL",
  LOGOUT_SUCCESS = "LOGOUT SUCCESSFUL",
  
  UPDATED_SUCCESS = "UPDATED SUCCESSFULLY",
  DELETED_SUCCESS = "DELETED SUCCESSFULLY",
  REGISTER_SUCCESS = "REGISTERED SUCCESSFULLY",
  
  COMPANY_LOADED = "COMPANY LOADED",
  CUSTOMER_LOADED = "CUSTOMER LOADED",
  COUPON_LOADED = "COUPON LOADED"
};

export enum ErrMsg {
  PLS_LOGIN = "PLEASE LOGIN",
  NO_COUPONS = "NO COUPONS FOUND",
  NO_CUSTOMERS = "NO CUSTOMERS FOUND",
  NO_COMPANIES = "NO COMPANIES FOUND",
  COUPON_NOT_FOUND = "COUPON NOT FOUND",
  COMPANY_NOT_FOUND = "COMPANY NOT FOUND"
};

class Notify{

    private notification = new Notyf({duration:4000, position:{x:"left",y:"top"}});
 
    static error: any;
   
    public success(message: string){
        this.notification.success(message);
    };

    public error(err: any){
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    };

    private extractMsg(err: any): string{
        
		if(typeof err === 'string'){
            return err;
        };

        if(typeof err?.response?.data === 'string'){ 
            return err.response.data;
        };

        if(Array.isArray(err?.response?.data)){ 
            return err?.response?.data[0];
        };
    
        if(typeof err?.message === 'string'){
            return err.message;
        };

        return "Damn, an error occurred, please try again.";
    };
};
const notify = new Notify();

export default notify;