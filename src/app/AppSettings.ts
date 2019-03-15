export class AppSettings {
    public static API_ENDPOINT = 'https://merakki.herokuapp.com';
    public static GOOGLE_API_ENDPOINT = 'https://www.googleapis.com';
    public static PATHS = {
        products :  {
            get:"/products"
        },
        user: {
            google_validate: "/oauth2/v1/tokeninfo?access_token="
        }
    }
}