import React from 'react';
import { Tag, Input, Icon } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import axios from 'axios'

class EventTopics extends React.Component {
  state = {
    topics: ['ttttttt'],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/event/static');
    const topics = res.data.data.topics.map( (element)=> element.topic ) 
    await this.setState({topics})
  }

  handleClose = removedTag => {
    const topics = this.state.topics.filter(tag => tag !== removedTag);
    console.log(topics);
    this.setState({ topics });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { topics } = this.state;
    if (inputValue && topics.indexOf(inputValue) === -1) {
      topics = [...topics, inputValue];
    }
    console.log(topics);
    this.setState({
      topics,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { topics, inputVisible, inputValue } = this.state;
    const tagChild = topics.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}






















class EventType extends React.Component {
  state = {
    categories: [],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/event/static');
    const categories = res.data.data.categories.map( (element)=> element.category )
    await this.setState({categories})
  }

  handleClose = removedTag => {
    const categories = this.state.categories.filter(tag => tag !== removedTag);
    console.log(categories);
    this.setState({ categories });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { categories } = this.state;
    if (inputValue && categories.indexOf(inputValue) === -1) {
      categories = [...categories, inputValue];
    }
    console.log(categories);
    this.setState({
      categories,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { categories, inputVisible, inputValue } = this.state;
    const tagChild = categories.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}


















class PublicPrimaryTags extends React.Component {
  state = {
    primaryTags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/public-service/static');
      console.log(res.data.data)
    const primaryTags = res.data.data.primaryTags.map( (element)=> element.tag ) 
    await this.setState({primaryTags})
  }
  
  handleClose = removedTag => {
    const primaryTags = this.state.primaryTags.filter(tag => tag !== removedTag);
    console.log(primaryTags);
    this.setState({ primaryTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { primaryTags } = this.state;
    if (inputValue && primaryTags.indexOf(inputValue) === -1) {
      primaryTags = [...primaryTags, inputValue];
    }
    console.log(primaryTags);
    this.setState({
      primaryTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { primaryTags, inputVisible, inputValue } = this.state;
    const tagChild = primaryTags.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}













class PublicSecondaryTags extends React.Component {
  state = {
    secondaryTags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/public-service/static');
    const secondaryTags = res.data.data.secondaryTags.map( (element)=> element.tag ) 
    await this.setState({secondaryTags})
  }
  

  handleClose = removedTag => {
    const secondaryTags = this.state.secondaryTags.filter(tag => tag !== removedTag);
    console.log(secondaryTags);
    this.setState({ secondaryTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { secondaryTags } = this.state;
    if (inputValue && secondaryTags.indexOf(inputValue) === -1) {
      secondaryTags = [...secondaryTags, inputValue];
    }
    console.log(secondaryTags);
    this.setState({
      secondaryTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { secondaryTags, inputVisible, inputValue } = this.state;
    const tagChild = secondaryTags.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export { EventType, EventTopics, PublicPrimaryTags, PublicSecondaryTags };
