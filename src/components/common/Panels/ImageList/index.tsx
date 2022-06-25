import React, { FC } from 'react';
import { itemData } from './data';
import { ImageListItemBar, ImageList, ImageListItem } from 'shared/ui';

export const TitlebarBelowImageList: FC = () => {
    return (
        <ImageList sx={{ width: 500, height: 450 }}>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
            <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                position="below"
            />
            </ImageListItem>
        ))}
        </ImageList>
    );
}
