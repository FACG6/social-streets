import React, { Component } from 'react';
import axios from 'axios';
import { notification } from 'antd'

import PostButton from 'components/utils/PostButton';
import PostRow from 'components/utils/PostRow';
import './style.css';
export default class Post extends Component {
  state = {
    posts: [],
    error: '',
  }

  componentDidMount() {
    const { postType } = this.props;
    let allPosts;
    axios.get(`/api/v1/post/${postType}`)
      .then(({ data: { data } }) => {
        if (!data.length)
          return this.setState({ error: `No ${postType} Posts Available` });
        allPosts = data;
        console.log(allPosts)
      })
      .catch(err => {
        const { statusCode, error } = err;
        notification.error({
          message: "ERROR",
          description: error,
        })
        if (statusCode === 401) {
          this.props.history.push('/login')
        }
      })

    // const posts = allPosts.map(post => {
    //   post.link = post.category.toLowerCase().replace(' and ', '-');
    //   return post;
    // });
    this.setState({ posts: allPosts })
  }

  handleDelete = (id) => {
    const { posts } = this.state;

    //Testing Delete with Mock Data/
    this.setState({
      posts: posts.filter(post => post.id !== Number(id))
    });
  }

  render() {
    const { postType } = this.props;
    const { posts, error } = this.state;
    return (
      <section className='post-page--main'>
        <PostButton postType={`${postType} Posts`} />
        <span className='post-page--error'>{error}</span>
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
