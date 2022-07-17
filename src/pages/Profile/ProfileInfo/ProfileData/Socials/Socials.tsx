import React, { FC } from 'react';

import { SocialLink } from './SocialLink';
import { UserProfileType } from 'shared/types';

import styled from 'styled-components';
import { Stack, Typography } from 'components';

const Wrapper = styled.div`
    margin-top: 2em;
    padding: 0.5em 1em;
    color: var(--light-text-color);
    background-color: var(--bg-block);
`;

type PropsTypes = {
    profile: UserProfileType
}

export const SocialBlock: FC<PropsTypes> = React.memo((props) => {
    const items = [];
    for (let [key, value] of Object.entries(props.profile.contacts)) {
        items.push(<SocialLink key={key} linkName={key} linkValue={value}/>);       
    }
    return (
        <Wrapper>
            <Typography variant="h6">Social net links</Typography>
            <Stack direction="row" spacing={0}
                sx={{display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    listStyleType: 'none',
                    paddingLeft: '0'}}
            > { items } </Stack>
        </Wrapper>
    )
})
