import React, { FC, useState } from 'react';
import styles from './Paginator.module.scss';
import classNames from 'classnames';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    blockSize: number
    changeCurrentPage: (currentPage: number) => void
}

const Paginator: FC<PropsType> = ({totalUsersCount, pageSize, currentPage, changeCurrentPage, blockSize}): JSX.Element => 
{   
    const pagesCount: number = Math.ceil(totalUsersCount / pageSize);
    const blocksCount: number = Math.ceil(pagesCount / blockSize);
    const [blockNumber, setBlockNumber] = useState(1);
    
    let start: number = (blockNumber - 1) * blockSize + 1;
    let end: number = (blockNumber * blockSize) > pagesCount ? pagesCount : (blockNumber * blockSize);

    const pages: Array<number> = [];
    for (let i: number = start; i <= end; i++) {
        pages.push(i);
    }

    const handleStartClick = () => {
        setBlockNumber(1);
    }
    const handlePrevClick = () => {
        if (start > 1) {
            setBlockNumber(blockNumber - 1);
        }
    }
    const handleNextClick = () => {
        if (blockNumber < blocksCount)
        setBlockNumber(blockNumber + 1);
    }
    const handleLastClick = () => {
        setBlockNumber(blocksCount);
    }
    const pagesItems: Array<JSX.Element> =  pages.map((page: number): JSX.Element => (
        <span className={classNames(styles.pageNumber, {
                    [styles.selectedPage]:currentPage === page})} 
              key={page} onClick={() => changeCurrentPage(page)}>
            {page}
        </span>
    ))
    return (
        <div className={styles.paginatorWrapper}>
            <div className={styles.paginator}>
                <button className={`button ${styles.start}`} onClick={handleStartClick}>start</button>
                <button className="button" onClick={handlePrevClick}>prev</button>
                <div className={styles.pages}>
                { pagesItems }
                </div>
                <button className="button" onClick={handleNextClick}>next</button>
                <button className={`button ${styles.end}`} onClick={handleLastClick}>end</button>
            </div>
        </div>  
    )
}

export default Paginator;
