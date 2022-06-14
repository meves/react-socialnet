import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

export const Music: FC = React.memo(() => {
    return (
        <div>
            <h1>Music</h1>
            <div>The component is in development porocess</div>
        </div>
    )
})

export default withAuthNavigate(Music);
