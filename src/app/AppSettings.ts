export class AppSettings {
    public static API_ENDPOINT = 'https://merakki.herokuapp.com';
    public static GOOGLE_API_ENDPOINT = 'https://www.googleapis.com';
    public static PATHS = {
        products :  {
            get:"/products"
        },
        carts: {
            newcart: "/cart",
            updatecart: "/cart/{0}/update",
            placeorder: "/cart/submit"
        },
        user: {
            google_validate: "/oauth2/v1/tokeninfo?access_token="
        }
    }
}