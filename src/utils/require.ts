import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const serve = axios.create({
  baseURL:process.env.VUE_APP_BASE_URL,
  timeout:1000,

})

serve.interceptors.request.use((config:AxiosRequestConfig)=>{

},(error:Error)=>{

})
serve.interceptors.response.use((response:AxiosResponse)=>{

},(error:Error)=>{

});
export default serve