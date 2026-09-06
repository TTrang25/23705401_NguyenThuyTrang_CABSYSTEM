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
| **BG16** | Cho phép triển khai và phát triển từng phần nhằm hạn chế ảnh hưởng đến các chức năng đang hoạt động.                         | Các thành phần độc lập, triển khai từng phần, dễ bảo trì và mở rộng.              
|
Bước 4: Giới hạn các module thực hiện
| Mã      | Module                             | Phạm vi chính                                                                                                     |
| **M01** | **Quản lý tài khoản & người dùng** | Đăng ký, đăng nhập, cập nhật thông tin khách hàng/tài xế, xác thực tài khoản                                      |
| **M02** | **Quản lý tài xế & phương tiện**   | Hồ sơ tài xế, thông tin phương tiện, trạng thái hoạt động, trạng thái sẵn sàng nhận chuyến                        |
| **M03** | **Đặt xe**                         | Nhập điểm đón, điểm đến, chọn loại xe, tạo và hủy yêu cầu đặt xe                                                  |
| **M04** | **Tìm kiếm & phân công tài xế**    | Tìm tài xế phù hợp dựa trên vị trí/trạng thái, ưu tiên tài xế gần, xử lý từ chối/không phản hồi                   |
| **M05** | **Quản lý & theo dõi chuyến đi**   | Cập nhật trạng thái chuyến, vị trí tài xế, ETA, theo dõi chuyến theo thời gian thực                               |
| **M06** | **Tính cước & thanh toán**         | Tính tiền chuyến đi, thanh toán tiền mặt, thanh toán điện tử qua nhà cung cấp bên ngoài, xử lý giao dịch thất bại |
| **M07** | **Thông báo**                      | Thông báo đặt xe, tài xế nhận chuyến, tài xế đến, hoàn thành chuyến, kết quả thanh toán                           |
| **M08** | **Lịch sử & đánh giá**             | Xem lịch sử chuyến, số tiền đã trả, đánh giá tài xế sau chuyến                                                    |
| **M09** | **Quản lý vận hành**               | Quản lý khách hàng, tài xế, phương tiện, chuyến đi; giám sát chuyến đang diễn ra và xử lý sự cố                   |
| **M10** | **Báo cáo & thống kê**             | Số lượng chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy, hiệu quả tài xế                                          |
| **M11** | **Phân quyền & bảo mật**           | Xác thực, phân quyền nhân viên, bảo vệ dữ liệu cá nhân/vị trí/giao dịch, audit log                                |
| **M12** | **Tích hợp hệ thống bên ngoài**    | Payment Provider, Map/GPS Provider và Notification Provider                                                       |

Bước 5: Hãy xác định các Business Requirements (yêu cầu nghiệp vụ) của hệ thống và thiết kế các yêu cầu tương ứng. Mỗi Business Requirement được mã hóa theo dạng BR01, BR02,..

