import request from '@/utils/request'

export const userRegApi = data => request({
    method: 'post',
    url: '/home/index/reg',
    data,
})