import { Modal, Upload } from "antd";

function HinhAnhModal({ openModal, closeModal }) {
  return (
    <Modal
      title="HÌNH ẢNH SẢN PHẨM"
      open={openModal}
      onCancel={closeModal}
    ></Modal>
  );
}
export default HinhAnhModal;
