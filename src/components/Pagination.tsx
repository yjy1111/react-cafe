import styles from './Pagination.module.css'
import React from 'react'
interface PaginationProps{
    itemsPerPage:number;
    totalItems:number;
    currentPage:number;
    paginate:(pageNumber:number)=>void
}

const Pagination:React.Fc<PaginationProps> =({itemsPerPage,totalItems,currentPage,paginate})=>{
    const pageNumbers = [] //총 페이지 개수 
    //itemsPerPage: 한 페이지에 있는 데이터 수
    //totalItems: 총 데이터 개수
    
    for (let i=1 ; i<=Math.ceil(totalItems/itemsPerPage);i++){
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            {pageNumbers.map((number)=>(
                <li key={number} className={styles.pageItem}>
                    <div className={styles.pageLink} onClick={()=> paginate(number)}>
                        {number}
                    </div>
                </li>
            ))}
        
        </ul>
    )
}

export default Pagination