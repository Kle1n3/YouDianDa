import request from '@/utils/request'

export const getHotListApi = () => request({ url: '/home/index/hot' })

export const getNewsListApi = params => request({ url: '/home/index/new', params, })