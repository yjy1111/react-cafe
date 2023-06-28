import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import styles from './NewContent.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authService,dbService , app,firebaseStorage } from "../fbase";
import { getFirestore,updateDoc,doc,collection,addDoc,  } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";

function UpdateContent(){
    const { id } = useParams(); 
    const location=useLocation();
    const postData=location.state?.postData
    const [content,setContent]=useState("") //reactQuill 기본 글 설정
    const db = getFirestore();
    const navigate=useNavigate()
    const [imageUpload, setImageUpload] = useState<any>(""); // image file
    const [imageList,setImageList]=useState<string[]>([]) //이거는 아마 여러개 이미지 넣으려고 하는듯
    const [image, setImage] = useState("");

    useEffect(() => { ////reactQuill 기본 글 설정
        if (postData) {
            setContent(postData.content);
        }
    }, [postData]);

    const modules={
        toolbar:[
            [{'header':[1,2,3,4,5,6,false]}],
            ['bold','italic','underline'],['strike','blockquote'],
            [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
            // ['link','image'],
            // [ ],
            [{'align':[]},{'color':[]},{'background':[]}],
            ['clean']    
        ],
    }
    
    const addFile = (event:any) => {  //파일을 넣으때 발생
        event.preventDefault();
        const fileList = event.target.files; //아니면 그냥 event.target.files
        setImageUpload(fileList)
        
    };
    useEffect(()=>{
        const uploadPic = async () =>{  //storage에 이미지를 넣어서 나중에 뺄 수 있게 해줌
       
        if(imageUpload==null) {
            setImage("")
            return }
        console.log(imageUpload)
        for (let i=0;i<imageUpload.length;i++){
            const imageRef=ref(firebaseStorage,`images/${imageUpload[i].name}`)
            
            await uploadBytes(imageRef,imageUpload[i]).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                    console.log('이거 주소임',url)
                    
                })
            })
        }
     
    }
    if (imageUpload !== null) {
        uploadPic();
      }
    },[imageUpload])
    const handleSubmit = async (event:any) => {
        event.preventDefault(); 
        
        const category = event.target.category.value;
        const address = event.target.address.value;
        const title = event.target.title.value;
        
        let imageUrl = imageList;
        if (imageList.length==0) {
            imageUrl = [];
        }

        const docRef = doc(collection(db, 'posts'), id);
        await updateDoc(docRef, {
            category: category,
            address: address,
            title: title,
            content: content,
            imageUrl:imageUrl,
          });
       
        alert('글이 수정되었습니다!')
        navigate(`/${category}/${id}`)
        
    };
    const handleFormSubmit=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        handleSubmit(event)
    }
 
    return (
        <div className={styles.content}>
            <h2 style={{color:'rgb(79, 110, 190)',paddingBottom:'10px',borderBottom:'1px solid rgb(79, 110, 190)',fontSize:'28px'}}>글 수정하기</h2>
            <form onSubmit={handleFormSubmit}>
                <Category category={postData.category}/>
                <br/>
                <input className={styles.input} id='address' type='text' defaultValue={postData.address} placeholder={postData.address}></input>
                <br/>
                <input className={styles.input} id='title' type='text' defaultValue={postData.title} placeholder={postData.title}></input>
                <div className={styles.editorContainer}>
                    <ReactQuill
                        modules={modules} 
                        value={content}
                        onChange={setContent}
                        style={{ height: "300px",marginBottom:"60px" }}></ReactQuill>
                    
                </div>
                <input className={styles.file} type='file' id='fileUpload' onChange={addFile} multiple/>
                <span className={styles.fileAlert}>수정시 기존의 사진도 다시 선택해서 골라주세요</span>
                <br/>
                <input className={styles.button} type='submit' value="수정"></input>
            </form>
        </div>
    )
}
export default UpdateContent

function Category(props: { category: string }){
      return(
        <select className={`${styles.input} ${styles.category}`} name='category' defaultValue={props.category}>
            <option value="none">===주제 선택====</option>
            <option value="dessert" >디저트</option>           
            <option value="study" >공부</option>       
            <option value="big" >대형</option>
            <option value="view" >풍경</option>
            <option value="goodcoffee" >커피맛집</option>
            <option value="withpet" >애견동반</option>
        </select>
    )
}

