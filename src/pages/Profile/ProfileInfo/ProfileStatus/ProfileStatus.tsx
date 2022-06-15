import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../../../redux/reducers/profile-reducer';
import { recieveStatus } from '../../../../redux/selectors/profile-selectors';
import styled from 'styled-components';

const StatusWrapper = styled.div`
    margin-bottom: 2em;
    background-color: var(--bg-block);
`;

const StatusDisplay = styled.span`
    display: inline-block;
    width: 100%;
    padding: 0.5em 1em;
    font-size: 1rem;
    color: var(--light-text-color);
    &:hover {
        cursor: auto;
    }
`;

const StatusInput = styled.input`
    &:focus {
        width: 100%;
        padding: 0.5em 1em;
        border-radius: 0.3em;
        outline: none;
        font-size: 0.9rem;
    }
`;

export const ProfileStatus: FC = () => {
    const statusFromState = useSelector(recieveStatus);

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(statusFromState);
    
    const dispatch = useDispatch();
    useEffect(() => {
        setStatus(statusFromState)
    }, [statusFromState]);
    
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateUserStatus(status));
    }
    const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);        
    }    
    
    return (
        <StatusWrapper> 
        { !editMode 
            ?   <div>
                <StatusDisplay onDoubleClick={activateEditMode} 
                                title="double click to change status">
                    {statusFromState}
                </StatusDisplay>
            </div>
            : <div>
                <StatusInput onBlur={deactivateEditMode} 
                            value={status}
                            onChange={handleChangeStatus}
                            autoFocus 
                />
            </div> 
        }
        </StatusWrapper>
    )    
}
