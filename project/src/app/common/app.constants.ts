export class AppConstants {
  private static API_BASE_URL = "http://localhost:8090/";
  private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  private static REDIRECT_URL = "?redirect_uri=http://localhost:8090/";
  public static API_URL = AppConstants.API_BASE_URL + "api/";
  public static AUTH_API = AppConstants.API_URL + "auth/";
}
