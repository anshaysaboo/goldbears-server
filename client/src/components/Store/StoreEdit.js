import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  PageHeader,
  Card,
  Modal,
  message,
} from "antd";
import PropTypes from "prop-types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ImageUploader from "../Util/ImageUploader";
import { connect } from "react-redux";
import axios from "axios";
import { getTokenConfig } from "../../util/getTokenConfig.js";
import { getStore } from "../../actions/storeActions.js";

const { Item } = Form;
const { confirm } = Modal;

class StoreEdit extends Component {
  state = {
    image: null,
  };

  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    defaultValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  componentDidMount() {
    this.props.getStore();
  }

  handleFinish(values) {
    console.log(values);
    if (this.validate(values)) {
      Object.assign(values, {
        image: this.state.image,
      });
      const formData = this.convertToFormData(values);
      // Form successfully filled out, show confirmation
      confirm({
        title: "Save changes?",
        icon: <ExclamationCircleOutlined />,
        content: "This will make your store changes visible to all users.",
        onOk: () => this.updateStore(formData),
      });
    } else {
      // Display error message
      message.error("Please fill out all fields!");
    }
  }

  async updateStore(values) {
    try {
      await axios.put("/api/store/", values, getTokenConfig());
      message.success("Successfully updated the store details!");
    } catch (err) {
      message.error(err.response.data.message);
    }
  }

  validate(values) {
    for (const val of Object.values(values)) {
      if (val == null) return false;
      if (typeof val === "string" && !val.trim()) return false;
    }
    return true;
  }

  convertToFormData(values) {
    var formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    return formData;
  }

  handleImageChange(info) {
    this.setState({ image: info.file });
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <PageHeader
          title="My Store"
          className="site-page-header site-page-header-responsive"
        />
        <Card>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={this.props.defaultValues}
          >
            <h2>Basic Information</h2>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col md={12}>
                <Item name="title" label="Title">
                  <Input
                    placeholder="Title"
                    defaultValue={this.props.store.title}
                  />
                </Item>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Item name="description" label="Description">
                  <Input.TextArea
                    rows={4}
                    defaultValue={this.props.store.description}
                  />
                </Item>
              </Col>
            </Row>

            <h2>Image</h2>
            <Row>
              <Item name="image">
                <ImageUploader
                  onChange={this.handleImageChange}
                  imageUrl={imageUrl || this.props.store.imageUrl}
                />
              </Item>
            </Row>

            <Row>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state.store.store,
});
export default connect(mapStateToProps, { getStore })(StoreEdit);