| Mã BR | Business Requirement / Yêu cầu | Mô tả yêu cầu |
| BR01 | Đặt xe | Hệ thống phải cho phép khách hàng tạo chuyến đi bằng cách cung cấp điểm đón, điểm đến và loại xe/dịch vụ. |
| BR02 | Quản lý tài khoản khách hàng | Hệ thống phải cho phép khách hàng đăng ký, đăng nhập và cập nhật thông tin cá nhân. |
| BR03 | Tìm kiếm tài xế | Hệ thống phải tự động xác định và tìm kiếm tài xế phù hợp dựa trên vị trí, trạng thái sẵn sàng và các tiêu chí vận hành. |
| BR04 | Phân công tài xế | Hệ thống phải ưu tiên và gửi yêu cầu chuyến đi đến tài xế phù hợp, đặc biệt là tài xế ở gần khách hàng. |
| BR05 | Xử lý tài xế từ chối/không phản hồi | Hệ thống phải tự động tiếp tục tìm tài xế khác khi tài xế được đề xuất từ chối hoặc không phản hồi trong thời gian quy định. |
| BR06 | Thông báo kết quả tìm tài xế | Hệ thống phải thông báo cho khách hàng khi tìm được tài xế hoặc không tìm được tài xế. |
| BR07 | Theo dõi chuyến đi | Hệ thống phải cho phép khách hàng theo dõi trạng thái chuyến đi và vị trí tài xế. |
| BR08 | Quản lý trạng thái chuyến | Hệ thống phải cho phép tài xế cập nhật các trạng thái đã đến điểm đón, đã đón khách, đang di chuyển và hoàn thành chuyến. |
| BR09 | Quản lý vị trí tài xế | Hệ thống phải ghi nhận vị trí của tài xế để hỗ trợ tìm tài xế và dự kiến thời gian đến (ETA). |
| BR10 | Quản lý tài xế | Hệ thống phải cho phép tài xế đăng ký/được tạo tài khoản, cập nhật hồ sơ và trạng thái hoạt động. |
| BR11 | Quản lý phương tiện | Hệ thống phải cho phép quản lý thông tin phương tiện của tài xế. |
| BR12 | Tính cước | Hệ thống phải tính số tiền khách hàng phải trả dựa trên loại dịch vụ và thông tin chuyến đi. |
| BR13 | Thanh toán | Hệ thống phải hỗ trợ khách hàng thanh toán bằng tiền mặt hoặc phương thức điện tử. |
| BR14 | Tích hợp thanh toán | Hệ thống phải tích hợp với nhà cung cấp thanh toán bên ngoài và không lưu trực tiếp thông tin nhạy cảm của thẻ/tài khoản. |
| BR15 | Xử lý thanh toán thất bại | Hệ thống phải thông báo khi thanh toán điện tử thất bại và cho phép xử lý lại theo chính sách doanh nghiệp. |
| BR16 | Thông báo | Hệ thống phải gửi thông báo cho khách hàng và tài xế về các sự kiện quan trọng của chuyến đi. |
| BR17 | Lịch sử chuyến đi | Hệ thống phải cho phép khách hàng xem lịch sử chuyến đi và số tiền đã thanh toán. |
| BR18 | Đánh giá tài xế | Hệ thống phải cho phép khách hàng đánh giá tài xế sau khi chuyến đi hoàn thành. |
| BR19 | Quản lý vận hành | Hệ thống phải cung cấp giao diện để nhân viên vận hành quản lý khách hàng, tài xế, phương tiện và chuyến đi. |
| BR20 | Giám sát chuyến đi | Hệ thống phải cho phép nhân viên vận hành xem các chuyến đang diễn ra và trạng thái tài xế. |
| BR21 | Xử lý sự cố | Hệ thống phải hỗ trợ nhân viên vận hành tra cứu và xử lý các trường hợp chuyến đi bị lỗi. |
| BR22 | Quản lý giao dịch | Hệ thống phải cho phép nhân viên vận hành tra cứu lịch sử giao dịch và thanh toán. |
| BR23 | Báo cáo | Hệ thống phải cung cấp báo cáo về số lượng chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy và hiệu quả tài xế. |
| BR24 | Phân quyền | Hệ thống phải kiểm soát quyền truy cập để nhân viên chỉ thực hiện được các chức năng được cấp quyền. |
| BR25 | Bảo mật dữ liệu | Hệ thống phải bảo vệ thông tin cá nhân, thông tin phương tiện, dữ liệu vị trí và dữ liệu giao dịch. |
| BR26 | Lưu vết | Hệ thống phải ghi nhận các thao tác quan trọng để phục vụ kiểm tra và truy vết khi có sự cố. |
| BR27 | Khả năng mở rộng | Hệ thống phải cho phép mở rộng độc lập các thành phần khi số lượng khách hàng và tài xế tăng. |
| BR28 | Khả năng tích hợp | Hệ thống phải cho phép bổ sung nhà cung cấp thanh toán, thông báo hoặc các dịch vụ bên ngoài mà không phải xây dựng lại toàn bộ hệ thống. |
| BR29 | Khả năng mở rộng dịch vụ | Hệ thống phải cho phép doanh nghiệp bổ sung các loại dịch vụ đặt xe mới trong tương lai. |
| BR30 | Triển khai từng phần | Hệ thống phải hỗ trợ triển khai chức năng mới từng phần, hạn chế ảnh hưởng đến các chức năng đang hoạt động. |

