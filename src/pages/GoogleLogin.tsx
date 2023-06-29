import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import {authService} from '../fbase.tsx'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
function GoogleLogin(){
    // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    // console.log(isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const onSocialClick=async(e:any)=>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try{
            await signInWithRedirect(authService,provider)
            navigate('/')
        }catch(error){
            console.log(error)
        }
        navigate('/')
        // const data = await signInWithPopup(authService, provider);
        // console.log('이거',data); // 로그인 정보
  };
    
    return(
        <div className={styles.login}>
        <form onSubmit={onSocialClick} >
            <h1 className={styles.googletitle}>
            <img alt="파일:Google &quot;G&quot; Logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png" decoding="async" width="30" height="30" srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png 2x" data-file-width="706" data-file-height="720"/>
            Google 로그인</h1>
            <br/>
            <div className={styles.subTitle}>처음이라면, 입력하시고 로그인 버튼을 누르면 계정이 등록되는것이기 때문에 이후에 한번 더 입력 부탁드려요</div>
            <div className={styles.IdPass}>
                <div> <input type="email" className={`${styles.input} ${styles.inputTop}`} id="LogInEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='구글 이메일' /> </div>
                <div> <input type="password" className={`${styles.input} ${styles.inputBottom}`} id="LogInPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='구글 비밀번호' /> </div>
            </div>
            <button  type="submit" className={styles.submit} id="LogInButton">로그인</button>
            <Link to='/users/new-user' style={{ textDecoration: "none" }}><div className={`${styles.button} ${styles.buttonTop}`}>회원가입 하러 가기</div></Link>   

        </form>
        
        </div>
    )
}
export default GoogleLogin