import React, { Component } from "react";
import { Button } from "antd";

import AccountsTable from "components/utils/AccountsTable";

const data = [
  {
    id: 1,
    name: "Ahmed I. Abdellatif",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 2,
    name: "Abdallah Ammar",
    email: "abdallah@gmail.com",
    business_type: "Charity",
    website: "https://www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 3,
    name: "Amin Al-Akhsham",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 4,
    name: "Israa Sulaiman",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 5,
    name: "Israa Sulaiman",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 6,
    name: "Israa Sulaiman",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
    address: "Palestine, Gaza Strip, Gaza, Omar Al-Mukhtar St. 79702",
    social_media: [
      { type: "facebook", href: "www.facebook.com" },
      { type: "instagram", href: "www.instagram.com" },
      { type: "twitter", href: "www.twitter.com" }
    ]
  },
  {
    id: 7,
    name: "Israa Sulaiman",
    email: "ahmedisam9922@gmail.com",
    business_type: "Charity",
    website: "www.google.com",
    organisation_name: "Ahmed Charity Co.",
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
    data: [{}]
  };

  componentDidMount() {
    this.setState({ data });
  }

  handleAcceptUser = userId => {
    console.log("Accept userId", userId);
  };

  handleRejectUser = userId => {
    console.log("Reject userId", userId);
  };

  render() {
    const actionRender = (text, { id }) => (
      <>
        <Button
          type="sucess"
          onClick={() => this.handleAcceptUser(id)}
          size="small"
          style={{ marginBottom: 4 }}
        >
          Accept
        </Button>
        <Button
          type="danger"
          onClick={() => this.handleRejectUser(id)}
          size="small"
        >
          Reject
        </Button>
      </>
    );
    return (
      <AccountsTable
        data={this.state.data}
        actionRender={actionRender}
        pageSize={5}
      />
    );
  }
}
