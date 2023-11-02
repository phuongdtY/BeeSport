CREATE DATABASE du_an_tot_nghiep;

USE du_an_tot_nghiep;

-- Tạo bảng Thương hiệutai_khoan
CREATE TABLE thuong_hieu
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    ten        VARCHAR(255),
    ngay_tao   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- Tạo bảng Loại đế
CREATE TABLE loai_de
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    ten        VARCHAR(255),
    ngay_tao   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- Tạo bảng Địa hình sân
CREATE TABLE dia_hinh_san
(
    id        	BIGINT PRIMARY KEY AUTO_INCREMENT,
    ten        	VARCHAR(255),
    ngay_tao   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai 	ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- Tạo bảng Sản phẩm
CREATE TABLE san_pham
(
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma              VARCHAR(50) NOT NULL,
    ten             NVARCHAR(255),
    mo_ta           TEXT,
    ngay_tao   		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai 		ENUM('ACTIVE', 'INACTIVE','DISCONTINUED') DEFAULT 'ACTIVE',

    thuong_hieu_id  BIGINT,
    FOREIGN KEY (thuong_hieu_id) REFERENCES thuong_hieu (id)
);

-- Tạo bảng Màu sắc
CREATE TABLE mau_sac
(
    id        	BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma		    VARCHAR(30),
    ten        	VARCHAR(255),
    ngay_tao   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai 	ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- Tạo bảng kích cỡ
CREATE TABLE kich_co
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    kich_co    FLOAT,
    ngay_tao   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai 	ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

-- Tạo bảng Chi tiết sản phẩm
CREATE TABLE chi_tiet_san_pham
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    so_luong    INT,
    gia_tien    DECIMAL(18, 2),
    ngay_tao   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nguoi_tao   NVARCHAR(255),
    nguoi_sua   NVARCHAR(255),
    trang_thai 	ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK') DEFAULT 'ACTIVE',

    loai_de_id      BIGINT,
    dia_hinh_san_id BIGINT,
    san_pham_id BIGINT,
    mau_sac_id  BIGINT,
    kich_co_id  BIGINT,
    FOREIGN KEY (loai_de_id) REFERENCES loai_de (id),
    FOREIGN KEY (dia_hinh_san_id) REFERENCES dia_hinh_san (id),
    FOREIGN KEY (san_pham_id) REFERENCES san_pham (id),
    FOREIGN KEY (mau_sac_id) REFERENCES mau_sac (id),
    FOREIGN KEY (kich_co_id) REFERENCES kich_co (id)
);

-- Tạo bảng Hình ảnh sản phẩm
CREATE TABLE hinh_anh_san_pham
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    duong_dan   NVARCHAR(255),
    ngay_tao   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai 	ENUM('DEFAULT', 'AVATAR', 'DELETED') DEFAULT 'DEFAULT',

    chi_tiet_san_pham_id BIGINT,
    FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES chi_tiet_san_pham (id)
);

-- Tạo bảng Tài khoản
CREATE TABLE tai_khoan
(
    id                  BIGINT PRIMARY KEY AUTO_INCREMENT,
    ho_va_ten           NVARCHAR(255),
    can_cuoc_cong_dan   VARCHAR(20) UNIQUE,
    ngay_sinh           DATE,
    gioi_tinh           ENUM('MALE', 'FEMALE', 'OTHER') DEFAULT 'OTHER',
    so_dien_thoai       VARCHAR(15) UNIQUE,
    email               VARCHAR(255),
    thanh_pho           NVARCHAR(100),
    quan_huyen          NVARCHAR(100),
    phuong_xa           NVARCHAR(100),
    dia_chi_cu_the      NVARCHAR(255),
    anh_dai_dien        NVARCHAR(255),
    mat_khau            VARCHAR(30),
    ngay_tao            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai          ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);


-- Tạo bảng Vai trò
CREATE TABLE vai_tro
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    ten          ENUM('MANAGER', 'EMPLOYEE', 'CUSTOMER') DEFAULT 'CUSTOMER',
    ngay_tao     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai   ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',

    tai_khoan_id   BIGINT,
    FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan (id)
);

-- Địa chỉ
CREATE TABLE dia_chi
(
    id             	BIGINT PRIMARY KEY AUTO_INCREMENT,
    ho_va_ten      	NVARCHAR(100),
    so_dien_thoai  	VARCHAR(15),
    thanh_pho      	NVARCHAR(50),
    quan_huyen     	NVARCHAR(50),
    phuong_xa      	NVARCHAR(50),
    dia_chi_cu_the 	NVARCHAR(100),
    loai_dia_chi    ENUM('HOME', 'COMPANY', 'OTHER'),
    ngay_tao   		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai      ENUM('ACTIVE', 'INACTIVE','DEFAULT','DELETED') DEFAULT 'ACTIVE',

    tai_khoan_id   BIGINT,
    FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan (id)
);

