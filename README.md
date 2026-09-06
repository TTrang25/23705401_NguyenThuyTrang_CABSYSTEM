graph TD
    CAB(("CAB System"))

    KH["Khách hàng<br/>Customer"]
    TX["Tài xế<br/>Driver"]
    QT["Quản trị<br/>Admin / Operator"]

    KH -->|"Đặt xe<br/>Theo dõi<br/>Thanh toán<br/>Đánh giá"| CAB
    CAB -->|"Thông báo<br/>Trạng thái chuyến<br/>Thông tin tài xế"| KH

    TX -->|"Nhận chuyến<br/>Cập nhật vị trí<br/>Cập nhật trạng thái"| CAB
    CAB -->|"Thông báo chuyến<br/>Yêu cầu nhận chuyến"| TX

    QT -->|"Quản lý<br/>Điều phối<br/>Xử lý sự cố<br/>Báo cáo"| CAB
    CAB -->|"Dữ liệu vận hành<br/>Giao dịch<br/>Báo cáo"| QT
