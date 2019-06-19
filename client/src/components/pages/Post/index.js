import React, { Component } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Swal from 'sweetalert2';

import PostButton from 'components/utils/PostButton';
import PostRow from 'components/utils/PostRow';
import './style.css';
export default class Post extends Component {
  state = {
    posts: [],
    notification: '',
  }

  componentDidMount() {
    const { postType } = this.props;
    axios.get(`/api/v1/post/${postType}`)
      .then(({ data: { data } }) => {
        if (!data.length)
          return this.setState({ error: `No ${postType} Posts Available` });
        this.setState({ posts: data })
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const objError = { message: 'ERROR', description: error }
        statusCode
          ? notification.error(objError)
          : notification.error({ message: 'ERROR', description: 'Sorry, there is error' })
        if (statusCode === 401) this.props.history.push('/login');
      })
  }

  handleDelete = (id, type) => {
    const { posts } = this.state;
    axios.delete(`/api/v1/post/${id}`, { data: { type } })
      .then(({ data: { data } }) => {
        if (data.id === id) {
          notification.success({ message: 'Success', description: 'Deleted Successfully' });
          this.setState({ posts: posts.filter(post => post.id !== Number(id)) });
        }
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const objError = { message: 'ERROR', description: error }
        statusCode
          ? notification.error(objError)
          : notification.error({ message: 'ERROR', description: 'Sorry, there is error' });

        notification.error(objError);
        if (statusCode === 401) this.props.history.push('/login');
      })
  }

  deleteSwal = () => {
    return Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4d4d',
      cancelButtonColor: '#3085d6',
      customClass: {
        confirmButton: 'btn btn-delete',
      }
    });
  }

  render() {
    const { postType } = this.props;
    const { posts, error } = this.state;
    return (
      <section className='post-page--main' >
        <PostButton postType={`${postType} Posts`} />
        <span className='post-page--error'>{error}</span>
        {posts.map(post => <PostRow
          link={post.category.toLowerCase().replace(' and ', '-')}
          {...post}
          key={post.id}
          onClick={this.handleDelete}
        />
        )
        }
      </section >
    )
  }
}