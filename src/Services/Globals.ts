class Globals{
};

class DevelopmentGlobals extends Globals{
    public urls = {
        coupons:"http://localhost:8080/coupon/",
        client: "http://localhost:8080/client/",
        company: "http://localhost:8080/company/",
        customer:"http://localhost:8080/customer/",
        admin: "http://localhost:8080/admin/"
    };
};

class ProductionGlobals extends Globals{
    public urls = {
        coupons:"/coupon/",
        client: "/client/",
        company: "/company/",
        customer:"/customer/",
        admin: "/admin/",
    };
};

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;