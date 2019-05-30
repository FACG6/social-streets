import React, { Component } from 'react';
import axios from 'axios';
import PostButton from 'components/utils/PostButton'
import Post from 'components/utils/Post';
import './style.css'

class DraftPosts extends Component {
  state = {
    draftPosts: [],
    error: '',
  }

  componentDidMount() {
    //Mock Data for Testing the component//
    const draftPosts = [
      { title: 'draft 1', id: 1 },
      { title: 'draft 2', id: 2 },
      { title: 'draft 3', id: 3 },
      { title: 'draft 4', id: 4 },
      { title: 'draft 5', id: 5 },
      { title: 'draft 6', id: 6 },
    ];
    this.setState({ draftPosts });
  }

  handleDelete = (id) => {
    const { draftPosts } = this.state;
    //Testing Delete//
    const deletedPost = draftPosts.findIndex(post => post.id === Number(id));
    this.setState((prevState) => {
      prevState.draftPosts.splice(deletedPost, 1);
      return ({ draftPosts: prevState.draftPosts })
    });
  }

  render() {
    const { error, draftPosts } = this.state;
    return (
      <section className='draft-posts'>
        {
          error ?
            <span className='draft-posts-error'>{error}</span>
            : ''
        }
        <PostButton className='post-type--bold' postType='Draft Posts' />
        {
          draftPosts.length ?
            <div className='draft-posts--container'>
              {
                draftPosts.map(post => <Post
                  onClick={this.handleDelete}
                  postTitle={post.title}
                  key={post.id}
                  id={post.id}
                  postType='draft'
                />
                )}
            </div>
            : ''
        }
      </section >
    )
  }
}

export default DraftPosts;
