import {authService} from '../fbase.tsx'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {useState,useCallback} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styles from './NewUser.module.css'

function NewUser(){
    const navigate=useNavigate();
    const [newAccount,setNewAccount]=useState(false)
    // const [displayName, setDisplayName] = useState('');
    //메일,비밀번호,비밀번호 확인 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    //오류 메시지 상태 저장
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('')

    //유효성 검사
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false)
    // const router = useRouter() 

    const onChangeEmail=useCallback((e:any)=>{
        const emailRegex=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent=e.target.value
        setEmail(emailCurrent)
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ')
            setIsEmail(false)
          } else {
            setEmailMessage('올바른 이메일 형식이에요 : )')
            setIsEmail(true)}
    },[])

    const onChangePassword=useCallback((e:any)=>{
        const passwordRegex = /^.{6,}$/;
        const passwordCurrent=e.target.value
        setPassword(passwordCurrent)
        if (!passwordRegex.test(passwordCurrent)){
            setPasswordMessage('6자리 이상의 비밀번호를 입력해주세요')
            setIsPassword(false)
        }else{
            setPasswordMessage('안전한 비밀번호에요 :) ')
            setIsPassword(true)
        }
    },[])
    const onChangePasswordCheck=useCallback((e:any)=>{
        const passwordCheckCurrent=e.target.value
        setPasswordCheck(passwordCheckCurrent)
        if (password === passwordCheckCurrent) {
            setPasswordCheckMessage('비밀번호를 똑같이 입력했어요 : )')
            setIsPasswordCheck(true)
          } else {
            setPasswordCheckMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
            setIsPasswordCheck(false)
          }
    },[password])

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        
        try{
            let data 
            if(newAccount){
                data=await signInWithEmailAndPassword(authService,email,password);      
            }
            else{
                data=await createUserWithEmailAndPassword(authService,email,password)
                if (data && data.user) {
                    const [username] = email.split('@');
                    await updateProfile(data.user, { displayName:username });
                //     setDisplayName(data.user.displayName || ''); 
                  }
            }
            navigate('/')
            console.log(data)
        } catch(error){
            console.log(error)
        }
      
      };
    console.log(authService.currentUser)
    return(
        <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>회원가입</h1>
            <div><span className={styles.subtitle}> 아이디(이메일)</span> <input type="email" className={styles.input} id="signUpEmail"value={email} onChange={onChangeEmail} placeholder='예: xxxx@naver.com' /> </div>
            <div className={styles.message}>  {email.length>0 && <span className={`message ${isEmail ? 'success':'error'}`}>{emailMessage}</span>}</div>
            <div> <span className={styles.subtitle}>비밀번호</span> <input type="password" className={styles.input} id="signUpPassword" value={password} onChange={onChangePassword} placeholder='비밀번호를 입력해주세요' /> </div>
            <div className={styles.message}>{password.length > 0 && (
            <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
            )}</div>
            <div> <span className={styles.subtitle}>비밀번호 확인</span> <input type="passwordCheck" className={styles.input} id="signUpPasswordCheck" value={passwordCheck} onChange={onChangePasswordCheck} placeholder='비밀번호를 한번 더 입력해주세요'/> </div>
            <div className={styles.message}>{passwordCheck.length > 0 && (
            <span className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{passwordCheckMessage}</span>
            )}</div>
            <button type="submit" className={styles.submit} id="signUpButton">회원가입 하기</button>
            <Link to='/users/login' style={{ textDecoration: "none" }}><div className={styles.button}>로그인 하러 가기</div></Link>
        </form>
        
        </div>
    )
}
export default NewUser


