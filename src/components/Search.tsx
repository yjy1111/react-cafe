import styles from './Search.module.css'
import {collection, query, where, getDocs , orderBy, getFirestore ,QuerySnapshot,onSnapshot} from 'firebase/firestore'
import { dbService }  from "../fbase";
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'

export default function Search() {
    const navigate=useNavigate()
    const [searchValue,setSearchValue]=useState('')
    const [searchDataList,setSearchDataList]=useState<any[]>([]);  //카페이름을 이제 다 모아둔 리스트 
    const [filteredData,setFilteredData]=useState(searchDataList);

    console.log(searchValue) //뭘 검색창에 입력하는지 
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                //Firebase에서 'posts' 컬렉션에서 데이터 갖고옴 
                const querySnapshot = await getDocs(query(collection(dbService, 'posts')));
                const newData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        title: data.title,
                        id: doc.id
                    }});
                setSearchDataList(newData);
                 console.log(newData);
                }

                // const q= query(collection(dbService,'posts'))  원래 이거쓸랬는데 onSnapshot을 쓰니까 불필요한 호출이 너무 많이 일어남...
                // const unsubscribe=onSnapshot(q,(querySnapshot)=>{
                //     const newData=querySnapshot.docs.map((doc)=>(doc.data().title))
                //     setSearchDataList(newData)
                //     console.log(newData)
                // })
            catch(error){
                console.log(error)
            }
        } 
        fetchData()
    } 
    ,[])
    useEffect(()=>{
        if (searchValue === '') {
            setFilteredData([]);
        } else {
            setFilteredData(searchDataList.filter((item) => item.title.includes(searchValue)));
        }
    },[searchDataList,searchValue])

    const goToPost=(id:string)=>{
        console.log('이동하기')
        const path = `/product/${id}`;
        navigate(path);
    }

    return (
    <div className={styles.modal}>
    <input  
        type="text" 
        placeholder="검색"
        className={styles.search}
        onChange={(e)=> setSearchValue(e.target.value)}>
       {/* > */}
    </input>
    <div className={styles.searchItems}>
        {filteredData.map((data:any)=>{
            return <div
                    key={data.id}
                    className={styles.searchItem}
                    onClick={()=>goToPost(data.id)}>
                        {data.title}
                    </div>
                
        })}
    </div>
    </div>)
    }