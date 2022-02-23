import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { actions } from '../../../redux/profile-reducer';
import { recievePosts } from '../../../redux/selectors/profile-selectors';
import { IPostType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';
import { AddPostActionType } from '../../../redux/profile-reducer';

type PropsType = {
    posts: Array<IPostType>
    addPost: (newPostText: string) => AddPostActionType
}

class MyPostsContainer extends PureComponent<PropsType> {
    /* shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState;
    } */
    render() {
        return (
            <MyPosts addPost={this.props.addPost}
                     posts={this.props.posts}
            />
        )
    }    
}

type MapStatePropsType = {
    posts: Array<IPostType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    posts: recievePosts(state)            
})

type MapDispatchPropsType = {
    addPost: (newPostText: string) => AddPostActionType
}

const { addPost } = actions;

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    { addPost } )(MyPostsContainer);
