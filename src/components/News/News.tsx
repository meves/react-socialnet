import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const News: FC = () => {
    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default withAuthNavigate(News);
