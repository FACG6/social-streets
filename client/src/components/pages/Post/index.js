import React, { Component } from 'react';

import PostButton from 'components/utils/PostButton';
import PostRow from 'components/utils/PostRow';
import './style.css';

//Mock Data//
const live = [
  { title: 'post 1', id: 1, type: 'event', category: 'Nightlife' },
  { title: 'post 2', id: 2, type: 'event', category: 'Walks and Talks' },
  { title: 'post 3', id: 3, type: 'event', category: 'Events and Festivals' },
  { title: 'post 4', id: 4, type: 'event', category: 'Events and Festivals' },
  { title: 'post 5', id: 5, type: 'public-service', category: 'Research' },
  { title: 'post 6', id: 6, type: 'public-service', category: 'Survery' },
];

const draft = [
  { title: 'draft 1', id: 1, type: 'event', category: 'Nightlife' },
  { title: 'draft 2', id: 2, type: 'event', category: 'Walks and Talks' },
  { title: 'draft 3', id: 3, type: 'event', category: 'Events and Festivals' },
  { title: 'draft 4', id: 4, type: 'event', category: 'Events and Festivals' },
  { title: 'draft 5', id: 5, type: 'public-service', category: 'Research' },
  { title: 'draft 6', id: 6, type: 'public-service', category: 'Survery' },
];
export default class Post extends Component {
  state = {
    posts: [],
    error: '',
  }

  componentDidMount() {
    const { postType } = this.props;
    let allPosts;
    if(postType === 'draft'){
      allPosts = draft;
    } else {
      allPosts = live;
    }
    const posts = allPosts.map(post => {
      post.category = post.category.toLowerCase().replace(' and ', '-');
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
        {posts.map(({ title, type, category, id }) => {
          return <PostRow
            title={title}
            type={type}
            category={category}
            key={id}
            id={id}
            onClick={this.handleDelete}
          />
        })}
      </section>
    )
  }
}
