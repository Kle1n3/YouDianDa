import request from '@/utils/request'

export const getUserProfileApi = () => request({
    method: 'get',
    url: '/home/user/getUserInfo',
})

export const uploadPhotoApi = data => request({
    method: 'POST',
    url: '/home/common/upload',
    params: { type: 'images' },
    data,
})

export const updateUserProfileApi = data => request({
    method: 'POST',
    url: '/home/user/update',
    data,
})

export const getUserDataList = params => request({
    url: '/home/user/userDataList',
    params,
})

export const getMyArticleListApi = params => request({
    url: '/home/user/myArticle',
    params,
})
export const delArticleApi = params => request({
    url: '/home/user/delArticle',
    params,
})