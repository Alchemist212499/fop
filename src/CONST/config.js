const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0ZWxlcGhvbmUiOiIxMDAwMDAwMTAwMDAwIiwidXNlck5hbWUiOiJ0ZXN0VXNlcjEiLCJleHAiOjE3MjUzNjk0MDF9.2IfrZ0W8Cr2u_NbkbtLAXET_RfNWwg1q3rpCrXBf98I";
/* const config = {
  headers: { token },
  }; */
import Cookies from "js-cookie";
const config = { headers: { token: Cookies.get("userToken") } };
export default config;
