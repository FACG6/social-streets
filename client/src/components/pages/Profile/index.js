import React from "react";
import { Tabs, Icon } from "antd";
import PropTypes from "prop-types";

import PersonalInfoForm from "components/utils/ProfilePersonal";
import BusinessForm from "components/utils/businessForm";
import "./style.css";

const { TabPane } = Tabs;

export default function ProfilePage({ personal, business, className = "" }) {
  return (
    <Tabs defaultActiveKey="1" animated={true} className={className}>
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
  );
}

ProfilePage.propTypes = {
  personal: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
  className: PropTypes.string
};
