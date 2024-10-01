import { fetchChannelAPI } from "@/apis/list";
import { useEffect } from "react";

export function useFetchChannels(){
    useEffect(()=>{
        fetchChannelAPI()
    },[])

    
}