import React, { FC } from 'react';

import { TitlebarBelowImageList } from 'components/Panels/ImageList/ImageList';
import { withAuthNavigate } from 'shared/hoc/withAuthNavigate';

import { Alert } from 'components';

const Gallery: FC = () => {
    return (
        <div>
            <h2>Gallery</h2>
            <Alert severity="error">The component is in development porocess!</Alert>
            <TitlebarBelowImageList/>
        </div>
    )
}

export default withAuthNavigate(Gallery);
