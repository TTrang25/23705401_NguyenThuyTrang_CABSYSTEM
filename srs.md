Bước 1. Xác định các stakeholder
| Stakeholder               | Vai trò                           | Mức độ ảnh hưởng | Mức độ quan tâm | Nhu cầu/Kỳ vọng chính                                                   |
| ------------------------- | --------------------------------- | ---------------- | --------------- | ----------------------------------------------------------------------- |
| **Khách hàng**            | Người sử dụng dịch vụ             | Cao              | Cao             | Đặt xe nhanh, theo dõi chuyến, thanh toán thuận tiện, bảo mật thông tin |
| **Tài xế**                | Người cung cấp dịch vụ vận chuyển | Cao              | Cao             | Nhận chuyến phù hợp, cập nhật trạng thái, quản lý thu nhập              |
| **Nhân viên vận hành**    | Quản lý hoạt động hằng ngày       | Cao              | Cao             | Theo dõi chuyến, tài xế, xử lý sự cố và quản lý dữ liệu                 |
| **Ban giám đốc**          | Người quyết định và định hướng    | Rất cao          | Cao             | Doanh thu, KPI, khả năng mở rộng, hiệu quả vận hành                     |
| **Business Analyst**      | Phân tích và quản lý yêu cầu      | Cao              | Cao             | Làm rõ yêu cầu và đảm bảo hệ thống đáp ứng nghiệp vụ                    |
| **Development Team**      | Xây dựng hệ thống                 | Trung bình       | Cao             | Yêu cầu rõ ràng, kiến trúc ổn định, khả năng mở rộng                    |
| **Payment Provider**      | Xử lý thanh toán điện tử          | Trung bình       | Trung bình      | Tích hợp API, bảo mật và xử lý giao dịch chính xác                      |
| **Notification Provider** | Cung cấp dịch vụ thông báo        | Trung bình       | Trung bình      | Gửi thông báo ổn định, hỗ trợ nhiều kênh                                |
| **Map/GPS Provider**      | Cung cấp dữ liệu vị trí           | Trung bình       | Trung bình      | Vị trí chính xác, API ổn định                                           |
| **Cơ quan quản lý**       | Giám sát tuân thủ                 | Cao              | Thấp/Trung bình | Bảo mật dữ liệu, lưu vết và tuân thủ quy định                           |

Sơ đồ quan hệ giữa các stakeholder
flowchart TB

    M["Ban giám đốc<br/>Management"]
    BA["Business Analyst<br/>BA"]

    CAB(("HỆ THỐNG CAB"))

    C["Khách hàng<br/>Customer"]
    D["Tài xế<br/>Driver"]
    O["Nhân viên vận hành<br/>Operations Staff"]

    DEV["Nhóm phát triển<br/>Development Team"]

    PAY["Nhà cung cấp thanh toán<br/>Payment Provider"]
    NOTI["Nhà cung cấp thông báo<br/>Notification Provider"]
    MAP["Nhà cung cấp bản đồ/GPS<br/>Map/GPS Provider"]
    REG["Cơ quan quản lý<br/>Regulatory Authority"]

    M -->|"Định hướng / Báo cáo"| CAB
    M -->|"Yêu cầu nghiệp vụ"| BA

    BA -->|"Phân tích yêu cầu"| CAB
    BA -->|"Thu thập / Xác nhận yêu cầu"| C
    BA -->|"Thu thập / Xác nhận yêu cầu"| D
    BA -->|"Thu thập / Xác nhận yêu cầu"| O
    BA -->|"Làm rõ yêu cầu kỹ thuật"| DEV

    C <-->|"Đặt xe / Theo dõi / Thanh toán / Đánh giá"| CAB
    D <-->|"Nhận chuyến / Cập nhật trạng thái / Vị trí"| CAB
    O <-->|"Quản lý / Giám sát / Xử lý sự cố"| CAB

    CAB <-->|"API thanh toán"| PAY
    CAB <-->|"SMS / Email / Push"| NOTI
    CAB <-->|"Bản đồ / GPS / ETA"| MAP

    DEV -->|"Xây dựng / Bảo trì"| CAB

    REG -->|"Quy định / Kiểm tra tuân thủ"| CAB
Bước 2. Xác định Stakeholder matrix
|                    | **Quan tâm thấp**                                              | **Quan tâm cao**                                                                                        |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Ảnh hưởng cao**  | **Keep Satisfied**  <br>• Cơ quan quản lý                      | **Manage Closely**  <br>• Ban giám đốc <br>• Khách hàng <br>• Tài xế <br>• Nhân viên vận hành <br>• BA |
| **Ảnh hưởng thấp** | **Monitor** <br>• Notification Provider <br>• Map/GPS Provider | **Keep Informed** <br>• Development Team <br>• Payment Provider                                         |

sơ đồ stakeholder matrix
quadrantChart
    title Stakeholder Matrix - Hệ thống CAB
    x-axis "Mức độ quan tâm thấp" --> "Mức độ quan tâm cao"
    y-axis "Mức độ ảnh hưởng thấp" --> "Mức độ ảnh hưởng cao"

    quadrant-1 "QUẢN LÝ CHẶT CHẼ"
    quadrant-2 "DUY TRÌ HÀI LÒNG"
    quadrant-3 "THEO DÕI"
    quadrant-4 "CẬP NHẬT THÔNG TIN"

    "Ban giám đốc": [0.90, 0.95]
    "Khách hàng": [0.90, 0.85]
    "Tài xế": [0.85, 0.85]
    "Nhân viên vận hành": [0.85, 0.80]
    "Business Analyst": [0.90, 0.75]

    "Cơ quan quản lý": [0.35, 0.85]

    "Nhóm phát triển": [0.75, 0.45]
    "Nhà cung cấp thanh toán": [0.65, 0.40]

    "Nhà cung cấp thông báo": [0.35, 0.30]
    "Nhà cung cấp Map/GPS": [0.40, 0.35]
