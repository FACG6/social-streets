import React, { Component } from "react";
import { Button, notification, Modal } from "antd";
import axios from "axios";

import AccountsTable from "components/utils/AccountsTable";

export default class PendingAccounts extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/admin/pending-users");
      let users = res.data.data;
      users = users.map(user => {
        user.name = `${user.first_name} ${user.last_name}`;
        user.address = `${user.country}, ${user.city}, ${user.address}, ${
          user.zip_code
        }`;
        user.social_media = [
          { type: "facebook", href: user.facebook },
          { type: "instagram", href: user.instagram },
          { type: "twitter", href: user.twitter }
        ];
        delete user.first_name;
        delete user.last_name;
        delete user.country;
        delete user.city;
        delete user.zip_code;
        delete user.facebook;
        delete user.instagram;
        delete user.twitter;
        return user;
      });
      await this.setState({ users });
    } catch (e) {
      if (e.response) {
        notification.error({
          message: "Error",
          description: e.response.data.error
        });
      } else {
        notification.error({
          message: "Error",
          description: e.message
        });
      }
    }
  }

  confirmActionOnUser = (userId, message, focusButton, onOk) => {
    const { confirm } = Modal;
    confirm({
      title: "Sure?",
      content: message,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      autoFocusButton: focusButton,
      keyboard: true,
      centered: true,
      maskClosable: true,
      width: 620,
      onOk: () => onOk(userId),
      onCancel() {
        Modal.destroyAll();
      }
    });
  };

  handleAcceptUser = async userId => {
    try {
      const res = await axios.get(`/api/v1/admin/accept-user/${userId}`);
      const acceptedUser = res.data.data;
      await this.setState({
        users: this.state.users.filter(user => user.id !== acceptedUser.id)
      });
      notification.success({
        message: "Sucess",
        description: "User was successfully accepted"
      });
    } catch (e) {
      if (e.response) {
        notification.error({
          message: "Error",
          description: e.response.data.error
        });
      } else {
        notification.error({
          message: "Error",
          description: e.message
        });
      }
    }
  };

  handleRejectUser = async userId => {
    try {
      const res = await axios.get(`/api/v1/admin/reject-user/${userId}`);
      const rejectedUser = res.data.data;
      await this.setState({
        users: this.state.users.filter(user => user.id !== rejectedUser.id)
      });
      notification.success({
        message: "Sucess",
        description: "User was successfully rejected"
      });
    } catch (e) {
      if (e.response) {
        notification.error({
          message: "Error",
          description: e.response.data.error
        });
      } else {
        notification.error({
          message: "Error",
          description: e.message
        });
      }
    }
  };

  render() {
    const actionRender = (text, { id }) => (
      <>
        <Button
          type="sucess"
          onClick={() =>
            this.confirmActionOnUser(
              id,
              "Please confirm you want to accept this user?",
              "ok",
              this.handleAcceptUser
            )
          }
          size="small"
          style={{ marginBottom: 4 }}
        >
          Accept
        </Button>
        <Button
          type="danger"
          onClick={() =>
            this.confirmActionOnUser(
              id,
              "Please confirm you want to reject this user?",
              "cancel",
              this.handleRejectUser
            )
          }
          size="small"
        >
          Reject
        </Button>
      </>
    );
    return (
      <AccountsTable
        data={this.state.users}
        actionRender={actionRender}
        pageSize={5}
      />
    );
  }
}
