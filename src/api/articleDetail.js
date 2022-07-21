import request from '@/utils/request'

export const getArticleDetailApi = params => request({
    method: 'get',
    url: '/home/index/show',
    params,
})

export const addCollectArticleApi = params => request({
    url: '/home/user/userDataHandle',
    params,
})
export const cancelCollectArticleApi = params => request({
    url: '/home/user/userDataHandle',
    params,
})


export const addLikeArticleApi = params => request({
    url: '/home/user/userDataHandle',
    params,
})
export const cancelLikeArticleApi = params => request({
    url: '/home/user/userDataHandle',
    params,
})

