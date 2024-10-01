import { Image, InfiniteScroll, List } from 'antd-mobile'
import { channelItem, fetchArticleAPI } from '@/apis/list.ts'
import { useEffect, useState } from 'react'
import { ArticleRes } from '@/apis/list.ts'
import { useNavigate } from 'react-router-dom'
const HomeList = ({ id, name }: channelItem) => {
    const [articleRes, setArticleRes] = useState<ArticleRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime(),
    })
    const navigate = useNavigate()
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const append = await fetchArticleAPI({
            channel_id: id.toString(),
            timestamp: articleRes.pre_timestamp
        })
        setArticleRes({
            results: [...articleRes.results, ...append.data.data.results],
            pre_timestamp: append.data.data.pre_timestamp,
        })
        if (append.data.data.results.length === 0) setHasMore(false)
    }
    useEffect(() => {
        const getArticleList = async () => {
            try {
                const res = await fetchArticleAPI({
                    channel_id: id.toString(),
                    timestamp: articleRes.pre_timestamp
                })
                setArticleRes({
                    results: res.data.data.results,
                    pre_timestamp: res.data.data.pre_timestamp,
                })
            } catch (error) {
                throw new Error('fetch list error')
            }
        }
        getArticleList()
    }, [id])
    const goToDetail = (art_id: string) => {
        navigate(`/detail?id=${art_id}`)
    }
    return (
        <>
            <List header={name}>
                {articleRes.results.map(article => (
                    <List.Item
                        onClick={() => goToDetail(article.art_id)}
                        key={article.art_id}
                        prefix={
                            article.cover.type === 0 || <Image
                                src={article.cover.images[0]}
                                style={{ borderRadius: 20 }}
                                fit='cover'
                                width={40}
                                height={40}
                            />
                        }
                        description={article.pubdate}
                    >
                        {article.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
        </>

    )
}

export default HomeList