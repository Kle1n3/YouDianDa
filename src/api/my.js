import request from '@/utils/request'
export const getUserInfoApi = () => request({ url: '/home/user/getUserInfo' })