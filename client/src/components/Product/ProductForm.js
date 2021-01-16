import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Checkbox,
  DatePicker,
  TimePicker,
  Modal,
  message,
} from "antd";
import PropTypes from "prop-types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TAGS } from "./tags.js";

import ImageUploader from "../Util/ImageUploader";

const { Item } = Form;
const { confirm } = Modal;

class ProductForm extends Component {
  state = {
    tags: [],
    image: null,
  };

  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    defaultValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish(values) {
    const { tags, image } = this.state;
    Object.assign(values, {
      tags,
      image,
    });
    if (this.validate(values)) {
      const formData = this.convertToFormData(values);
      // Form successfully filled out, show confirmation
      confirm({
        title: "Save changes?",
        icon: <ExclamationCircleOutlined />,
        content: "This will post the product to your store.",
        onOk: () => this.props.onFinish(formData),
      });
    } else {
      // Display error message
      message.error("Please fill out all fields!");
    }
  }

  validate(values) {
    if (values.tags.length === 0) {
      message.error("Please select at least one tag!");
      return false;
    }
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

  handleSelectChange(value, key) {
    this.setState({ [key]: value });
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <Form layout="vertical" onFinish={this.handleFinish}>
        <h2>Basic Information</h2>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={12}>
            <Item name="title" label="Title">
              <Input placeholder="" />
            </Item>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={12}>
            <Item name="price" label="Price">
              <Input placeholder="$X.XX" />
            </Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={12}>
            <Item name="percentToCharity" label="Percent Going to Charity">
              <Input placeholder="00.00" />
            </Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={12}>
            <Item name="type" label="Product Category">
              <Input placeholder="Clothing, Decor, etc." />
            </Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={12}>
            <Item name="tags" label="Tags">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select your tags"
                onChange={(ev) => this.handleSelectChange(ev, "tags")}
              >
                {TAGS.map((tag) => (
                  <Select.Option key={tag}>{tag}</Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={8}>
            <Item name="charity" label="Charity Name">
              <Input placeholder="" />
            </Item>
          </Col>
          <Col md={8}>
            <Item name="charityLink" label="Link to Charity Website">
              <Input placeholder="https://website.com" />
            </Item>
          </Col>
        </Row>

        <h2>Image</h2>
        <Row>
          <Item name="image">
            <ImageUploader
              onChange={this.handleImageChange}
              imageUrl={imageUrl}
            />
          </Item>
        </Row>

        <Row>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Row>
      </Form>
    );
  }
}

export default ProductForm;
