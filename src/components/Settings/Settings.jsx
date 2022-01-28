import React from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const Settings = props => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export default withAuthNavigate(Settings);
