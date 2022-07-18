import request from '@/utils/request'

export const getArticleListApi = params => request({ url: '/home/index/list', params, })