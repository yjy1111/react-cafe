import { useEffect, useState, useMemo, FormEvent } from "react";
import styles from './NewContent.module.css'
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authService } from "../fbase";
import { dbService }  from "../fbase";
import { collection, addDoc } from 'firebase/firestore';

function NewContent(){
    const modules={
        toolbar:[
            [{'header':[1,2,3,4,5,6,false]}],
            ['bold','italic','underline'],['strike','blockquote'],
            [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
            ['link','image'],
            [{'align':[]},{'color':[]},{'background':[]}],
            ['clean']    
        ],
    }
    const [content, setContent] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [isLoggedIn, setIsLoggedIn]=useState(false)

    const addFile = (event:any) => {
        event.preventDefault();
        const fileList = event.target.files;
        const fileArray = Array.prototype.slice.call(fileList) as File[];
        setImages(fileArray);
    };

    useEffect(()=>{
        const checkedLoggedIn=async() =>{
            // const user = await authService.currentUser;
            const user = sessionStorage.getItem('user');
            setIsLoggedIn(user!==null);  
               
        }
        checkedLoggedIn();
    },[])
    const handleSubmit = async (event:any) => {
        event.preventDefault(); 
        
        const user = authService.currentUser;
        const category = event.target.category.value;
        const address = event.target.address.value;
        const title = event.target.title.value;
        // const content = event.target.content.value;
        // const delta = quill.getContents();
        // console.log(delta)
        // console.log("Category:", category);
        // console.log("Address:", address);
        // console.log("title:", title);
        // console.log("Content:", content);
        // console.log("Images:", images);
        // console.log('이용자',user)
        if(user){
            await addDoc(collection(dbService,'posts'),{
                userId: user.uid,
                userName: user.displayName,
                category: category,
                address: address,
                title: title,
                content: content,
                images: images,
                date: new Date()
                // date: Date.now()
                // 사용자 UID 저장
                // userEmail: user.email,
        })}
        alert('글이 등록되었습니다!')
        // const posts=collection(dbService,'posts')

    };
    const handleFormSubmit=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(isLoggedIn){
            handleSubmit(event)
        }else{
            alert("로그인이 필요합니다!")
        }
    }
    return (
        <div className={styles.content}>
            <h2 style={{color:'rgb(79, 110, 190)',paddingBottom:'10px',borderBottom:'1px solid rgb(79, 110, 190)',fontSize:'28px'}}>글쓰기</h2>
            <form onSubmit={handleFormSubmit}>
                <Category/>
                <br/>
                <input className={styles.input} id='address' type='text' placeholder="카페 주소를 입력해주세요"></input>
                <br/>
                <input className={styles.input} id='title' type='text' placeholder="카페이름을 입력해주세요"></input>
                <div className={styles.editorContainer}>
                    <ReactQuill
                        modules={modules} 
                        value={content}
                        onChange={setContent}
                        placeholder="내용을 입력해주세요"
                       
                        style={{ height: "300px",marginBottom:"60px" }}></ReactQuill>
                    
                </div>
                <input className={styles.file} type='file' id='fileUpload' onChange={addFile} multiple/>
                <br/>
                <input className={styles.button} type='submit'></input>
            </form>
        </div>
    )

}
export default NewContent


function Category(){
    return(
        <select className={`${styles.input} ${styles.category}`} name='category'>
            <option value="none">===주제 선택====</option>
            <option value="dessert">디저트</option>
            <option value="study">공부</option>
            <option value="big">대형</option>
            <option value="view">풍경</option>
            <option value="goodcoffee">커피맛집</option>
            <option value="withpet">애견동반</option>
        </select>
    )
}

