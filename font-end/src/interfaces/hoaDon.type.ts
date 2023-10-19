export interface DataType {
  id: number;
  ma: string;
  loaiHoaDon: {
    ten: string;
    moTa: string;
    mauSac: String;
  };
  ngayThanhToan: string;
  phiShip: string;
  tongTien: string;
  tongTienKhiGiam: string;
  ghiChu: string;
  nguoiNhan: string;
  sdtNguoiNhan: string;
  ngayShip: string;
  diaChiNguoiNhan: string;
  emailNguoiNhan: string;
  ngayNhan: string;
  ngayMongMuon: string;
  ngayTao: string;
  ngaySua: string;
  nguoiTao: string;
  nguoiSua: string;
  trangThaiHoaDon: {
    ten: string;
    moTa: string;
    mauSac: string;
  };
}

export interface Sorter {
  field: string;
  order: "ascend" | "descend";
}

export interface DataParams {
  page: number;
  pageSize: number;
  searchText?: string;
  loaiHoaDon?: string;
  trangThaiHoaDon?: string;
  sortField?: string;
  sortOrder?: string;
}
