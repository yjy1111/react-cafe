// import styles from './Header.module.css'
import styles from './MediaQueryHeader.module.css'

import { Link,useLocation} from 'react-router-dom';
import Search from './Search.tsx'

import {authService} from '../fbase.tsx'
import { useState,useEffect } from 'react';
import LogOut from '../pages/LogOut.tsx';
export const menus=[
    {name:'dessert',title:'디저트'},
    {name:'study',title:'공부' },
    {name:'big',title:'대형'},
    {name:'view',title:'풍경'},
    {name:'goodcoffee',title:'커피맛집'  },
    {name:'withpet',title:'애견동반' },
]
export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [userDisplayName, setUserDisplayName] = useState('');
    
    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;
    const useryDisplayName = location.state?.useryDisplayName || '';



    //모달부분
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };
    //여기까지

    useEffect(()=>{
        const unsubscribe=authService.onAuthStateChanged((user)=>{
            if (user){
                setIsLogged(true)
                setUserDisplayName(user.displayName || '');
                sessionStorage.setItem('user',JSON.stringify(user))
            }else{
                setIsLogged(false)
                setUserDisplayName('');
            }
        })
        return () =>{
            unsubscribe();
        }
    },[isLoggedIn, useryDisplayName])
    return (
        <>
       {/* 사이드모달부분 */}
       <div className={`${styles.backDrop} ${isSideMenuOpen ? styles.backDrop : styles.notbackDrop}`} onClick={toggleSideMenu} ></div>
        <div className={`${styles.sideMenu} ${isSideMenuOpen ? styles.sideMenu : styles.notsideMenu}`}>
            {menus.map((menu)=>{
                            return(
                                <Link to={`/${menu.name}`} key={menu.name} className={styles.sideButton} onClick={toggleSideMenu}>
                                    {menu.title}
                                </Link>
                            )
                            }
                        )}

        </div>

       {/* 여기서부터 원래 Header */}
        <div className={styles.header}>
            <div className={styles.headerPart}>
            <div className={styles.sidePosition}>
                <i className="bi bi-list" onClick={toggleSideMenu}></i>
            </div> 
                <div className={styles.leftPosition}>
                    <Link to='/' className={styles.home}>
                        Home
                    </Link>
                
                    <div className={styles.menus}>
                        {menus.map((menu)=>{
                            return(
                                <Link to={`/${menu.name}`} key={menu.name} className={styles.menu}>
                                    {menu.title}
                                </Link>
                            )
                            }
                        )}
                        
                    </div>
                    <Search/>
                </div>
                <div className={styles.rightPosition}>
                    {/* <Search/> */}
                    <div >
                        { isLogged==true? 
                            <div className={styles.logged}>
                                <div className={styles.greeting}><span className={styles.user}>{userDisplayName}</span><span className={styles.removeSpan}>님, 안녕하세요!</span></div>
                                <Link to='/new-content' className={styles.write} style={{ textDecoration: "none" }}>
                                    <div>글쓰기</div>
                                </Link>
                                <LogOut/>
                            </div>:
                            <>
                                <Link to='/users/new-user' className={styles.right}>
                                    회원가입
                                </Link>
                                <Link to='/users/login' className={styles.right}>
                                로그인
                                </Link>
                            </>
                        }
                        
                    </div>
                </div>        
            
            </div>        
        </div>
        </>
    )
}
