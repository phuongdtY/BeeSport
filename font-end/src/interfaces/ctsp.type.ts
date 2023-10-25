export interface DataType {
  key: string;
  soLuong: number;
  giaTien: number;
  sanPham: {
    id: number;
    ten: string;
  };
  loaiDe: {
    id: number;
    ten: string;
  };
  diaHinhSan: {
    id: number;
    ten: string;
  };
  mauSac: {
    id: number;
    ten: string;
  };
  kichCo: {
    id: number;
    ten: string;
  };
}
