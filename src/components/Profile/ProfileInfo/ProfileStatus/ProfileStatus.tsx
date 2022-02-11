import React, { FC, useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void 
}

const ProfileStatus: FC<PropsType> = (props): JSX.Element => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
    const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);        
    }    
    return (
        <div> 
        { !editMode 
            ? <div>
                <span onDoubleClick={activateEditMode}>{props.status}</span>
              </div>
            : <div>
                <input onBlur={deactivateEditMode} 
                        value={status}
                        onChange={handleChangeStatus}
                        autoFocus />
              </div> 
        }
        </div>
    )    
}

export default ProfileStatus;