BR01 – Tạo chuyến đi

Business Requirement:
Doanh nghiệp cần cung cấp cho khách hàng khả năng đặt xe trực tuyến một cách nhanh chóng và thuận tiện.

Requirement BR01:

Hệ thống phải cho phép khách hàng tạo chuyến đi bằng cách cung cấp điểm đón, điểm đến và lựa chọn loại xe/dịch vụ.

Thông tin đầu vào:

Điểm đón
Điểm đến
Loại xe/dịch vụ

Kết quả:

Hệ thống tạo yêu cầu chuyến đi.
Chuyển yêu cầu sang chức năng tìm kiếm tài xế.
Thông báo trạng thái yêu cầu cho khách hàng.
BR03 – Tìm tài xế

Hệ thống phải tự động tìm kiếm tài xế phù hợp dựa trên vị trí của khách hàng, trạng thái sẵn sàng và các tiêu chí vận hành.

BR04 – Phân công tài xế

Hệ thống phải ưu tiên tài xế phù hợp và gần khách hàng, sau đó gửi yêu cầu nhận chuyến đến tài xế.

BR05 – Tài xế không nhận chuyến

Hệ thống phải tự động tìm tài xế khác nếu tài xế được đề xuất từ chối hoặc không phản hồi trong thời gian quy định, mà không yêu cầu khách hàng tạo lại chuyến đi.

Chuỗi yêu cầu nghiệp vụ quan trọng nhất
flowchart LR
    BR["Business Requirement<br/>Nhu cầu doanh nghiệp"]
    
    BRR01["BR01<br/>Tạo chuyến đi"]
    BR03["BR03<br/>Tìm tài xế"]
    BR04["BR04<br/>Phân công tài xế"]
    BR05["BR05<br/>Xử lý từ chối / không phản hồi"]
    BR07["BR07<br/>Theo dõi chuyến"]
    BR12["BR12<br/>Tính cước"]
    BR13["BR13<br/>Thanh toán"]
    BR16["BR16<br/>Thông báo"]
    BR18["BR18<br/>Đánh giá"]
    
    BR --> BR01
    BR01 --> BR03
    BR03 --> BR04
    BR04 --> BR05
    BR05 --> BR07
    BR07 --> BR12
    BR12 --> BR13
    BR13 --> BR16
    BR07 --> BR16
    BR07 --> BR18
Bước 6: Xác định các yêu cầu nghiệp vụ (Business Requirements) của hệ thống CAB, chuyển đổi các yêu cầu thành các Requirement có mã VR01, VR02,... và xác định các tác nhân, dịch vụ/chức năng tương ứng để xây dựng mô hình Use Case của hệ thống.
Các Actor chính của CAB

Có 3 Actor chính theo đề bài:

Khách hàng (Customer)
Tài xế (Driver)
Nhân viên vận hành (Operations Staff)

Ngoài ra có các hệ thống bên ngoài:

