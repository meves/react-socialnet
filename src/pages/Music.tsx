import React, { FC } from 'react';

import VerticalTabs from 'components/Panels/TabPanel';
import { withAuthNavigate } from 'shared/hoc/withAuthNavigate';

import { Alert } from 'components';

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
