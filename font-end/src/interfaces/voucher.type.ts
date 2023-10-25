export interface DataType {
    id: number;
    ma: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : {
        id : number;
        ten: string;
        mota: string;
        hinhThucGiam: string;
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

  export interface DataParams {
    currentPage: number;
    pageSize: number;
    searchText: string;
    filterStatus: string;
    filterGender: string;
    sorter: string;
    sortOrder: string;
  }
  
  export interface CreatedRequest {
    id: number;
    ma: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : string;
    giaToiThieu : string;
    giaTriGiam : string;
    giaTriGiamToiDa : string;
    // ngayTao: string;
    // trangThai: string;
  }
  export interface UpdatedRequest {
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    hinhThucGiam : string;
    giaToiThieu : string;
    giaTriGiam : string;
    giaTriGiamToiDa : string;
    trangThai: string;
  }

  