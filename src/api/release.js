import request from '@/utils/request'

export const uploadImageApi = (formData) => request({
    url: '/home/common/upload?type=images',
    method: 'post',
    headers: {
        contentType: 'multipart/form-data; boundary=----WebKitFormBoundaryih2B8xtAogLAoAvt'
    },
    data: formData,
})

export const releaseArtApi = data => request({ method: 'post', url: '/home/user/addArticle', data, })

export const getArticleInfo = params => request({
    url: '/home/index/show',
    params,
})

export const editArticleApi = data => request({
    method: 'post',
    url: '/home/user/editArticle',
    data,
})