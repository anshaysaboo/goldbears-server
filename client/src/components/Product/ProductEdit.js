import React from "react";
import { PageHeader, Card, message } from "antd";
import axios from "axios";
import moment from "moment";

import { getTokenConfig } from "../../util/getTokenConfig.js";
import ProductForm from "./ProductForm";

class ProductEdit extends React.Component {
  state = {
    productData: null,
  };

  constructor(props) {
    super(props);

    this.handleFinish = this.handleFinish.bind(this);
    const productData = this.props.location.state;
  }

  async handleFinish(formData) {
    if (this.state.productData && this.state.productData._id) {
      this.updateEvent(this.state.productData._id, formData);
    } else {
      this.createEvent(formData);
    }
  }

  async createEvent(data) {
    try {
      await axios.post("/api/products/", data, getTokenConfig());
      message.success("Product successfully created!");
      window.history.back();
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error(
          "Something went wrong! Please check console for details."
        );
      }
    }
  }

  async updateProduct(id, data) {
    try {
      await axios.put("/api/products/" + id, data, getTokenConfig());
      message.success("Product successfully updated!");
      window.history.back();
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error(
          "Something went wrong! Please check console for details."
        );
      }
    }
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Create New Product"
          className="site-page-header site-page-header-responsive"
          onBack={() => window.history.back()}
        />
        <Card>
          <ProductForm onFinish={this.handleFinish} />
        </Card>
      </div>
    );
  }
}

export default ProductEdit;
