import {useEffect,useRef} from 'react'
import styles from '../pages/Post.module.css'
interface DynamicMapProps{
    latitude:string;
    longitude:string;
}

const DynamicMap=({latitude,longitude}:DynamicMapProps)=>{
    const kakaoMapRef=useRef<HTMLDivElement>(null)

    
    useEffect(()=>{
        if (!kakaoMapRef.current){
            return 
        }
        const targetPoint=new kakao.maps.LatLng(Number(latitude),Number(longitude))
        const options={
            center:targetPoint,
            level:3
        }
        const backgroundMap =new window.kakao.maps.Map(kakaoMapRef.current,options)
        const markerPosition= new kakao.maps.LatLng(Number(latitude),Number(longitude))
        const marker = new kakao.maps.Marker({position:markerPosition})
        marker.setMap(backgroundMap)
    
    
    }
    
    
    
    ,[])

    return(
        <div className={styles.div1}>
            <div className={styles.div2} ref={kakaoMapRef}/>
        </div>
    )
}
export default DynamicMap