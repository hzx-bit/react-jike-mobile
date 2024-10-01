import { http } from "@/utils"

import { type ResType } from './shared.ts'
//定义具体的接口类型
export type channelItem = {
    id: number
    name: string
}

type channelRes = {
    channels: channelItem[]
}

//请求频道列表
export function fetchChannelAPI() {
    return http.request<ResType<channelRes>>({
        url: '/channels'
    })
}

//请求文章列表
export type ArticleItem = {
    art_id: string,
    title: string,
    aut_id: string,
    comm_count: number,
    pubdate: string,
    aut_name: string,
    is_top: number,
    cover: {
        type: number,
        images: string[]
    }
}
export type ArticleRes = {
    results: ArticleItem[],
    pre_timestamp: string
}

export type ReqParams = {
    channel_id: string,
    timestamp: string
}
export function fetchArticleAPI(params: ReqParams) {
    return http.request<ResType<ArticleRes>>({
        url: '/articles',
        params,
    })
}

