import styles from './Search.module.css'
export default function Search() {
    return (
    <>
    <input  
        type="text" 
        placeholder="검색"
        className={styles.search}>
    </input>
    </>)
    }