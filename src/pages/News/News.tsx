import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const News: FC = React.memo(() => {
    return (
        <div>
            <h1>News</h1>
            <div>The component is in development porocess</div>
        </div>
    )
})

export default withAuthNavigate(News);
