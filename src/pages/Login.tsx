import { signInWithEmailAndPassword } from 'firebase/auth';
import {authService} from '../fbase.tsx'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
function Login(){
    // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    // console.log(isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        console.log('Email:',email)
        console.log('Password:',password)
        
        try{
            const userCredential=await signInWithEmailAndPassword(authService,email,password)
            const user=userCredential.user
            
            console.log('Logged in user:',user)
            
            //--글 등록할때 로그인했음에도 불구하고 새로고침하고 글을 등록하면 로그인이 안됐다고 착각해서 그거 해결하려고 쓰는 세션 스토리지
            sessionStorage.setItem('user',JSON.stringify(user))
            
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>로그인</h1>
                <div className={styles.IdPass}>
                    <div > <input type="email" className={`${styles.input} ${styles.inputTop}`} id="LogInEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='아이디(이메일)' /> </div>
                    <div > <input type="password" className={`${styles.input} ${styles.inputBottom}`} id="LogInPassword" value={password} onChange={(e) => setPassword(e.target.value)}placeholder='비밀번호(6자리이상)' /> </div>
                </div>

                <button type="submit" className={styles.submit} id="LogInButton">로그인</button>

                <Link to='/users/new-user' style={{ textDecoration: "none" }}><div className={`${styles.button} ${styles.buttonTop}`}>회원가입 하러 가기</div></Link> 
                <Link to='/users/googleLogin' style={{ textDecoration: "none" }}><div className={`${styles.button} ${styles.buttonBottom}`}>
                <img alt="파일:Google &quot;G&quot; Logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png" decoding="async" width="23" height="23" srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png 2x" data-file-width="706" data-file-height="720"/>
                    구글계정으로 로그인하기</div></Link>   
            </form> 
        </div>
    )
}
export default Login