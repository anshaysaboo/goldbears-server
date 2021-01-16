import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Row } from "antd";

import { MENU_ITEMS } from "./Menu/menuItems";
import { DASHBOARD_ROUTES } from "./Menu/routes";
import { logout } from "../../actions/authActions";

const { Header, Content, Sider } = Layout;

class Dashboard extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          theme="light"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" style={{ height: "60px", padding: "15px" }}>
            <center></center>
          </div>
          <Row justify="end">
            <Menu theme="light" mode="inline">
              {MENU_ITEMS.map(({ title, path }, index) => {
                return (
                  <Menu.Item key={index}>
                    <Link to={"/dashboard" + path}>{title}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Row>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0, "background-color": "white" }}
          >
            <Row align="right">
              <Menu theme="light" mode="horizontal">
                <Menu.Item key="2" disabled={true}>
                  {"@" + this.props.username}
                </Menu.Item>
                <Menu.Item key="3" onClick={this.props.logout}>
                  Log Out
                </Menu.Item>
              </Menu>
            </Row>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                {DASHBOARD_ROUTES.map(({ path, component }, index) => {
                  return (
                    <Route
                      path={"/dashboard" + path}
                      component={component}
                      exact
                    />
                  );
                })}
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
});

export default connect(mapStateToProps, { logout })(Dashboard);
