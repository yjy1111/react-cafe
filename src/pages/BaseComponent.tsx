///dessert/ 글 목록 불러오기 
import styles from './BaseComponent.module.css'
import { useEffect,useState } from 'react';
import {collection, query, where, getDocs , orderBy} from 'firebase/firestore'
import { dbService }  from "../fbase";
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'
// import Search from '../components/Search';
interface BaseData {
    id: string;
    title?: string | undefined;
    address?: string | undefined;
    userName?: string | undefined;
    content?: string | undefined;
    date?: { seconds: number } | undefined;
  }
  
const CategorySwitch:Record<string,string>={
    dessert:'디저트',
    study:'공부',
    big:'대형',
    view:'풍경',
    goodcoffee:'커피맛집',
    withpet:'애견동반'
} 

function BaseComponent ({category}: { category: string }){
    const categoryValue=CategorySwitch[category as keyof typeof CategorySwitch]
    // const [data,setData]=useState<null | { id: string; title: string; date: string; content: string }[]>(null)
    const [data,setData]=useState<BaseData[]|null>(null)
    const navigate=useNavigate()

    const [currentPage,setCurrentPage]=useState(1) //페이지ㅇ네이션
    
    const itemsPerPage=10;

    function handleContentClick(e:string){
        console.log(e)
        // window.open(`/${category}/${e}`, '_self');
        const path=`/${category}/${e}`
        navigate(path)
    }

    function truncateText(text:string, maxLength:number) {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      }

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                // console.log('이거뜨나?')
                // console.log(category)
                const q= query(collection(dbService,'posts'),where("category",'==',category),orderBy('date','desc'))
                const querySnapshot=await getDocs(q)
    
                const newData=querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                     ...doc.data()
                    }))
                // console.log(newData)
                setData(newData)
            } catch(error){
                console.log(error)
            }
        } 
        fetchData()
    } 
    ,[category])
    if (data === null) {
        // 데이터를 가져오는 동안 로딩 상태를 표시할 수 있습니다.
        return <div>Loading...</div>;
      }

    //페이지네이션을 위해 데이터를 잘라주기
    const onePaginatedData=()=>{
        const startIndex=(currentPage-1)*itemsPerPage;
        const endIndex=startIndex+itemsPerPage;
        return data.slice(startIndex,endIndex)
    }
    const paginate=(pageNumber:number)=> setCurrentPage(pageNumber)//페이지네이션
    return(
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.h1}>{categoryValue}</div>
                {/* <Search/> */}
            </div>
           
            <div className={styles.listsArea}>
                <div className={styles.lists}>
                    <div className={`${styles.listEx} ${styles.listTitle}`}>지역</div>
                    <div className={`${styles.listEx} ${styles.listTitle}`}>카페이름</div>
                    <div className={`${styles.listEx} ${styles.listTitle}`}> 내용 </div>
                    <div className={`${styles.listEx} ${styles.listTitle}`}> 작성자 </div>
                    <div className={`${styles.listEx} ${styles.listTitle}`}> 작성일 </div>
                </div>

                {onePaginatedData().map((item,idx) => (
                <div key={idx} className={styles.lists}>
                    <div className={styles.listEx}> {item.address?.split(' ')[0]}</div>
                    <div className={styles.listEx}>{item.title}</div>
                    <div  className={styles.listEx} onClick={()=>handleContentClick(item.id)} dangerouslySetInnerHTML={{ __html: truncateText(item.content||'', 20) }} />
                    <div className={styles.listEx}>{item.userName}</div>
                    <div className={styles.listEx}>{item.date?.seconds ? new Date(item.date.seconds * 1000).toLocaleDateString() : ''}</div>
                </div>    
                ))} 
            </div>
            <Pagination itemsPerPage={itemsPerPage}
                        totalItems={data.length}
                        currentPage={currentPage}
                        paginate={paginate}/>
        </div>
    )
    
}

export default BaseComponent