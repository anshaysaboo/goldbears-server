import React from "react";
import { Card, Button } from "antd";
import placeholder from "../../assets/img/placeholder.png";

class ProductCard extends React.Component {
  render() {
    const { title, imageUrl, price } = this.props.product;
    return (
      <Card
        style={{ width: 300 }}
        cover={
          imageUrl ? (
            <img alt="product" src={imageUrl} style={{ height: 200 }} />
          ) : (
            <img alt="product" src={placeholder} style={{ height: 200 }} />
          )
        }
        actions={[]}
      >
        <Card.Meta title={title} description={"$" + price} />
        <br />
        <Button onClick={this.props.onDeleteClick}>Delete</Button>
      </Card>
    );
  }
}

export default ProductCard;
