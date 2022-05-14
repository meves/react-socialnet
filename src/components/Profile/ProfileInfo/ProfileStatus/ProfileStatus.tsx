import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../../../redux/profile-reducer';
import { recieveStatus } from '../../../../redux/selectors/profile-selectors';
import styled from 'styled-components';

const StatusWrapper = styled.div`
    margin-bottom: 2em;
`;

const StatusDisplay = styled.span`
    background-color: var(--bg-color-light);
    font-size: 1rem;
    padding: 0.5em 1em;
    border-radius: 0.3em;
    display: inline-block;
    
    &:hover {
        cursor: auto;
    }
`;

const StatusInput = styled.input`
    &:focus {
        font-size: 0.9rem;
        outline: none;
        padding: 0.5em 1em;
        border-radius: 0.3em;
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
            ? <div>
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
