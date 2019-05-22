import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPosts} from '../ReduxStuff'
import PropTypes from 'prop-types';

 class Posts extends Component {
   //no longer need state, redux store is managing the state!
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost)
        }
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id} style = {postStyle}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
                
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost:PropTypes.object.isRequired
}

const postStyle = {
    backgroundColor: 'lightGrey'
} 

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});
export default connect(mapStateToProps, {fetchPosts})(Posts);