import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPosts} from '../ReduxStuff'
 class Postform extends Component {


state = {
    title:'',
    body:''
}

onChange = (e) => {
this.setState({
    [e.target.name]: e.target.value
});
}

onSubmit = (e) => {
    e.preventDefault();

    const post = {
        title: this.state.title,
        body: this.state.body
    }
    //call action
    this.props.createPosts(post);
}

render() {
        
    return (
    <div>
        <h1>Add post</h1>
        <form onSubmit = {this.onSubmit}>
            <div>
                <label>Title</label> <br/>
                <input name='title' type='text' value={this.state.title} onChange={this.onChange}></input>
            </div>

            <div>
                <label>Body</label> <br/>
                <textarea name='body' value={this.state.body} onChange={this.onChange} ></textarea>
            </div>
                <br/>
            <button type='submit'>Submit </button>

        </form>
    </div>
        )
    }
}

Postform.propTypes = {
    createPosts:PropTypes.func.isRequired
}

export default connect(null, {createPosts})(Postform)