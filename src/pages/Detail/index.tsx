import { DetailData, fetchDetailAPI } from "@/apis/datail"
import { NavBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Detail = () => {
    const [detail, setDetail] = useState<DetailData | null>(null)
    const [params] = useSearchParams()
    const id = params.get('id')
    const navigate = useNavigate()
    useEffect(() => {
        const getDetail = async () => {
            try {
                const res = await fetchDetailAPI(id!)
                setDetail(res.data.data)
            } catch (error) {
                throw new Error('fetch detail error')
            }
        }
        getDetail()
    }, [])
    const back = () => {
        navigate(-1)
    }
    if (!detail) return (
        <div>this is loading...</div>
    )
    return (
        <div>
            <NavBar onBack={back}>{detail?.title}</NavBar>
            <div
                dangerouslySetInnerHTML={{
                    __html: detail?.content
                }}>

            </div>
        </div>
    )
}

export default Detail