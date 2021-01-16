import React, { Component } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PageHeader, Card, Button, Modal, Tag, Typography, List } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.js";

import { getAllProducts, deleteProduct } from "../../actions/productActions";

const { confirm } = Modal;

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    searchText: "",
    searchedColumn: "",
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleDelete(_id) {
    confirm({
      title: "Are you sure you want to delete this event?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: () => this.props.deleteProduct(_id),
    });
  }

  handleEdit(event) {
    this.props.history.push({
      pathname: "/dashboard/events/new",
      state: event,
    });
  }

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header site-page-header-responsive"
          title={<Typography.Title level={2}>Products</Typography.Title>}
          extra={[
            <Link to="/dashboard/products/new">
              <Button type="primary">Create New</Button>
            </Link>,
          ]}
        ></PageHeader>
        <Card>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.props.products}
            renderItem={(item) => (
              <List.Item>
                <ProductCard
                  product={item}
                  onDeleteClick={() => this.handleDelete(item._id)}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, { getAllProducts, deleteProduct })(
  ProductList
);
