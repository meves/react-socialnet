import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { addPost } from '../../../redux/profile-reducer';
import { recievePosts } from '../../../redux/selectors/profile-selectors';
import { compose } from 'redux';

class MyPostsContainer extends PureComponent {
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

const mapStateToProps = (state) => {
    return {
        posts: recievePosts(state)
        
    }
}

export default compose( connect(mapStateToProps, { addPost }) )(MyPostsContainer);
