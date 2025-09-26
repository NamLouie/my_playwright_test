class APiUtils{


    constructor(apiContext, LoginPayLoad){

        this.apiContext = apiContext;    
        this.LoginPayLoad = LoginPayLoad;   
    }

    async getToken(){

    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.LoginPayLoad})

    //Login API
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
    return token;
    }

    async createOrder(orderPayLoad){

        let response = {};
        response.token = await this.getToken();
        
            //Handle Order Creation API
            const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: orderPayLoad,
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                },
        
            })
            const createOrderResponseJSON = await createOrderResponse.json();
            console.log(createOrderResponseJSON);
            const orderId = createOrderResponseJSON.orders[0];
            response.orderId = orderId;

            return response;
    }

}

module.exports = {APiUtils};