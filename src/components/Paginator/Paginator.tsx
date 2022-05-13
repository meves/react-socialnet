import React, { BaseSyntheticEvent, FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../styles/components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 0.4em 0.3em;
    background-color: var(--bg-color-light);
    border-radius: 0.3em;
`;

const Pagination = styled.div`
    width: 100%;
    overflow-x: hidden;
    display: flex;
    justify-content: space-evenly;
`;

const Pages = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
`;

const PageNumber = styled.span`
    font-size: 0.75rem;
    padding: 0.5em;
    cursor: pointer;
    transition: background-color 0.2s, font-weight 0.2s;

    &:hover {
        background-color: #fff;
        border-radius: 0.3em;
    }
`;

const SelectedNumber = styled(PageNumber)`
    font-weight: bold;
`;

const marginRight = css`
    margin-right: 0.3em;
`;
const StartButton = styled(Button)`
    ${marginRight}
`;

const marginLeft = css`
    margin-left: 0.3em;
`;
const EndButton = styled(Button)`
    ${marginLeft}
`;    

/**
 * * React Component Paginator
 */
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
    const handleClick = (event: BaseSyntheticEvent) => {
        changeCurrentPage(Number(event.target.innerText))
    }
    const pagesItems =  pages.map((page: number) => (
        currentPage === page ? 
        <SelectedNumber key={page}>
            { page }
        </SelectedNumber> :
        <PageNumber key={page}>
            { page }
        </PageNumber>
    ))
    return (
        <Wrapper>
            <Pagination>
                <StartButton onClick={handleStartClick}>start</StartButton>
                <Button onClick={handlePrevClick}>prev</Button>
                <Pages onClick={handleClick}>{ pagesItems }</Pages>
                <Button onClick={handleNextClick}>next</Button>
                <EndButton onClick={handleLastClick}>end</EndButton>
            </Pagination>
        </Wrapper>  
    )
}

export default Paginator;
