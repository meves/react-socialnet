import React from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

export const Music = props => {
    return (
        <div>
            <h1>Music</h1>
        </div>
    )
}

export default withAuthNavigate(Music);
