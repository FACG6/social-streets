import React, { Component } from 'react';
import axios from 'axios';
import PostButton from 'components/utils/PostButton'
import Post from 'components/utils/Post';
import './style.css'

class LivePosts extends Component {
  state = {
    livePosts: [],
    error: '',
  }

  componentDidMount() {
    //Mock Data for Testing the component//
    const livePosts = [
      { title: 'post 1', id: 1 },
      { title: 'post 2', id: 2 },
      { title: 'post 3', id: 3 },
      { title: 'post 4', id: 4 },
      { title: 'post 5', id: 5 },
      { title: 'post 6', id: 6 },
    ];
    this.setState({ livePosts });

    //fetch live posts
    axios.get('/api/v1/live-posts')
      .then(({ posts }) => this.setState({ livePosts: posts }))
      .catch(error => {
        if (error.status === 401) this.props.history.push('/');
        if (error.status === 500) this.setState({ error: 'Oops, something went wrong' });
      })
  }

  handleDelete = (id) => {
    const { livePosts } = this.state;
    //Testing Delete with Mock Data//
    const deletedPost = livePosts.findIndex(post => post.id === Number(id));
    this.setState((prevState) => {
      prevState.livePosts.splice(deletedPost, 1);
      return ({ livePosts: prevState.livePosts })
    })

    //Axios to delete post
    axios.delete('/api/v1/live-posts')
      .then(() => this.setState((prevState) => {
        const deletedPost = livePosts.findIndex(post => post.id === Number(id));
        prevState.livePosts.splice(deletedPost, 1);
        return { livePosts: prevState.livePosts }
      }))
      .catch(error => {
        if (error.status === 401) this.props.history.push('/');
        if (error.status === 500) this.setState({ error: 'Oops, something went wrong' });
      })
  }

  render() {
    const { error, livePosts } = this.state;
    return (
      <section className='live-posts'>
        {
          error ?
            <span className='live-posts-error'>{error}</span>
            : ''
        }
        <PostButton className='post-type--bold' postType='Live Posts' />
        {
          livePosts.length ?
            <div className='live-posts--container'>
              {
                livePosts.map(post => <Post
                  onClick={this.handleDelete}
                  postTitle={post.title}
                  key={post.id}
                  id={post.id}
                  postType='live'
                />
                )}
            </div>
            : ''
        }
      </section >
    )
  }
}

export default LivePosts;

