import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const Settings: FC = (props): JSX.Element => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export default withAuthNavigate(Settings);