-- Voucher
CREATE TABLE voucher
(
    id                     	BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma                     	VARCHAR(50),
    ten                    	NVARCHAR(50),
    ngay_bat_dau           	TIMESTAMP,
    ngay_ket_thuc          	TIMESTAMP,
    hinh_thuc_giam          ENUM('PERCENT', 'PERCENT'),
    gia_toi_thieu			DECIMAL(18, 2),
    gia_tri_giam           	DECIMAL(18, 2),
    gia_tri_giam_toi_da    	DECIMAL(18, 2),
    ngay_tao   				TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   				TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai             	ENUM('ACTIVE', 'EXPIRED', 'INACTIVE', 'UPCOMING')
);

CREATE TABLE hoa_don
(
    id                 	BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma_hoa_don         	VARCHAR(20),
    loai_hoa_don       	ENUM('ONLINE', 'COUNTER', 'PHONE_ORDER'),
    ngay_thanh_toan    	TIMESTAMP,
    phi_ship           	DECIMAL(18, 2),
    tong_tien          	DECIMAL(18, 2),
    tong_tien_khi_giam 	DECIMAL(18, 2),
    ghi_chu            	TEXT,
    nguoi_nhan         	NVARCHAR(100),
    sdt_nguoi_nhan     	VARCHAR(15),
    ngay_ship          	DATETIME,
    dia_chi_nguoi_nhan 	NVARCHAR(100),
    email_nguoi_nhan   	VARCHAR(100),
    ngay_nhan          	TIMESTAMP,
    ngay_mong_muon     	TIMESTAMP,
    ngay_tao   			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua			TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nguoi_tao          	NVARCHAR(100),
    nguoi_sua          	NVARCHAR(100),
    trang_thai         	ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'CANCELLED', 'APPROVED'),

    voucher_id         BIGINT,
    tai_khoan_id       BIGINT,
    FOREIGN KEY (voucher_id) REFERENCES voucher (id),
    FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan (id)
);

-- Phương thức thanh toán
CREATE TABLE phuong_thuc_thanh_toan
(
    id                      BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma            			VARCHAR(20),
    ten				        NVARCHAR(50),
    trang_thai			    TINYINT
);

-- Giao dịch
CREATE TABLE giao_dich
(
    id                      BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma_giao_dich            VARCHAR(20),
    nhan_vien_giao_dich     NVARCHAR(50),
    so_tien_giao_dich       DECIMAL(18, 2),
    ngay_tao   			    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua			    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai_giao_dich    TINYINT,

    hoa_don_id   BIGINT,
    FOREIGN KEY (hoa_don_id) REFERENCES hoa_don(id),
    tai_khoan_id   BIGINT,
    FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),
    phuong_thuc_id BIGINT,
    FOREIGN KEY (phuong_thuc_id) REFERENCES phuong_thuc_thanh_toan(id)
);

-- Hóa đơn chi tiết
CREATE TABLE hoa_don_chi_tiet
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    so_luong             INT,
    don_gia              DECIMAL(18, 2),
    ghi_chu              TEXT,
    ngay_tao   			 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   			 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nguoi_tao            NVARCHAR(255),
    nguoi_sua            NVARCHAR(255),
    trang_thai         	 ENUM('ACTIVE', 'INACTIVE', 'PAID', 'CANCELLED', 'PROCESSING', 'PENDING', 'PACKING', 'SHIPPING', 'DELIVERED'),

    hoa_don_id           BIGINT,
    chi_tiet_san_pham_id BIGINT,
    FOREIGN KEY (hoa_don_id) REFERENCES hoa_don (id),
    FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES chi_tiet_san_pham (id)
);

-- Giỏ hàng
CREATE TABLE gio_hang
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    ma_gio_hang  VARCHAR(20),
    ghi_chu      TEXT,
    ngay_tao   	 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua   	 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai   TINYINT,

    nguoi_so_huu BIGINT,
    FOREIGN KEY (nguoi_so_huu) REFERENCES tai_khoan (id)
);

-- Giỏ hàng chi tiet
CREATE TABLE gio_hang_chi_tiet
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    so_luong             INT,
    ghi_chu              TEXT,
    ngay_tao   			 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_sua    		 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    trang_thai           TINYINT,

    gio_hang_id          BIGINT,
    chi_tiet_san_pham_id BIGINT,
    FOREIGN KEY (gio_hang_id) REFERENCES gio_hang (id),
    FOREIGN KEY (chi_tiet_san_pham_id) REFERENCES chi_tiet_san_pham (id)
);
