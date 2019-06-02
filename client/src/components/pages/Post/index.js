import React, { Component } from 'react';

import PostButton from 'components/utils/PostButton';
import PostRow from 'components/utils/PostRow';
import './style.css';
import { draft, live } from './postDetails'
export default class Post extends Component {
  state = {
    posts: [],
    error: '',
  }

  componentDidMount() {
    const { postType } = this.props;
    let allPosts;
    if (postType === 'draft') {
      allPosts = draft;
    } else {
      allPosts = live;
    }
    const posts = allPosts.map(post => {
      post.link = post.category.toLowerCase().replace(' and ', '-');
      return post;
    });
    this.setState({ posts })
  }

  handleDelete = (id) => {
    const { posts } = this.state;
    //Testing Delete with Mock Data//
    this.setState({
      posts: posts.filter(post => post.id !== Number(id))
    });
  }

  render() {
    const { postType } = this.props;
    const { posts, error } = this.state;
    return (
      <section className='post-page--main'>
        <span className='post-page--error'>{error}</span>
        <PostButton postType={`${postType} Posts`} />
        {posts.map(post => <PostRow
          {...post}
          key={post.id}
          onClick={this.handleDelete}
        />
        )}
      </section>
    )
  }
}
