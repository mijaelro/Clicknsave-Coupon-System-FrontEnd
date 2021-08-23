import CouponModel from "../models/CouponModel";
import CouponPayLoadModel from "../models/CouponPayLoadModel";

export class CouponsAppState {
    public coupons: CouponModel[] = [];
};

export enum CouponsActionType {
    CouponsDownloaded= "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted",
    CouponsCleared = "CouponsCleared"
};

export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
};

export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
};
export function couponAddedAction(coupon: CouponPayLoadModel): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon};
};
export function couponAddedAction2(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon};
};
export function couponUpdatedAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
};
export function couponUpdatedAction2(coupon: CouponPayLoadModel): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
};
export function couponsDeletedAction(id:number): CouponAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
};
export function couponsClearedAction(): CouponAction {
    return { type: CouponsActionType.CouponsCleared};
};

export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(),action:CouponAction): CouponsAppState{
    
    const newState = {...currentState};

    switch (action.type) {
        case CouponsActionType.CouponsDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.CouponAdded:
            newState.coupons.push(action.payload);
            break;

        case CouponsActionType.CouponUpdated:
            const idx = newState.coupons.findIndex(c => c.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;

        case CouponsActionType.CouponDeleted:
            newState.coupons = newState.coupons.filter(c=>c.id !== action.payload);
            break;

        case CouponsActionType.CouponsCleared:
            newState.coupons = newState.coupons=[];
            break;
    };

    return newState;
};