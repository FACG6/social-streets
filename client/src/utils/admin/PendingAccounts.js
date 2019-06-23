import React from "react";
import { Content } from "antd";

export function PendingAccounts(props) {
  return <h1>Pending Accounts</h1>;
}


import { Layout, Menu, Icon } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo">
              <h1
                style={{
                  padding: "20px 0px",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "lato",
                  fontSize: "20px"
                }}
              >
                RomanRoadLondon
              </h1>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">Pending accounts</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="team" />
                <span className="nav-text">Accounts</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">Posts</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="cloud-o" />
                <span className="nav-text">SEO Tips</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="cloud-o" />
                <span className="nav-text">Tags</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header
              style={{
                background: "#fff",
                padding: "10px",
                margin: "0 auto"
              }}
            >
              This is theHeader
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                style={{
                  padding: 24,
                  background: "#000",
                  textAlign: "center"
                }}
              />
              <Router>
                <Switch>
                  <Route
                    path="/admin/pending-accounts"
                    render={() => <h1>pending-accounts</h1>}
                  />
                  <Route
                    path="/admin/accounts"
                    render={() => <h1>accounts</h1>}
                  />
                  <Route path="/admin/posts" render={() => <h1>posts</h1>} />
                  <Route
                    path="/admin/seo-tips"
                    render={() => <h1>seo-tips</h1>}
                  />
                  <Route path="/admin/tags" render={() => <h1>tags</h1>} />
                </Switch>
              </Router>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              RRL © 2018 Created by GSG
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
