import { Alert } from '@mui/material';
import React, { FC } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

const Settings: FC = React.memo(() => {
    return (
        <div>
            <h1>Settings</h1>
            <Alert severity="error">The component is in development porocess!</Alert>
        </div>
    )
})

export default withAuthNavigate(Settings);
