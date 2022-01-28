import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { addPost } from '../../../redux/profile-reducer';
import { recieveProfilePage } from '../../../redux/selectors';

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
        posts: recieveProfilePage(state)
        
    }
}

export default connect(mapStateToProps, { addPost })(MyPostsContainer);
