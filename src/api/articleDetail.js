import request from '@/utils/request'

export const getArticleDetailApi = params => request({
    method: 'get',
    url: '/home/index/show',
    params,
})