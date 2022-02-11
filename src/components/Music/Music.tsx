import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

export const Music: FC = (props): JSX.Element => {
    return (
        <div>
            <h1>Music</h1>
        </div>
    )
}

export default withAuthNavigate(Music);
