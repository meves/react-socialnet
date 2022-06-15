import { Alert } from '@mui/material';
import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const News: FC = React.memo(() => {
    return (
        <div>
            <h1>News</h1>
            <Alert severity="error">The component is in development porocess!</Alert>
        </div>
    )
})

export default withAuthNavigate(News);
