import React from 'react';
import { Tag, Input, Icon, notification } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import axios from 'axios'

class EventTopics extends React.Component {
  state = {
    topics: [],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/event/static');
    const topics = res.data.data.topics.map( (element)=> element.topic ) 
    await this.setState({topics})
  }

  handleClose = async (removedTag) => {
    try {
      const topics = this.state.topics.filter(tag => tag !== removedTag);
      const deletedTopic = await axios.delete('/api/v1/post/event/topic', {data: {topic: removedTag}} )
      if(!deletedTopic.data.data[0]) throw new Error();
      this.setState({ topics });
      notification.success({
        message: "Topic deleted successfully"
      });
    } catch (err) {
      notification.error({
        message: "Sorry There is an error, try again"
      });
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = async () => {
    try {
      const { inputValue } = this.state;
      const addedTopic = await axios.post('/api/v1/post/event/topic', {topic: inputValue})
      if (!addedTopic.data.data[0]) throw new Error();
      let { topics } = this.state;
      if (inputValue && topics.indexOf(inputValue) === -1) {
        topics = [...topics, inputValue];
      }
      this.setState({
        topics,
        inputVisible: false,
        inputValue: '',
      });

      notification.success({
        message: "New Category added successfully"
      });
    } catch {
      notification.error({
          message: "Sorry There is an error, try again"
      });
  };
}

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
            <Icon type="plus" /> New Topic
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

  handleClose = async (removedTag) => {
    try {
      const categories = await this.state.categories.filter(tag => tag !== removedTag);
      const deletedCategory = await axios.delete('/api/v1/post/event/category', {data: {category: removedTag}} )
      if(!deletedCategory.data.data[0]) throw new Error();
      this.setState({ categories });
      notification.success({
        message: "Category deleted successfully"
      });
    } catch (err) {
      notification.error({
        message: "Sorry There is an error, try again"
      });
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = async () => {
    try {
      const { inputValue } = this.state;
      const addedCategory = await axios.post('/api/v1/post/event/category', {category: inputValue})
      if (!addedCategory.data.data[0]) throw new Error;
      let { categories } = this.state;
      if (inputValue && categories.indexOf(inputValue) === -1) {
        categories = [...categories, inputValue];
      }
      this.setState({
        categories,
        inputVisible: false,
        inputValue: '',
      });
      notification.success({
        message: "New Category added successfully"
      });
    } catch (err) {
      notification.error({
          message: "Sorry There is an error, try again"
        });
    }
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
            <Icon type="plus" /> New Category
          </Tag>
        )}
      </div>
    );
  }
}

class PublicPrimaryTags extends React.Component {
  state = {
    primaryTags: [],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/public-service/static');
    const primaryTags = res.data.data.primaryTags.map( (element)=> element.tag ) 
    await this.setState({primaryTags})
  }
  
  handleClose = async (removedTag) => {
    try {
      const deletedTag = await axios.delete('/api/v1/post/public-service/primary-tag', {data: {tag: removedTag}} )
      if(!deletedTag.data.data[0]) throw new Error();
      const primaryTags = this.state.primaryTags.filter(tag => tag !== removedTag);
      this.setState({ primaryTags });
      notification.success({
        message: "Tag deleted successfully"
      });
    } catch {
      notification.error({
          message: "Sorry There is an error, try again"
        });
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = async () => {
    try {
      const { inputValue } = this.state;
      const addedTag = await axios.post('/api/v1/post/public-service/primary-tag', {tag: inputValue})
        if (!addedTag.data.data[0]) throw new Error();
      let { primaryTags } = this.state;
      if (inputValue && primaryTags.indexOf(inputValue) === -1) {
        primaryTags = [...primaryTags, inputValue];
      }
      this.setState({
        primaryTags,
        inputVisible: false,
        inputValue: '',
      });
      notification.success({
        message: "New Primary tag added successfully"
      });
    } catch (err) {
      notification.error({
        message: "Sorry There is an error, try again"
      });
    }
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
            <Icon type="plus" /> New Primary Tag
          </Tag>
        )}
      </div>
    );
  }
}

class PublicSecondaryTags extends React.Component {
  state = {
    secondaryTags: [],
    inputVisible: false,
    inputValue: '',
  };

  async componentDidMount () {
    const res = await axios
      .get('/api/v1/post/public-service/static');
    const secondaryTags = res.data.data.secondaryTags.map( (element)=> element.tag ) 
    await this.setState({secondaryTags})
  }
  

  handleClose = async (removedTag) => {
    try {
      const deletedTag = await axios.delete('/api/v1/post/public-service/secondary-tag', {data: {tag: removedTag}} )
      if(!deletedTag.data.data[0]) throw new Error();
      const secondaryTags = this.state.secondaryTags.filter(tag => tag !== removedTag);
      this.setState({ secondaryTags });
      notification.success({
        message: "Tag deleted successfully"
      });
    } catch (err){
      notification.error({
          message: "Sorry There is an error, try again"
        });
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = async () => {
    try {
      const { inputValue } = this.state;
      const addedTag = await axios.post('/api/v1/post/public-service/secondary-tag', {tag: inputValue})
      if (!addedTag.data.data[0]) throw new Error();
      let { secondaryTags } = this.state;
      if (inputValue && secondaryTags.indexOf(inputValue) === -1) {
        secondaryTags = [...secondaryTags, inputValue];
      }
      this.setState({
        secondaryTags,
        inputVisible: false,
        inputValue: '',
      });
      notification.success({
        message: "New Primary tag added successfully"
      });
    } catch {
      notification.error({
        message: "Sorry There is an error, try again"
      });
    }
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
            <Icon type="plus" /> New secondary Tag
          </Tag>
        )}
      </div>
    );
  }
}

export { EventType, EventTopics, PublicPrimaryTags, PublicSecondaryTags };
