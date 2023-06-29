import styles from '../pages/Post.module.css'
import { dbService } from '../fbase';
import {getFirestore,collection,doc,getDocs,deleteDoc,updateDoc,addDoc,where,query,orderBy} from 'firebase/firestore'
import { useEffect,useState } from 'react';

interface ReplyPartProps {
    postId: string | undefined;
    parsedData: any;
  }

  interface ReplyData {
    id: string;
    replyContent?: string;
    // replyDate?:string;
    replyDate?:{
      seconds:number;
    };
    replyUserName?:string;
 
  }
function ReplyPart({ postId, parsedData}:ReplyPartProps){
    const [data,setData]=useState<ReplyData[] | null>(null)  
    const [updatedContent, setUpdatedContent] = useState<string>('');
    const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null); // 선택된 댓글의 ID

    const db = getFirestore();
    // console.log('postId',postId)
    // console.log('로그인 안된경우 넘어옴',parsedData) //undifiend 뜸

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const replyContent = event.target.replyContent.value;
        const newReply = {
          replyContent: replyContent,
        };
        try {
          const docRef = await addDoc(collection(dbService, 'reply'), {
            postId: postId,
            replyUserId: parsedData.uid,
            replyUserName: parsedData.displayName,
            replyContent: replyContent,
            replyDate: new Date(),
          });
          const newReplyData = {
            id: docRef.id,
            ...newReply,
          };
        //   setData((prevData) => (prevData ? [...prevData, newReplyData] : [newReplyData]));
          setData((prevData) => (prevData ? [...prevData, newReplyData] : [newReplyData]));
          alert('댓글이 등록되었습니다!');
          event.target.replyContent.value = '';
    
          fetchData(); // 새로운 댓글을 가져오기 위해 fetchData 함수 호출
        } catch (error) {
          console.log(error);
        }
      };
      
      const fetchData = async () => {
        try {
          const q = query(collection(dbService, 'reply'), where('postId', '==', postId),orderBy('replyDate','asc'));
          const querySnapshot = await getDocs(q);
          const newData = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
            ...doc.data()
            };
          });
          setData(newData);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [postId]);
    
    if (data === null) {
        // 데이터를 가져오는 동안 로딩 상태를 표시할 수 있습니다.
        return <div>Loading...</div>;
      }
    const onDelete=async(e:string)=>{
        const ok=window.confirm('댓글을 삭제하시겠습니까?')
        if (ok){
            const postRef = doc(dbService, `reply/${e}`);
            await deleteDoc(postRef);   
            setData((prevData) => prevData?.filter((item) => item.id !== e) as ReplyData[] | null);
        }
    }
    const onUpdate=async(e:string)=>{
        console.log('제출하기!')
        setSelectedReplyId(null);
        const docRef = doc(collection(db, 'reply'), e);
        await updateDoc(docRef, {
            replyContent: updatedContent
          });
          setData(prevData => {
            if (prevData) {
              const updatedData = prevData.map(item => {
                if (item.id === e) {
                  return {
                    ...item,
                    replyContent: updatedContent
                  };
                }
                return item;
              });
              return updatedData;
            }
            return prevData;
          });
    }

    
    // console.log('댓글데이터',data)
    return (       
        <div className={styles.replyArea}>
                <div className={styles.replyTop}>
                  댓글 <span>{data.length}</span>
                </div>

                <div className={styles.replyedLists}> {/* 여기는 쓴 댓글모음집 */}
                    {data.map((item,idx)=>(
                            <div key={idx} className={`${styles.replyedList} ${parsedData && parsedData.displayName === item.replyUserName ? styles.myReply : ''}`}>                           
                                
                                <div className={`${styles.listEx} ${styles.replyUserName} `}>{item.replyUserName}</div> {/* 댓글 단 사람 ID */}
                                {item.id === selectedReplyId ? (
                                    <textarea 
                                        className={styles.updatingReply}
                                        value={updatedContent || item.replyContent}
                                        onChange={(e) => setUpdatedContent(e.target.value)}
                                    />
                                    ) : (
                                    <div className={`${styles.listEx} ${styles.replyContent}`}>{item.replyContent}</div>
                                    )
                                }
                                <div className={styles.listExBottom}>
                                {/* <div className={`${styles.listEx} ${styles.replyDate}`}>{new Date(item.replyDate?.seconds ?? 0 * 1000).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'  })}</div> */}
                                <div className={`${styles.listEx} ${styles.replyDate}`}>{item.replyDate?.seconds ? new Date(item.replyDate.seconds * 1000).toLocaleDateString() : ''}</div>
                                
                                {parsedData && parsedData.displayName === item.replyUserName && (
                                    <div className={styles.replyDeleteAndUpdate}>
                                        {item.id === selectedReplyId ? (
                                        <>
                                            <div className={styles.replyCancel} onClick={() => setSelectedReplyId(null)}>취소</div>
                                            <div className={styles.replySubmit} onClick={() => onUpdate(item.id)}>제출</div>
                                        </>
                                        ) : (
                                            <>
                                                <div className={styles.replyDelete} onClick={()=>onDelete(item.id)}>삭제</div>
                                                <div className={styles.replyUpdate} onClick={() => setSelectedReplyId(item.id)}>수정</div>
                                            </>
                                        )}
                                    </div>
                                    )} 
                                </div>
                                
                            
                            </div> 
                    ))  } 
                </div>  



                {/* 여기부터는 댓글내가 직접쓰기 */}
                {parsedData!==undefined && ( 
                    <form onSubmit={handleSubmit}>
                    
                        <div className={styles.replyingPart}> {/*로그인한 본인이 댓글 쓰는 곳   */}
                            <div className={styles.replyingPartTop}>
                                <div className={styles.loggedInUser}>
                                    {parsedData.displayName}
                                    {/* {parsedData?.displayName||'익명'} */}
                                </div>
                                <input className={styles.button} type='submit'></input>
                            </div>
                        {/* <input type='textarea' className={styles.replyingText}></input> */}
                            <textarea 
                                id='replyContent' 
                                placeholder="여기에 댓글을 달아주세요!" 
                                className={styles.replyingText}
                                // value={updatedContent}
                                // onChange={(e) => setUpdatedContent(e.target.value)}
                                ></textarea>
                        </div>
                    </form>
                 )} 
        </div>
    )                 
} 

export default ReplyPart