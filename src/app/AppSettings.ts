export class AppSettings {
    public static API_ENDPOINT = 'https://merakki.herokuapp.com';//'http://localhost:8080';
    public static GOOGLE_API_ENDPOINT = 'https://www.googleapis.com';
    public static PATHS = {
        products :  {
            get:"/products"
        },
        carts: {
            newcart: "/cart",
            updatecart: "/cart/%s/update",
            updateaddress: "/cart/%s/address",
            placeorder: "/cart/%s/submit",
            getuserorders: "/order/user",
            getorder: "/order/%s"
        },
        user: {
            google_validate: "/oauth2/v1/tokeninfo?access_token="
        }
    }
}