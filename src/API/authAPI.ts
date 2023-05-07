import { instance } from "./instance"
import { APIAuthResponseType } from "./API.types"
import { LoginFormDataType } from "../pages/Login/Login"
import { RegisterFormDataType } from "../pages/Registration/Registration"


export const authAPI = {
  async login(params: LoginFormDataType) {
    return await instance.post<APIAuthResponseType>('auth/login', params).then(res => res.data)
  },
  async register(params: RegisterFormDataType) {
    return await instance.post<APIAuthResponseType>('auth/register', params).then(res => res.data)
  },
  async authMe() {
    return await instance.get<APIAuthResponseType>('auth/me').then(res => res.data)
  },
}