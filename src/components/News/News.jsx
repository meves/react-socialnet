import React from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const News = props => {
    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default withAuthNavigate(News);
