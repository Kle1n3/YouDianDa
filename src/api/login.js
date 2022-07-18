import request from '@/utils/request'

export const userLoginApi = data => request({
    method: 'post',
    url: '/home/index/login',
    data,
})