import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function validate(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class ImageUploader extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    imageUrl: PropTypes.string,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      imageUrl: props.imageUrl || "",
    };
  }

  state = {
    file: null,
    imageUrl: "",
  };

  handleChange = ({ file }) => {
    if (file && validate(file)) {
      const st = {
        file: file,
        imageUrl: file ? URL.createObjectURL(file) : "",
      };
      this.setState(st);
      this.props.onChange(st);
    }
  };

  removeImage = () => {
    this.setState({
      file: null,
      imageUrl: "",
    });
    this.props.onChange({
      file: null,
      imageUrl: "",
    });
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        {imageUrl ? (
          <a onClick={this.removeImage}>
            <small>Remove Image</small>
          </a>
        ) : null}
      </div>
    );
  }
}
