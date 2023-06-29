import { useEffect, useState,  FormEvent } from "react";
import styles from './NewContent.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authService,dbService ,firebaseStorage } from "../fbase";
import {collection,addDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
//app : firebaseApp
//dbService : firebaseDb
//firebaseStorage : firebaseStorage

function NewContent(){
    const navigate=useNavigate()
    const modules={
        toolbar:[
            [{'header':[1,2,3,4,5,6,false]}],
            ['bold','italic','underline'],['strike','blockquote'],
            [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
            // ['link','image'],
            [{'align':[]},{'color':[]},{'background':[]}],
            ['clean']    
        ],
    }
    const [content, setContent] = useState("");
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    
    
    //이미지 추가 관련 코드
    const [imageUpload, setImageUpload] = useState<any>(""); // image file
    const [imageList,setImageList]=useState<string[]>([]) //이거는 아마 여러개 이미지 넣으려고 하는듯
    // const [image, setImage] = useState(""); // uploaded image url
   
    // const [images, setImages] = useState([]);// fetch images url data


    const addFile = (event:any) => {  //파일을 넣으때 발생
        event.preventDefault();
        const fileList = event.target.files; //아니면 그냥 event.target.files
        // console.log(fileList)
        setImageUpload(fileList)
        
    };

    useEffect(()=>{
        const checkedLoggedIn=async() =>{
            // const user = await authService.currentUser;
            const user = sessionStorage.getItem('user');
            setIsLoggedIn(user!==null);        
        }
        checkedLoggedIn();
    },[])

    useEffect(()=>{
        const uploadPic = async () =>{  //storage에 이미지를 넣어서 나중에 뺄 수 있게 해줌
       
        if(imageUpload==null) {
            // setImage("")
            return }
        // console.log(imageUpload)
        for (let i=0;i<imageUpload.length;i++){
            const imageRef=ref(firebaseStorage,`images/${imageUpload[i].name}`)
            
            await uploadBytes(imageRef,imageUpload[i]).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                    // setImage(url)
                    // console.log('이거 주소임',url)
                    
                })
            })
        }
     
    }
    if (imageUpload !== null) {
        uploadPic();
      }
    },[imageUpload])

    const handleSubmit = async (event:any) => {   //폼 제출할때 발생함 
        event.preventDefault(); 
        
        const user = authService.currentUser;
        const category = event.target.category.value;
        const address = event.target.address.value;
        const title = event.target.title.value;

        const latitude=event.target.latitude.value  //위도 추가
        const longitude=event.target.longitude.value  //경도 추가

        let imageUrl = imageList;
        // if (imageList[0].includes('https://firebasestorage.googleapis.com/v0/b/react-cafe-d170e.appspot.com/o/images%2Fundefined?')) {
        if (imageList.length==0) {
            imageUrl = [];
        }
        if (!category || !address || !title || !latitude || !longitude) {
            alert("모두 입력해주세요!");
            return;
        }

        console.log('여기에 사진들 주소떠야함',imageList)
        if(user){
            await addDoc(collection(dbService,'posts'),{
                userId: user.uid,
                userName: user.displayName,
                category: category,
                address: address,
                title: title,
                content: content,
               imageUrl:imageUrl,
                date: new Date(), //원래 하던 방법 글고 정렬만 순서대로 안되는거 빼곤 ㄱㅊ
                latitude:latitude,
                longitude:longitude,
                // date: Date.now()
                // 사용자 UID 저장
                // userEmail: user.email,
        })}
        alert('글이 등록되었습니다!')
        navigate('/')
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
                <br/>
                <input className={styles.input} id='latitude' type='text' placeholder="위도(latitude)를 입력해주세요! 카카오맵으로 보여요"></input>
                <br/>
                <input className={styles.input} id='longitude' type='text' placeholder="경도(longitude)를 입력해주세요! 카카오맵으로 보여요"></input>
                <div className={styles.editorContainer}>
                    <ReactQuill
                        modules={modules} 
                        value={content}
                        onChange={setContent}
                        placeholder="내용을 입력해주세요"
                        style={{ height: "300px",marginBottom:"60px" }}></ReactQuill>
                    
                </div>
                <input className={styles.file} type='file' id='fileUpload' onChange={addFile} multiple/>
                <span className={styles.fileNotice}>사진이 등록되는데 시간이 걸려요..조금만 기다려주세요</span>
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

