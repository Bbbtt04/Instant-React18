import { notification } from "antd";
import axios from "axios";
import { TOKEN_KEY } from "./contents";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

request.interceptors.request.use((request:any) => {
  if(localStorage.getItem(TOKEN_KEY))
    request.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;

  return request
})

request.interceptors.response.use((response:any) => {
  return response.data;
}, (error:any) => {
  notification.error({
    message: '错误提示',
    description:"服务器错误"
  })
})

export default request;
