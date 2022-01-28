import React from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { maxLength300, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';

const NewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  component={Textarea} name="newPost"
                        placeholder="print your post here..." 
                        cols="40" rows="7"
                        validate={[required, maxLength300]} />
            </div>
            <div className={styles.btnBlock} >
                <button>
                    Add new post
                </button>
            </div> 
        </form>
    )
}

const PostFormRedux = reduxForm({form: 'postForm'})(NewPostForm);

const MyPosts = props => {    
    const postsItems = [...props.posts].reverse().map(post => (
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    )) 
    const onAddPost = formData => {
        props.addPost(formData.newPost);
    }
    return (       
            <div className={styles.postsBlock}>
                <h2 className={styles.heading}>New post</h2>
                <PostFormRedux onSubmit={onAddPost} />          
                <div className={styles.posts}>
                    {postsItems}
                </div>
            </div>         
        )
    }
    
    export default MyPosts;
    