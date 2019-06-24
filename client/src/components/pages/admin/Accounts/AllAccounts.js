import React, { Component } from "react";
import { Button, notification, Modal, Input } from "antd";
import axios from "axios";

import AccountsTable from "components/utils/AccountsTable/index";

export default class PendingAccounts extends Component {
  state = {
    adminPassword: "",
    users: []
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/admin/all-users");
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

  handleUpdatePassword = event =>
    this.setState({ adminPassword: event.target.value });

  confirmDeleteUser = userId => {
    const { confirm } = Modal;
    confirm({
      title: "Are you sure to delete this user?",
      content: (
        <label>
          <span style={{ display: "block", margin: "20px 0 5px 0" }}>
            Enter your password to confirm this operation:
          </span>
          <Input onChange={this.handleUpdatePassword} autoFocus={true} />
        </label>
      ),
      okText: "Confirm",
      okType: "danger",
      cancelText: "Cancel",
      autoFocusButton: "cancel",
      keyboard: true,
      centered: true,
      maskClosable: true,
      width: 620,
      onOk: () => {
        this.handleDeleteUser(userId);
      },
      onCancel() {
        Modal.destroyAll();
      }
    });
  };

  handleDeleteUser = async userId => {
    try {
      const deleteUserRes = await axios.delete(
        `/api/v1/admin/delete-user/${userId}`,
        {
          data: { password: this.state.adminPassword }
        }
      );
      const deletedUser = deleteUserRes.data.data;
      this.setState({
        users: this.state.users.filter(user => user.id !== deletedUser.id)
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
    const { users } = this.state;
    const actionRender = (_, { id }) => (
      <Button
        type="danger"
        onClick={() => this.confirmDeleteUser(id)}
        size="small"
      >
        Delete User
      </Button>
    );

    return (
      <AccountsTable data={users} actionRender={actionRender} pageSize={6} />
    );
  }
}
