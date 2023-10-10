import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

export interface DataType {
    id: number;
    ma: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : {
        ten: string;
        mota: string;
        voucher: string;
      };
    giaToiThieu : string;
    giaTriGiam : string;
    giaTriGiamToiDa : string;
    ngayTao: string;
    ngaySua: string;
    trangThai: {
      ten: string;
      mota: string;
      voucher: string;
    };
  }

export interface Sorter {
    field: string;
    order: "ascend" | "descend";
}

export interface DataParams {
    currentPage: number;
    pageSize: number;
    searchText: string;
    filterStatus: string;
    filterGender: string;
    sorter: string;
    sortOrder: string;
    trangThai: string;
}
  
  export interface CreatedRequest {
    ma: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : string;
    giaToiThieu : string;
    giaTriGiam : string;
    giaTriGiamToiDa : string;
    // ngayTao: string;
    // trangThai: boolean;
  }
  export interface UpdatedRequest {
    ma: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : string;
    giaToiThieu : string;
    giaTriGiam : string;
    giaTriGiamToiDa : string;
    // ngaySua: string;
    // trangThai: string;
  }

export interface TableParams {
    pagination?: TablePaginationConfig;
    searchText?: string;
    trangThai?: string;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

export interface DescriptionItemProps {
    title?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
}
  