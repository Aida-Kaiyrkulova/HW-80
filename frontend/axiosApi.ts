import axios from "axios";
import { apiUrl } from './globalConstants';


const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;