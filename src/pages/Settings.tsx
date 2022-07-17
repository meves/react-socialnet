import React, { FC } from 'react';
import { withAuthNavigate } from 'shared/hoc/withAuthNavigate';
import { Alert } from 'components';

const Settings: FC = React.memo(() => {
    return (
        <div>
            <h1>Settings</h1>
            <Alert severity="error">The component is in development porocess!</Alert>
        </div>
    )
})

export default withAuthNavigate(Settings);
