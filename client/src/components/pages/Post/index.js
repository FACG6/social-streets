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
    axios.get(`/api/v1/post/${postType}`)
      .then(({ data: { data } }) => {
        if (!data.length)
          return this.setState({ error: `No ${postType} Posts Available` });
        const posts = data.map(post => {
          post.link = post.category.toLowerCase().replace(' and ', '-');
          return post;
        });
        this.setState({ posts })
      })
      .catch(err => {
        const { status } = err.response;
        const objError = {
          message: 'ERROR',
        }
        switch (status) {
          case 400:
            objError.description = 'Bad Request!';
            break;
          case 401:
            objError.description = 'Please Log in to your account!';
            break;
          default:
            objError.description = 'Oops, somthing went wrong. Try another time!';
        };
        notification.error(objError);
        if (status === 401) {
          //Redirect to login//
          // this.props.history.push('/login')
        }
      })
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
          type={postType}
          key={post.id}
          onClick={this.handleDelete}
        />
        )}
      </section>
    )
  }
}
