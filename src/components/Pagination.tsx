import styles from './Pagination.module.css'
import React from 'react'
interface PaginationProps{
    itemsPerPage:number;
    totalItems:number;
    currentPage:number;
    paginate:(pageNumber:number)=>void
}

const Pagination:React.Fc<PaginationProps> =({itemsPerPage,totalItems,currentPage,paginate})=>{
    //itemsPerPage: 한 페이지에 있는 데이터 수
    //totalItems: 총 데이터 개수
    const totalPages=Math.ceil(totalItems/itemsPerPage) //총 페이지 갯수
    const currentGroup =Math.ceil(currentPage/5)
    const startPage=(currentGroup-1)*5+1
    const endPage=Math.min(startPage+4,totalPages)

    const goToPreviousGroup=(groupNumber:number)=>{
        const page=(groupNumber-2)*5+1
        paginate(page)
    }
    const goToNextGroup=()=>{
        const page=currentGroup *5+1;
        paginate(page)
    }

    return (
        <ul className={styles.pagination}>
            {currentGroup>1 &&(
                <li className={styles.pageItem}>
                <div className={`${styles.pageLink} ${styles.btn}`} onClick={() => goToPreviousGroup(currentGroup)}>
                    <i className="bi bi-chevron-left"></i>
                </div>
            </li>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
                <li key={number} className={`${styles.pageItem} ${number === currentPage ? styles.active : ''}`}>
                <div className={styles.pageLink} onClick={() => paginate(number)}>
                    {number}
                </div>
                </li>
            ))}

            {currentGroup < Math.ceil(totalPages / 5) && (
                <li className={styles.pageItem}>
                    <div className={`${styles.pageLink} ${styles.btn}`} onClick={goToNextGroup}>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </li>
            )}
        
        </ul>
    )
}

export default Pagination