import { Modal, Form, Select, Col, Row, Input, Card } from "antd";
import React, { useState } from "react";
import { UpdatedRequest } from "~/interfaces/hoaDon.type";

interface ConfirmHoaDonGhiChuProps {
  open: boolean;
  onUpdate: (
    values: UpdatedRequest | null,
    status: any,
    title: string,
    ghiChuTimeLine: string
  ) => void;
  onCancel: () => void;
  updateRequest: UpdatedRequest | null;
  status: any;
  titleStatus: string;
}
const ConfirmHoaDonComponent: React.FC<ConfirmHoaDonGhiChuProps> = ({
  open,
  onUpdate,
  onCancel,
  updateRequest,
  status,
  titleStatus,
}) => {
  const [form] = Form.useForm();
  const [ghiChuTimeLine, setGhiChuTimeLine] = useState("");
  const [visible, setVisible] = React.useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(updateRequest, status, titleStatus, ghiChuTimeLine);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  React.useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <Modal
      title={"Mổ tả"}
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        handleOk();
        setGhiChuTimeLine("");
        onCancel();
      }}
    >
      <Card size="small" style={{margin: "0 auto"}} title="Ghi chú">
        <Row>
          <Col span={24}>
            <Input.TextArea
              showCount
              style={{ width: "100%", height: "100%" }}
              maxLength={100}
              value={ghiChuTimeLine}
              onChange={(e) => setGhiChuTimeLine(e.target.value)}
            />
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default ConfirmHoaDonComponent;
