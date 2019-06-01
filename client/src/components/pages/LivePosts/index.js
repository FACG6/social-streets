import React, { Component } from 'react';
import PostButton from 'components/utils/PostButton'
import PostRow from 'components/utils/PostRow';
import './style.css'

class LivePosts extends Component {
  state = {
    livePosts: [],
    error: '',
  }

  componentDidMount() {
    //Mock Data for Testing the component//
    const livePosts = [
      { title: 'post 1', id: 1, type: 'event', category: 'Events and Festivals' },
      { title: 'post 2', id: 2, type: 'event', category: 'Events and Festivals'},
      { title: 'post 3', id: 3, type: 'event', category: 'Events and Festivals'},
      { title: 'post 4', id: 4, type: 'event', category: 'Events and Festivals' },
      { title: 'post 5', id: 5, type: 'public-service', category: 'Research' },
      { title: 'post 6', id: 6, type: 'public-service', category: 'Survery' },
    ];
    this.setState({ livePosts });
  }

  handleDelete = (id) => {
    const { livePosts } = this.state;
    //Testing Delete with Mock Data//
    this.setState({
      livePosts: livePosts.filter(post => post.id !== Number(id))
    });
  }

  render() {
    const { error, livePosts } = this.state;
    return (
      <section className='live-posts'>
        <span className='live-posts-error'>{error}</span>
        <PostButton className='post-type--bold' postType='Live Posts' />
        {
          livePosts.length ?
          <div className='live-posts--container'>
            {
              livePosts.map(post => <PostRow
                onClick={this.handleDelete}
                postTitle={post.title}
                key={post.id}
                id={post.id}
                postType='live'
                type={post.type}
                category={post.category}
              />
              )}
          </div>: ''
        }
      </section >
    )
  }
}

export default LivePosts;

