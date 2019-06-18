import React, { Component } from "react";
import { Steps, notification } from "antd";
import axios from "axios";

import PersonalProfile from "components/utils/personalForm";
import BusinessProfile from "components/utils/businessForm";
import "./style.css";

const { Step } = Steps;

export default class Profile extends Component {
  state = {
    personal: {},
    business: {},
    current: 0
  };

  handlePersonalInfo = (data, e) => {
    e.preventDefault();
    this.setState({ personal: data, current: 1 });
  };

  handleSubmit = (data, e) => {
    e.preventDefault();
    this.setState({ business: data }, () => {
      const {
        personal: { confirm_password, ...restPersonal },
        business
      } = this.state;
      axios
        .post("/api/v1/user", { ...restPersonal, ...business })
        .then(() => {
          notification.success({
            message: "Successfully",
            description: "Successfully sign up"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          const { statusCode } = err.response.data;
          const errObj = {
            message: "Error",
            description: "There is Error please try again"
          };
          if (statusCode === 500) {
            errObj.message = "Server Error";
            errObj.description =
              "Internal Server Error, Please try again later";
          } else if (statusCode === 400) {
            errObj.message = "Validation Error";
            errObj.description = "Please, Check the data you entered";
          }
          notification.open(errObj);
        });
    });
  };

  handleGoBack = (data, e) => {
    e.preventDefault();
    this.setState({ current: 0, business: data });
  };

  render() {
    const { current, personal, business } = this.state;
    return (
      <div>
        <div className="create-profile--header">
          <h1>Create New Profile</h1>
          {current === 0 ? (
            <p>
              Complete this step to provide us with some personal information
            </p>
          ) : (
            <p>
              Complete this step to provide us with some information about your
              organization
            </p>
          )}
        </div>
        <Steps size="small" current={current} labelPlacement="vertical">
          <Step />
          <Step />
        </Steps>
        {current ? (
          <BusinessProfile
            handleSubmit={this.handleSubmit}
            business={business}
            handleGoBack={this.handleGoBack}
          />
        ) : (
          <PersonalProfile
            handlePersonalInfo={this.handlePersonalInfo}
            personal={personal}
          />
        )}
      </div>
    );
  }
}
