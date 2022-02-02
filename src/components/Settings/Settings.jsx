import React from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';

const Settings = props => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export default compose( withAuthNavigate )(Settings);
