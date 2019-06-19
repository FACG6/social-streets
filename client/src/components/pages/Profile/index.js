import React, { Component } from "react";
import { Tabs, Icon, notification } from "antd";
import PropTypes from "prop-types";
import axios from 'axios';

import PersonalInfoForm from "components/utils/ProfilePersonal";
import BusinessForm from "components/utils/businessForm";
import ProfilePic from "components/pages/Profile/ProfilePic";
import "./style.css";

const { TabPane } = Tabs;

export default class ProfilePage extends Component {
  state = {
    personal: {},
    business: {},
    avatar: '',
    className: "",
  }

  componentDidMount() {
    axios.get(`/api/v1/user`)
      .then(({ data: { data } }) => {
        console.log(data)
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          email,
          avatar,
          organisation_name: organization,
          business_type: businessType,
          website,
          twitter,
          facebook,
          instagram,
          zip_code: zipCode,
          city,
          country,
          address,
        } = data;

        this.setState({
          personal:
          {
            firstName,
            lastName,
            email,
            id,
          },
          business:
          {
            organization,
            businessType,
            website,
            city,
            address,
            country,
            zipCode,
            twitter,
            facebook,
            instagram,
          },
          avatar
        })
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        if (statusCode) {
          notification.error({ message: 'ERROR', description: error });
        }
        if (statusCode === 401) {
          this.props.history.push('/login');
        }
      });
  }
  render() {
    const { personal, business, className, avatar } = this.state;
    return (
      <div className={className} >
        {personal.id &&
          <>
            <ProfilePic imgSrc={avatar} className="profile-page--pic" />
            <Tabs defaultActiveKey="1" animated={true} className="profile-page-tabs">
              <TabPane
                tab={
                  <span>
                    <Icon type="user" />
                    Personal Info
            </span>
                }
                key="1"
              >
                <PersonalInfoForm personal={personal} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="project" />
                    Business
            </span>
                }
                key="2"
              >
                <BusinessForm business={business} />
              </TabPane>
            </Tabs>
          </>
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  personal: PropTypes.object,
  business: PropTypes.object,
  className: PropTypes.string
};
