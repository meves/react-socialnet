import { Alert } from '@mui/material';
import React, { FC } from 'react';
import VerticalTabs from '../../components/common/Panels/Tabs';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';

export const Music: FC = React.memo(() => {
    return (
        <div>
            <h1>Music</h1>
            <Alert severity="error">The component is in development porocess!</Alert>
            <VerticalTabs/>
        </div>
    )
})

export default withAuthNavigate(Music);
