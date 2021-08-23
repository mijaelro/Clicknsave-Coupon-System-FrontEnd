import CategoryType from "./CategoryTypeModel";

class CouponPayLoadModel{
    public id?:number;
    public companyId?:number;
    public categoryType?:CategoryType;
    public title?:string;
    public description?:string;
    public startDate?:string;
    public endDate?:string;
    public amount?:number;
    public price?:number;
    public image?:FileList;
};
export default CouponPayLoadModel;