1. Manage Closely – Quản lý chặt chẽ

Đây là nhóm quan trọng nhất vì ảnh hưởng cao và quan tâm cao.

Ban giám đốc
Khách hàng
Tài xế
Nhân viên vận hành
Business Analyst

→ BA cần thường xuyên trao đổi, lấy ý kiến và xác nhận yêu cầu với nhóm này.

2. Keep Satisfied – Duy trì sự hài lòng

Cơ quan quản lý

→ Có ảnh hưởng lớn đến hệ thống nhưng không tham gia vận hành hằng ngày. Cần đảm bảo hệ thống luôn tuân thủ quy định.

3. Keep Informed – Cập nhật thông tin

Development Team
Payment Provider

→ Cần được cung cấp đầy đủ thông tin về yêu cầu, thay đổi và tích hợp.

4. Monitor – Theo dõi

Notification Provider
Map/GPS Provider

→ Theo dõi chất lượng dịch vụ và khả năng tích hợp, không cần tham gia sâu vào quá trình ra quyết định nghiệp vụ.
Bước 3: Chuyển đổi các yêu cầu thành mã BG
| Mã BG    | Mục tiêu nghiệp vụ                                                                                                           | Yêu cầu liên quan                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **BG01** | Xây dựng nền tảng đặt xe trực tuyến có khả năng phục vụ số lượng lớn khách hàng và tài xế.                                   | Hệ thống phải có khả năng mở rộng và phục vụ lượng người dùng lớn.                                             |
| **BG02** | **Tự động hóa quy trình đặt và phân công xe** nhằm giảm sự phụ thuộc vào thao tác thủ công của nhân viên vận hành.           | Khách hàng gửi yêu cầu đặt xe; hệ thống tự động tìm và phân công tài xế.                                       |
| **BG03** | Cải thiện trải nghiệm khách hàng bằng cách cung cấp khả năng **theo dõi trạng thái chuyến đi theo thời gian thực**.          | Theo dõi tìm tài xế, tài xế nhận chuyến, ETA, tài xế đến, đón khách, di chuyển, hoàn thành.                    |
| **BG04** | Quản lý tập trung thông tin khách hàng, tài xế, phương tiện và chuyến đi.                                                    | Đăng ký, cập nhật hồ sơ, quản lý tài xế, phương tiện và lịch sử chuyến.                                        |
| **BG05** | Tối ưu việc tìm kiếm và phân công tài xế dựa trên vị trí, trạng thái và các tiêu chí vận hành.                               | Tìm tài xế gần khách hàng, ưu tiên tài xế phù hợp, tự động tìm tài xế khác khi bị từ chối/không phản hồi.      |
| **BG06** | Đảm bảo khách hàng có thể hoàn thành chuyến đi và thanh toán thuận tiện bằng nhiều phương thức.                              | Thanh toán tiền mặt hoặc điện tử, tính cước sau chuyến.                                                        |
| **BG07** | Bảo đảm an toàn thông tin thanh toán bằng cách **không lưu trực tiếp dữ liệu nhạy cảm của thẻ/tài khoản** trên hệ thống CAB. | Tích hợp nhà cung cấp thanh toán bên ngoài.                                                                    |
| **BG08** | Xây dựng hệ thống thông báo kịp thời và có khả năng mở rộng thêm nhiều kênh thông báo trong tương lai.                       | Push Notification, SMS, Email và các kênh khác.                                                                |
| **BG09** | Nâng cao hiệu quả quản lý và giám sát hoạt động vận hành.                                                                    | Nhân viên xem chuyến đang diễn ra, trạng thái tài xế, xử lý sự cố, tra cứu giao dịch.                          |
| **BG10** | Hỗ trợ ban lãnh đạo ra quyết định dựa trên dữ liệu hoạt động và kinh doanh.                                                  | Báo cáo số chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy, hiệu quả tài xế.                                    |
| **BG11** | Đảm bảo hệ thống hoạt động ổn định và có khả năng chịu tải cao vào thời điểm nhu cầu tăng.                                   | Các thành phần có thể mở rộng độc lập; lỗi thanh toán/thông báo không làm toàn hệ thống ngừng hoạt động.       |
| **BG12** | Tăng cường bảo mật và kiểm soát quyền truy cập vào hệ thống.                                                                 | Xác thực người dùng, phân quyền nhân viên, bảo vệ dữ liệu cá nhân/vị trí/giao dịch.                            |
| **BG13** | Đảm bảo khả năng kiểm tra, truy vết các hoạt động quan trọng khi xảy ra sự cố.                                               | Lưu vết các thao tác quan trọng và lịch sử giao dịch.                                                          |
| **BG14** | Xây dựng kiến trúc linh hoạt để dễ dàng bổ sung dịch vụ, phương thức thanh toán và nhà cung cấp mới.                         | Thêm loại dịch vụ, phương thức thanh toán, nhà cung cấp thông báo mà không phải xây dựng lại toàn bộ hệ thống. |
| **BG15** | Làm rõ các chính sách và quy tắc nghiệp vụ trước khi triển khai hệ thống.                                                    | Làm rõ cách tính cước, ưu tiên tài xế, thời gian phản hồi, hủy chuyến, mất mạng và thời gian lưu trữ dữ liệu.  |
| **BG16** | Cho phép triển khai và phát triển từng phần nhằm hạn chế ảnh hưởng đến các chức năng đang hoạt động.                         | Các thành phần độc lập, triển khai từng phần, dễ bảo trì và mở rộng.                                           |
