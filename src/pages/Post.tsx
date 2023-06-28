//각각의 글과 댓글보기
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { dbService,firebaseStorage } from '../fbase';
import {collection,doc,getDoc,deleteDoc,addDoc} from 'firebase/firestore'
import { authService } from '../fbase';
import styles from './Post.module.css'
import { useNavigate } from 'react-router-dom'
import Map from '../components/Map'
import DynamicMap from '../components/DynamicMap'
// import { ref} from "firebase/storage";

import ReplyPart from '../components/ReplyPart'
const CategorySwitch:any={
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
    userId:string;
    userName:string;
    address:string;
    imageUrl:[];
    latitude:string; //위도경도 추가
    longitude:string;   //위도경도 추가
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
    const navigate=useNavigate()
    // console.log(category)//해당 고유 글 id에 해당 
    const [postData, setPostData] = useState<PostData | null>(null);
    const [currentId,setCurrentId]=useState('')  //현재 로그인한 사람의 정보
    const [isLogged, setIsLogged] = useState(false);
    
    // const imageListRef=ref(firebaseStorage,'images/')


    const loggedInUser=sessionStorage.getItem('user')
    let parsedData:any;
    if (loggedInUser !== null) {
        parsedData = JSON.parse(loggedInUser);
    }
    useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
        if (user) {
        setIsLogged(true);
        setCurrentId(user.uid); // 로그인된 사용자의 userId 설정
        } else {
        setIsLogged(false);
        setCurrentId(''); // 로그인된 사용자가 없는 경우 빈 문자열로 설정
        }
    });

    return () => {
        unsubscribe();
    };
    }, []);

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
    const { title, content, date, userName, userId, address,imageUrl,latitude,longitude } = postData;
    const categoryValue=CategorySwitch[category as keyof typeof CategorySwitch]

    const onDelete=async()=>{
        const ok=window.confirm('글을 삭제하시겠습니까?')
        if (ok){
            const postRef = doc(dbService, `posts/${id}`);
            await deleteDoc(postRef);   
            navigate(`/${category}`)
        }
    }

    const onUpdate=()=>{
        const path=`/${category}/${id}/updateContent`
        navigate(path,{state:{postData}})
    }


    interface ReplyPartProps {
        postId: string | undefined;
        parsedData: any;
        
      }
    const replyPartProps: ReplyPartProps = {
        postId: id,
        parsedData:parsedData,
        
      };
      console.log('로그인 안된경우!!',parsedData)
    return (
    <div className={styles.wrapper}>
        <div className={styles.category}>{categoryValue}</div>
        <div className={styles.wrapperTwo}>       
            <div className={styles.contentArea}>        
                <div className={styles.title}>[ {address.split(' ')[0]} ] {title}  </div>
                <div className={styles.userInfo}>
                    <div className={styles.userPic}></div>
                    <div className={styles.userName}>{userName}</div>
                    <div className={styles.date}>{new Date(date?.seconds * 1000).toLocaleDateString()}</div>
                </div>    
                <div className={styles.contentArea}>         
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html:content}} />
                    <div className={styles.pictureList}>
                        {imageUrl.length> 0 &&
                            imageUrl.map((item) => {
                            return <img className={styles.picture} key={item} src={item} />;
                            })}
                    </div>
                    <div className={styles.mapArea}>
                        <div className={styles.mapAreaTitle} >카페 위치</div>
                        <Map>
                            <DynamicMap latitude={latitude} longitude={longitude}/>
                        </Map>
                    </div>
                </div>  
                {currentId===userId &&(
                <div className={styles.deleteAndUpdate}>
                    <div className={styles.delete} onClick={onDelete}>삭제</div>
                    <div className={styles.update} onClick={onUpdate}>수정</div>
                </div>)}

            </div>
            {/* {parsedData!==undefined &&(
                <ReplyPart {...replyPartProps}/>
            )} */}
            <ReplyPart {...replyPartProps}/>
            {/* <ReplyPart parsedData={parsedData} postId={id}/> */}
            {/* <div className={styles.replyArea}>
                <div className={styles.replyTop}>댓글</div>
                <div className={styles.replyedLists}></div>  이제 적힌 댓글 모아서 보여주는 곳  
                {parsedData && (
                <form onSubmit={handleSubmit}>
                    
                    <div className={styles.replyingPart}> 로그인한 본인이 댓글 쓰는 곳  
                        <div className={styles.replyingPartTop}>
                            <div className={styles.loggedInUser}>
                                {parsedData.displayName}
                               
                                </div>
                            <input className={styles.button} type='submit'></input>
                        </div>
                    
                        <textarea id='replyContent' placeholder="여기에 댓글을 달아주세요!" className={styles.replyingText}></textarea>
                    </div>
                </form>
                 )}
                
            </div> */}
        </div>
    </div>)
}

export default Post

