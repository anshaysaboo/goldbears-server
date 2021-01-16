import React, { Component } from "react";
import {
  Layout,
  Card,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Typography,
  message,
} from "antd";
import { login } from "../../actions/authActions";
import { connect } from "react-redux";
import logo from "../../assets/img/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  handleInputUpdate(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleForgotPassword() {
    this.setState({
      modalVisible: true,
    });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.error.id === "LOGIN_FAIL") {
      message.error(this.props.error.message.message);
    }
  }

  render() {
    return (
      <Layout style={{ height: "100vh", "background-color": "#F5BC32" }}>
        <Layout.Content>
          <Row
            justify="center"
            type="flex"
            align="middle"
            style={{ height: "100vh" }}
          >
            <Col lg={8} md={10} sm={12} xs={22}>
              <center>
                <Card align="middle">
                  <center>
                    <img src={logo} style={{ width: "20%" }} alt="Logo" />
                    <br />
                    <br />
                    <Typography.Title level={1}>Sustainabear</Typography.Title>
                    <p>Log into the vendor dashboard.</p>
                  </center>
                  <Form
                    name="login"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={(values) => this.props.login(values)}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username.",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password.",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Log In
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </center>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
