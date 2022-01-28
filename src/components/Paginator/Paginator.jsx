import React, { useState } from 'react';
import styles from './Paginator.module.scss';
import classNames from 'classnames';

const Paginator = ({totalUsersCount, pageSize, currentPage, changeCurrentPage, blockSize=20}) => {
    
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const blocksCount = Math.ceil(pagesCount / blockSize);
    const [blockNumber, setBlockNumber] = useState(1);
    
    let start = (blockNumber - 1) * blockSize + 1;
    let end = (blockNumber * blockSize) > pagesCount ? pagesCount : (blockNumber * blockSize);

    const pages = [];
    for (let i = start; i <= end; i++) {
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

    return (
        <div className={styles.paginatorWrapper}>
            <div className={styles.paginator}>
                <button onClick={handleStartClick}>start</button>
                <button onClick={handlePrevClick}>prev</button>
                <div className={styles.pages}>
                {pages.map(page => (
                    <span className={classNames(styles.pageNumber, {
                                [styles.selectedPage]:currentPage === page})} 
                          key={page} onClick={() => changeCurrentPage(page)}>
                        {page}
                    </span>
                ))}
                </div>
                <button onClick={handleNextClick}>next</button>
                <button onClick={handleLastClick}>end</button>
            </div>
        </div>  
    )
}

export default Paginator;
