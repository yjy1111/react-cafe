import styles from './Header.module.css'

import { Link} from 'react-router-dom';
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

    useEffect(()=>{
        const unsubscribe=authService.onAuthStateChanged((user)=>{
            if (user){
                setIsLogged(true)
                setUserDisplayName(user.displayName || '');
                
            }else{
                setIsLogged(false)
                setUserDisplayName('');
            }
        })
        return () =>{
            unsubscribe();
        }
    },[])
    return (
        <div className={styles.header}>
        <Link to='/' className={styles.home}>
            Home
        </Link>
    
        <div className={styles.menus}>
            {menus.map((menu)=>{
                // <Tab 
                //     item={menu}
                //     key={`${idx}`}
                //     selected={name===menu.name}
                //     onClick={()=>setSelectedTabIdx(idx)}/>
                return(
                    <Link to={`/${menu.name}`} key={menu.name} className={styles.menu}>
                        {menu.title}
                    </Link>
                )
                }
            )}
            
        </div>
        <Search/>
        
        <div >
            
            { isLogged==true? 
                <div className={styles.logged}>
                    <div className={styles.greeting}><span className={styles.user}>{userDisplayName}</span>님, 안녕하세요!</div>
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
    )
}
// function Tab({item,selected,onClick}){
//     return (
//         <Link to={`/${item.name}`} key={item.name} onClick={onClick}
//         className={cx(styles.tab,{[styles.selected]: selected})}>
      
//               {item.title}
            
//         </Link>
//     )
// }