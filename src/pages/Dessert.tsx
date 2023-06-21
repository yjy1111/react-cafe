// import styles from './Dessert.module.css'

// import {collection, query, where, getDocs} from 'firebase/firestore'
// import { dbService }  from "../fbase";
// async function BaseComponent ({category}: { category: string }){

//     const q= query(collection(dbService,'posts'),where("category",'==',category))
//     const querySnapshot=await getDocs(q)
    
//     querySnapshot.forEach((doc)=>{
//         console.log(doc.id,'=',doc.data())
//     })
//     return(
//         <div className={styles.wrapper}>
//             <div className={styles.top}>
//                 <div className={styles.h1}>{category}</div>
//                 <input className={styles.search} placeholder='검색 '></input>
//             </div>
//             <div className={styles.listsArea}>
//                 <div className={styles.listsEx}>
//                     <div className={styles.listEx}>지역</div>
//                     <div className={styles.listEx}>카페이름</div>
//                     <div className={styles.listEx}> 내용 </div>
//                     <div className={styles.listEx}> 작성자 </div>
//                     <div className={styles.listEx}> 작성일 </div>
//                 </div>
//                 <div className={styles.realList}>

//                 </div>
//             </div>
            
//         </div>
//     )
    
// }
import BaseComponent from "./BaseComponent"
function Dessert(){
    return(
        <BaseComponent category="dessert"/>
    )
}
export default Dessert