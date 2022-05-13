import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../../../redux/profile-reducer';
import { recieveStatus } from '../../../../redux/selectors/profile-selectors';
import styles from './ProfileStatus.module.scss';

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
        <div className={styles.statusInputWrapper}> 
        { !editMode 
            ? <div className={styles.statusWrapper}>
                <span onDoubleClick={activateEditMode} className={styles.status} title="double click to change status">
                    {statusFromState}
                </span>
              </div>
            : <div className={styles.inputWrapper}>
                <input onBlur={deactivateEditMode} 
                        value={status}
                        onChange={handleChangeStatus}
                        autoFocus />
              </div> 
        }
        </div>
    )    
}
