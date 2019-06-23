import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import PropTypes from "prop-types";

import "./style.css";

const data = [
  {
    id: 1,
    name: "Ahmed I. Abdellatif",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    org_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  }
];

export default class PendingAccounts extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Business Type",
        dataIndex: "business_type",
        ...this.getColumnSearchProps("business_type")
      },
      {
        title: "Website",
        dataIndex: "website",
        render: text => <a href={text}>{text}</a>,
        ...this.getColumnSearchProps("website")
      },
      {
        title: "Organisation",
        dataIndex: "org_name",
        ...this.getColumnSearchProps("org_name")
      },
      {
        title: "Address",
        dataIndex: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Social Media",
        dataIndex: "social_media",
        render: links =>
          links.map(({ type, href }) => (
            <a href={href}>
              <Icon type={type} />
            </a>
          ))
      }
    ];

    return (
      <Table
        columns={columns}
        rowKey={({ id }) => id}
        dataSource={data}
        pagination={{ pageSize: 50 }}
      />
    );
  }
}
