import React from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';

const News = props => {
    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default compose( withAuthNavigate )(News);