Payment Provider – Nhà cung cấp thanh toán
Map/GPS Provider – Nhà cung cấp bản đồ/GPS
Notification Provider – Nhà cung cấp thông báo
1. Khách hàng
| Mã       | Dịch vụ / Use Case của khách hàng |
| -------- | --------------------------------- |
| **UC01** | Đăng ký tài khoản                 |
| **UC02** | Đăng nhập                         |
| **UC03** | Cập nhật thông tin cá nhân        |
| **UC04** | Tạo chuyến đi                     |
| **UC05** | Theo dõi chuyến đi                |
| **UC06** | Hủy chuyến                        |
| **UC07** | Xem lịch sử chuyến đi             |
| **UC08** | Xem cước phí                      |
| **UC09** | Thanh toán chuyến đi              |
| **UC10** | Xem kết quả thanh toán            |
| **UC11** | Đánh giá tài xế                   |
2. Tài xế
| Mã       | Dịch vụ / Use Case             |
| -------- | ------------------------------ |
| **UC13** | Đăng ký tài khoản              |
| **UC14** | Cập nhật hồ sơ                 |
| **UC15** | Cập nhật thông tin phương tiện |
| **UC16** | Chuyển trạng thái sẵn sàng     |
| **UC17** | Nhận thông báo chuyến mới      |
| **UC18** | Chấp nhận chuyến               |
| **UC19** | Từ chối chuyến                 |
| **UC20** | Cập nhật trạng thái chuyến     |
| **UC21** | Cập nhật vị trí                |
| **UC22** | Hoàn thành chuyến              |
3. Nhân viên vận hành
| Mã       | Dịch vụ / Use Case              |
| -------- | ------------------------------- |
| **UC23** | Quản lý khách hàng              |
| **UC24** | Quản lý tài xế                  |
| **UC25** | Quản lý phương tiện             |
| **UC26** | Quản lý chuyến đi               |
| **UC27** | Giám sát chuyến đang diễn ra    |
| **UC28** | Kiểm tra trạng thái tài xế      |
| **UC29** | Xử lý sự cố chuyến đi           |
| **UC30** | Tra cứu giao dịch               |
| **UC31** | Xem báo cáo thống kê            |
| **UC32** | Quản lý tài khoản và phân quyền |
4. Hệ thống bên ngoài
Payment Provider
Xử lý thanh toán điện tử
Trả kết quả giao dịch
Xử lý giao dịch thất bại
Map/GPS Provider
Xác định vị trí
Hỗ trợ khoảng cách
Hỗ trợ ETA
Notification Provider
Gửi Push Notification
Gửi SMS
Gửi Email
ví dụ: 
Ví dụ:

Nhu cầu doanh nghiệp:

Doanh nghiệp muốn khách hàng có thể đặt xe trực tuyến.

↓

BR01:

Hệ thống phải cho phép khách hàng tạo chuyến đi bằng cách cung cấp điểm đón, điểm đến và lựa chọn loại xe.

↓

Use Case:

UC04 – Tạo chuyến đi

↓

Actor:

Khách hàng

↓

Sau đó mới vẽ Use Case Diagram.
flowchart LR

    Customer["Khách hàng"]
    Driver["Tài xế"]
    Staff["Nhân viên vận hành"]

    CAB(("HỆ THỐNG CAB"))

    subgraph CustomerUC["Dịch vụ dành cho khách hàng"]
        UC01["Đăng ký / Đăng nhập"]
        UC02["Cập nhật thông tin"]
        UC03["Tạo chuyến đi"]
        UC04["Theo dõi chuyến đi"]
        UC05["Hủy chuyến"]
        UC06["Xem lịch sử chuyến"]
        UC07["Thanh toán"]
        UC08["Đánh giá tài xế"]
    end

    subgraph DriverUC["Dịch vụ dành cho tài xế"]
        UC09["Quản lý hồ sơ"]
        UC10["Quản lý phương tiện"]
        UC11["Cập nhật trạng thái sẵn sàng"]
        UC12["Nhận chuyến"]
        UC13["Chấp nhận / Từ chối chuyến"]
        UC14["Cập nhật trạng thái chuyến"]
        UC15["Cập nhật vị trí"]
    end

    subgraph StaffUC["Dịch vụ dành cho nhân viên vận hành"]
        UC16["Quản lý khách hàng"]
        UC17["Quản lý tài xế"]
        UC18["Quản lý phương tiện"]
        UC19["Quản lý chuyến đi"]
        UC20["Giám sát chuyến"]
        UC21["Xử lý sự cố"]
        UC22["Tra cứu giao dịch"]
        UC23["Báo cáo thống kê"]
        UC24["Phân quyền"]
    end

    Customer --> UC01
    Customer --> UC02
    Customer --> UC03
    Customer --> UC04
    Customer --> UC05
    Customer --> UC06
    Customer --> UC07
    Customer --> UC08

    Driver --> UC09
    Driver --> UC10
    Driver --> UC11
    Driver --> UC12
    Driver --> UC13
    Driver --> UC14
    Driver --> UC15

    Staff --> UC16
    Staff --> UC17
    Staff --> UC18
    Staff --> UC19
    Staff --> UC20
    Staff --> UC21
    Staff --> UC22
    Staff --> UC23
    Staff --> UC24
