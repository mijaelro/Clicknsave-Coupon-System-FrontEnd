import CouponModel from "../models/CouponModel";

export class CouponsStartAppState {
    public coupons: CouponModel[] = [];
};

export enum CouponsStartActionType {
    CouponsStartDownloaded= "CouponsStartDownloaded",
    CouponStartAdded = "CouponStartAdded",
    CouponStartUpdated = "CouponStartUpdated",
    CouponStartDeleted = "CouponStartDeleted"
};

export interface CouponStartAction {
    type: CouponsStartActionType;
    payload?: any;
};

export function couponsStartDownloadedAction(coupons: CouponModel[]): CouponStartAction {
    return { type: CouponsStartActionType.CouponsStartDownloaded, payload: coupons };
};
export function couponStartAddedAction(coupon: CouponModel): CouponStartAction {
    return { type: CouponsStartActionType.CouponStartAdded, payload: coupon };
};
export function couponStartUpdatedAction(coupon: CouponModel): CouponStartAction {
    return { type: CouponsStartActionType.CouponStartUpdated, payload: coupon };
};
export function couponStartDeletedAction(id:number): CouponStartAction {
    return { type: CouponsStartActionType.CouponStartDeleted, payload: id };
};

export function couponsStartReducer(currentState: CouponsStartAppState = new CouponsStartAppState(),action:CouponStartAction): CouponsStartAppState{
    
    const newState = {...currentState};
    
    switch (action.type) {
        case CouponsStartActionType.CouponsStartDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsStartActionType.CouponStartAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponsStartActionType.CouponStartUpdated:
            newState.coupons.push(action.payload);
            break;
        case CouponsStartActionType.CouponStartDeleted:
            newState.coupons = newState.coupons.filter(c=>c.id !== action.payload);
            break;
        
    };

    return newState;
};