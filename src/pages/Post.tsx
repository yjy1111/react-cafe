import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { dbService } from '../fbase';
import {collection,doc,getDoc} from 'firebase/firestore'

import styles from './Post.module.css'


const CategorySwitch: any={
    dessert:'디저트',
    study:'공부',
    big:'대형',
    view:'풍경',
    goodcoffee:'커피맛집',
    withpet:'애견동반'
} as const

type categoryType= typeof CategorySwitch[keyof typeof CategorySwitch]

interface PostData {
    title: string;
    content: string;
    date: string;
  }

async function fetchPostData(id:string): Promise<PostData | null>{
    const postRef=doc(collection(dbService,'posts'),id)
    const postDoc=await getDoc(postRef)
    if (postDoc.exists()) {
        const postData = postDoc.data();
        console.log(postData);
        return postData as PostData
      } else {
        // 문서가 존재하지 않을 때 처리
        console.log('문서를 찾을 수 없습니다.');
        return null
      }
    
}
function Post(){
    const { id , category } = useParams(); 
    
    console.log(category)//해당 고유 글 id에 해당 
    const [postData, setPostData] = useState<PostData | null>(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const data=await fetchPostData(id)
            if (data){
                setPostData(data)
            }
            
            }
            fetchData()
        } 
    ,[id])
    if (!postData){
        return <div>Loading</div>
    }
    const { title, content, date,userName,address } = postData;
    const categoryValue=CategorySwitch[category as keyof typeof CategorySwitch]
    return (
    <div className={styles.wrapper}>
        <div className={styles.category}>{categoryValue}</div>
            {/* {id} */}
        <div className={styles.wrapperTwo}>
        
            <div className={styles.contentArea}>
        
                <div className={styles.title}>[ {address.split(' ')[0]} ] {title}  </div>
                <div className={styles.userInfo}>
                    <div className={styles.userPic}></div>
                    <div className={styles.userName}>{userName}</div>
                    <div className={styles.date}>{new Date(date?.seconds * 1000).toLocaleDateString()}</div>
                </div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html:content}} />
            </div>
            <div className={styles.replyArea}>
                <div className={styles.replyTop}>댓글</div>
            </div>
        </div>
    </div>)
}

export default Post