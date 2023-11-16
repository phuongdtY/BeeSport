import { Modal } from "antd";
import React, { Component } from "react";

export function ModalKhachHang({ openModal, closeModal }) {
  return (
    <Modal
      open={openModal}
      onCancel={closeModal}
      title="Danh Sách Khách Hàng"
    ></Modal>
  );
}

export default ModalKhachHang;
