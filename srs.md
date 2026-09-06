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
| **Ảnh hưởng cao**  | **Keep Satisfied**  <br>• Cơ quan quản lý                      | **Manage Closely**  <br>• Ban giám đốc <br>• Khách hàng <br>• Tài xế <br>• Nhân viên vận hành <br>• BA |
| **Ảnh hưởng thấp** | **Monitor** <br>• Notification Provider <br>• Map/GPS Provider | **Keep Informed** <br>• Development Team <br>• Payment Provider                                         |

Sơ đồ stakeholder matrix

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

| Mã BR    | Business Requirement / Yêu cầu      | Mô tả yêu cầu                                                                                                                                 |
| **BR01** | Đặt xe                              | Hệ thống phải cho phép khách hàng **tạo chuyến đi** bằng cách cung cấp **điểm đón, điểm đến và loại xe/dịch vụ**.                             |
| **BR02** | Quản lý tài khoản khách hàng        | Hệ thống phải cho phép khách hàng **đăng ký, đăng nhập và cập nhật thông tin cá nhân**.                                                       |
| **BR03** | Tìm kiếm tài xế                     | Hệ thống phải **tự động xác định và tìm kiếm tài xế phù hợp** dựa trên vị trí, trạng thái sẵn sàng và các tiêu chí vận hành.                  |
| **BR04** | Phân công tài xế                    | Hệ thống phải **ưu tiên và gửi yêu cầu chuyến đi đến tài xế phù hợp**, đặc biệt là tài xế ở gần khách hàng.                                   |
| **BR05** | Xử lý tài xế từ chối/không phản hồi | Hệ thống phải **tự động tiếp tục tìm tài xế khác** khi tài xế được đề xuất từ chối hoặc không phản hồi trong thời gian quy định.              |
| **BBR06** | Thông báo kết quả tìm tài xế        | Hệ thống phải thông báo cho khách hàng khi **tìm được tài xế hoặc không tìm được tài xế**.                                                    |
| **BR07** | Theo dõi chuyến đi                  | Hệ thống phải cho phép khách hàng **theo dõi trạng thái chuyến đi và vị trí tài xế**.                                                         |
| **BR08** | Quản lý trạng thái chuyến           | Hệ thống phải cho phép tài xế cập nhật các trạng thái **đã đến điểm đón, đã đón khách, đang di chuyển và hoàn thành chuyến**.                 |
| **BR09** | Quản lý vị trí tài xế               | Hệ thống phải **ghi nhận vị trí của tài xế** để hỗ trợ tìm tài xế và dự kiến thời gian đến (ETA).                                             |
| **BR10** | Quản lý tài xế                      | Hệ thống phải cho phép tài xế **đăng ký/được tạo tài khoản, cập nhật hồ sơ và trạng thái hoạt động**.                                         |
| **BR11** | Quản lý phương tiện                 | Hệ thống phải cho phép quản lý **thông tin phương tiện** của tài xế.                                                                          |
| **BR12** | Tính cước                           | Hệ thống phải **tính số tiền khách hàng phải trả** dựa trên loại dịch vụ và thông tin chuyến đi.                                              |
| **BR13** | Thanh toán                          | Hệ thống phải hỗ trợ khách hàng **thanh toán bằng tiền mặt hoặc phương thức điện tử**.                                                        |
| **BR14** | Tích hợp thanh toán                 | Hệ thống phải tích hợp với **nhà cung cấp thanh toán bên ngoài** và không lưu trực tiếp thông tin nhạy cảm của thẻ/tài khoản.                 |
| **BR15** | Xử lý thanh toán thất bại           | Hệ thống phải **thông báo khi thanh toán điện tử thất bại** và cho phép xử lý lại theo chính sách doanh nghiệp.                               |
| **BR16** | Thông báo                           | Hệ thống phải gửi thông báo cho khách hàng và tài xế về **các sự kiện quan trọng của chuyến đi**.                                             |
| **BR17** | Lịch sử chuyến đi                   | Hệ thống phải cho phép khách hàng **xem lịch sử chuyến đi và số tiền đã thanh toán**.                                                         |
| **BR18** | Đánh giá tài xế                     | Hệ thống phải cho phép khách hàng **đánh giá tài xế sau khi chuyến đi hoàn thành**.                                                           |
| **BR19** | Quản lý vận hành                    | Hệ thống phải cung cấp giao diện để nhân viên vận hành **quản lý khách hàng, tài xế, phương tiện và chuyến đi**.                              |
| **BR20** | Giám sát chuyến đi                  | Hệ thống phải cho phép nhân viên vận hành **xem các chuyến đang diễn ra và trạng thái tài xế**.                                               |
| **BR21** | Xử lý sự cố                         | Hệ thống phải hỗ trợ nhân viên vận hành **tra cứu và xử lý các trường hợp chuyến đi bị lỗi**.                                                 |
| **BR22** | Quản lý giao dịch                   | Hệ thống phải cho phép nhân viên vận hành **tra cứu lịch sử giao dịch và thanh toán**.                                                        |
| **BR23** | Báo cáo                             | Hệ thống phải cung cấp báo cáo về **số lượng chuyến, doanh thu, tỷ lệ hoàn thành, tỷ lệ hủy và hiệu quả tài xế**.                             |
| **BR24** | Phân quyền                          | Hệ thống phải **kiểm soát quyền truy cập** để nhân viên chỉ thực hiện được các chức năng được cấp quyền.                                      |
| **BR25** | Bảo mật dữ liệu                     | Hệ thống phải bảo vệ **thông tin cá nhân, thông tin phương tiện, dữ liệu vị trí và dữ liệu giao dịch**.                                       |
| **BR26** | Lưu vết                             | Hệ thống phải **ghi nhận các thao tác quan trọng** để phục vụ kiểm tra và truy vết khi có sự cố.                                              |
| **BR27** | Khả năng mở rộng                    | Hệ thống phải cho phép **mở rộng độc lập các thành phần** khi số lượng khách hàng và tài xế tăng.                                             |
| **BR28** | Khả năng tích hợp                   | Hệ thống phải cho phép **bổ sung nhà cung cấp thanh toán, thông báo hoặc các dịch vụ bên ngoài** mà không phải xây dựng lại toàn bộ hệ thống. |
| **BR29** | Khả năng mở rộng dịch vụ            | Hệ thống phải cho phép doanh nghiệp **bổ sung các loại dịch vụ đặt xe mới** trong tương lai.                                                  |
| **BR30** | Triển khai từng phần                | Hệ thống phải hỗ trợ **triển khai chức năng mới từng phần**, hạn chế ảnh hưởng đến các chức năng đang hoạt động.                              |


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
Bước 8: Xác định các quy didngj nghiệp vụ(business rules) và chuyển đổi chúng thành các yêu cầu chức năng( functional requirements) của hệ thống
# Xác định Business Rules và Functional Requirements

## 1. Business Rules – Quy định nghiệp vụ

| Mã       | Quy định nghiệp vụ                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------- |
| **BR01** | Khách hàng phải cung cấp điểm đón, điểm đến và loại xe khi đặt xe.                                       |
| **BR02** | Hệ thống phải ưu tiên tài xế phù hợp và ở gần khách hàng.                                                |
| **BR03** | Nếu tài xế từ chối hoặc không phản hồi trong thời gian quy định, hệ thống phải tìm tài xế khác.          |
| **BR04** | Khách hàng phải được thông báo khi có hoặc không có tài xế nhận chuyến.                                  |
| **BR05** | Tài xế phải cập nhật trạng thái chuyến: đã đến, đã đón khách, đang di chuyển và hoàn thành.              |
| **BR06** | Cước phí được tính dựa trên loại dịch vụ và thông tin chuyến đi.                                         |
| **BR07** | Khách hàng được thanh toán bằng tiền mặt hoặc thanh toán điện tử.                                        |
| **BR08** | Thông tin nhạy cảm của thẻ/tài khoản không được lưu trực tiếp trên hệ thống CAB.                         |
| **BR09** | Khi thanh toán điện tử thất bại, khách hàng phải được thông báo và có thể thực hiện lại theo chính sách. |
| **BR10** | Chỉ nhân viên có quyền mới được thực hiện các chức năng quản trị.                                        |
| **BR11** | Các thông tin quan trọng và giao dịch phải được lưu vết để phục vụ kiểm tra.                             |
| **BR12** | Hệ thống phải bảo vệ thông tin cá nhân, phương tiện, vị trí và giao dịch.                                |


## 2. Functional Requirements – Hệ thống phải làm gì?

| Mã FR    | Functional Requirement                                                             | Liên quan BR |
| -------- | ---------------------------------------------------------------------------------- | ------------ |
| **FR01** | Hệ thống cho phép khách hàng nhập điểm đón, điểm đến và chọn loại xe.              | BR01         |
| **FR02** | Hệ thống tạo yêu cầu đặt xe và ghi nhận thông tin chuyến.                          | BR01         |
| **FR03** | Hệ thống tự động tìm tài xế phù hợp dựa trên vị trí và trạng thái sẵn sàng.        | BR02         |
| **FR04** | Hệ thống ưu tiên tài xế phù hợp/gần khách hàng và gửi yêu cầu nhận chuyến.         | BR02         |
| **FR05** | Hệ thống tự động tìm tài xế khác khi tài xế từ chối hoặc không phản hồi.           | BR03         |
| **FR06** | Hệ thống thông báo cho khách hàng kết quả tìm tài xế.                              | BR04         |
| **FR07** | Hệ thống cho phép tài xế cập nhật trạng thái chuyến đi.                            | BR05         |
| **FR08** | Hệ thống ghi nhận và hiển thị vị trí tài xế, ETA cho khách hàng.                   | BR05         |
| **FR09** | Hệ thống tự động tính cước dựa trên thông tin chuyến và loại dịch vụ.              | BR06         |
| **FR10** | Hệ thống hỗ trợ thanh toán tiền mặt và thanh toán điện tử.                         | BR07         |
| **FR11** | Hệ thống kết nối Payment Provider để xử lý thanh toán điện tử.                     | BR08         |
| **FR12** | Hệ thống không lưu trực tiếp dữ liệu nhạy cảm của thẻ/tài khoản.                   | BR08         |
| **FR13** | Hệ thống thông báo kết quả thanh toán cho khách hàng.                              | BR09         |
| **FR14** | Hệ thống cho phép thực hiện lại giao dịch khi thanh toán thất bại theo chính sách. | BR09         |
| **FR15** | Hệ thống kiểm tra quyền trước khi cho phép nhân viên thực hiện chức năng.          | BR10         |
| **FR16** | Hệ thống ghi nhận các thao tác quan trọng và lịch sử giao dịch.                    | BR11         |
| **FR17** | Hệ thống kiểm soát quyền truy cập và bảo vệ dữ liệu người dùng.                    | BR12         |



## 3. Ví dụ chuyển đổi

**Quy định nghiệp vụ:**

> BR03 – Nếu tài xế từ chối hoặc không phản hồi trong thời gian quy định, hệ thống phải tìm tài xế khác.

↓

**Hệ thống phải làm gì?**

> FR05 – Hệ thống tự động chuyển sang tìm tài xế khác khi tài xế từ chối hoặc không phản hồi.

↓

**Use Case:**

> **UC13 – Chấp nhận/Từ chối chuyến**

**Actor:** Tài xế

---

### Luồng tổng quát

```text
Business Rule
      ↓
Hệ thống phải làm gì?
      ↓
Functional Requirement (FR)
      ↓
Use Case (UC)
      ↓
Actor
      ↓
Thiết kế hệ thống
```

Bước 9: Xác dịnh các nghiệp vụ phi chức năng
# Bước 9. Xác định yêu cầu phi chức năng

| Mã NFR    | Nhóm                     | Yêu cầu phi chức năng                                                                                |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **NFR01** | Hiệu năng                | Hệ thống phải phản hồi nhanh và đáp ứng được nhiều yêu cầu đặt xe đồng thời.                         |
| **NFR02** | Khả năng mở rộng         | Hệ thống phải có khả năng mở rộng khi số lượng khách hàng, tài xế và chuyến đi tăng.                 |
| **NFR03** | Tính sẵn sàng            | Hệ thống phải duy trì hoạt động ổn định và hạn chế gián đoạn dịch vụ.                                |
| **NFR04** | Độ tin cậy               | Lỗi của thanh toán hoặc thông báo không được làm ngừng toàn bộ chức năng đặt xe.                     |
| **NFR05** | Bảo mật                  | Hệ thống phải bảo vệ thông tin cá nhân, thông tin tài xế, vị trí và dữ liệu giao dịch.               |
| **NFR06** | Phân quyền               | Hệ thống phải đảm bảo người dùng chỉ được truy cập các chức năng được cấp quyền.                     |
| **NFR07** | Audit/Truy vết           | Hệ thống phải lưu vết các thao tác quan trọng để phục vụ kiểm tra và xử lý sự cố.                    |
| **NFR08** | Khả năng bảo trì         | Hệ thống phải cho phép bảo trì hoặc nâng cấp từng thành phần mà hạn chế ảnh hưởng đến toàn hệ thống. |
| **NFR09** | Khả năng tích hợp        | Hệ thống phải dễ dàng tích hợp thêm Payment Provider, Map/GPS Provider và Notification Provider.     |
| **NFR10** | Khả năng mở rộng dịch vụ | Hệ thống phải hỗ trợ bổ sung loại dịch vụ và phương thức thanh toán mới trong tương lai.             |

### Phân nhóm chính

* **Performance:** NFR01
* **Scalability:** NFR02
* **Availability & Reliability:** NFR03, NFR04
* **Security:** NFR05, NFR06, NFR07
* **Maintainability:** NFR08
* **Integration & Extensibility:** NFR09, NFR10

### Công thức ghi nhớ

**Functional Requirement (FR)** → *Hệ thống phải làm gì?*

**Non-Functional Requirement (NFR)** → *Hệ thống phải hoạt động như thế nào?*

Ví dụ:

> **FR03:** Hệ thống phải tự động tìm tài xế phù hợp.
> **NFR01:** Hệ thống phải thực hiện việc tìm kiếm và phản hồi trong thời gian đáp ứng phù hợp.
> 
Bước 10. Thiết kế Use Case và xác định Entity

## 10.1. Thiết kế Use Case

Từ các Functional Requirement (FR), xác định các Use Case và Actor tương ứng.

| Actor                     | Use Case chính                                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer**              | Đăng ký/Đăng nhập, cập nhật thông tin, tạo chuyến, theo dõi chuyến, hủy chuyến, xem lịch sử, thanh toán, đánh giá tài xế               |
| **Driver**                | Quản lý hồ sơ, quản lý phương tiện, cập nhật trạng thái sẵn sàng, nhận chuyến, chấp nhận/từ chối chuyến, cập nhật trạng thái và vị trí |
| **Operations Staff**      | Quản lý khách hàng, tài xế, phương tiện, chuyến đi, giám sát chuyến, xử lý sự cố, tra cứu giao dịch, xem báo cáo, phân quyền           |
| **Payment Provider**      | Xử lý thanh toán điện tử và trả kết quả giao dịch                                                                                      |
| **Map/GPS Provider**      | Cung cấp vị trí, khoảng cách và ETA                                                                                                    |
| **Notification Provider** | Gửi Push Notification, SMS, Email                                                                                                      |

### Ví dụ thiết kế UC – Tạo chuyến đi

**UC:** Tạo chuyến đi
**Actor:** Customer

**Tiền điều kiện:** Khách hàng đã đăng nhập.

**Luồng chính:**

1. Khách hàng nhập điểm đón.
2. Khách hàng nhập điểm đến.
3. Khách hàng chọn loại xe/dịch vụ.
4. Hệ thống kiểm tra thông tin.
5. Hệ thống tạo yêu cầu chuyến.
6. Hệ thống chuyển yêu cầu sang chức năng tìm tài xế.
7. Hệ thống thông báo trạng thái cho khách hàng.

**Hậu điều kiện:** Yêu cầu chuyến được tạo thành công và chuyển sang tìm tài xế.

---

## 10.2. Xác định Entity

Từ các Use Case, xác định các đối tượng dữ liệu chính của hệ thống CAB:

| Mã      | Entity           | Một số thuộc tính chính                         |
| ------- | ---------------- | ----------------------------------------------- |
| **E01** | Customer         | CustomerID, Name, Phone, Email                  |
| **E02** | Driver           | DriverID, Name, Phone, Status                   |
| **E03** | Vehicle          | VehicleID, PlateNumber, Type, DriverID          |
| **E04** | Trip             | TripID, Pickup, Destination, Status, Time       |
| **E05** | Booking          | BookingID, CustomerID, TripID, VehicleType      |
| **E06** | DriverAssignment | AssignmentID, TripID, DriverID, Status          |
| **E07** | Payment          | PaymentID, TripID, Amount, Method, Status       |
| **E08** | Fare             | FareID, TripID, ServiceType, Amount             |
| **E09** | Rating           | RatingID, TripID, CustomerID, DriverID, Score   |
| **E10** | Notification     | NotificationID, UserID, Type, Content, Status   |
| **E11** | Location         | LocationID, DriverID, Latitude, Longitude, Time |
| **E12** | UserAccount      | UserID, Username, Password, Role, Status        |
| **E13** | AuditLog         | LogID, UserID, Action, Time                     |

---

## 10.3. Mô hình hóa dữ liệu

Các Entity trên được sử dụng để xây dựng **Entity Relationship Diagram (ERD)**.

Một số quan hệ chính:

```text
Customer 1 ──── N Booking
Booking  1 ──── 1 Trip
Trip     1 ──── N DriverAssignment
Driver   1 ──── N DriverAssignment
Driver   1 ──── N Vehicle
Trip     1 ──── 1 Fare
Trip     1 ──── 1 Payment
Trip     1 ──── 1 Rating
Driver   1 ──── N Location
UserAccount 1 ──── N AuditLog
```

### Luồng tổng quát

```text
Functional Requirement
        ↓
     Use Case
        ↓
Xác định Actor + nghiệp vụ
        ↓
   Xác định Entity
        ↓
Xác định thuộc tính + quan hệ
        ↓
       ERD
```
Bước 11: Xác định Acceptance Criteria (AC) cho các Functional Requirement (FR) của hệ thống, nhằm xác định các điều kiện để một yêu cầu được xem là đạt và được nghiệm thu.
| Mã AC    | Acceptance Criteria                                                                                |
| -------- | -------------------------------------------------------------------------------------------------- |
| **AC01** | Khách hàng nhập đầy đủ điểm đón, điểm đến và loại xe thì hệ thống cho phép tạo yêu cầu.            |
| **AC02** | Nếu thiếu điểm đón hoặc điểm đến, hệ thống phải thông báo lỗi và không cho tạo yêu cầu.            |
| **AC03** | Khách hàng phải chọn một loại xe hợp lệ trước khi tạo yêu cầu.                                     |
| **AC04** | Khi tạo yêu cầu thành công, hệ thống phải hiển thị thông tin chuyến và trạng thái đang tìm tài xế. |

Requirement
     ↓
Acceptance Criteria (AC)
     ↓
Khi nào requirement được xem là ĐẠT?
     ↓
Dùng AC để kiểm tra / nghiệm thu

Ví dụ ngắn nhất:

FR05: Hệ thống phải tự động tìm tài xế khác khi tài xế từ chối.

→ AC05: Khi tài xế từ chối chuyến, hệ thống phải tự động chuyển sang tìm tài xế phù hợp tiếp theo mà không yêu cầu khách hàng đặt lại chuyến.
Bước  12: Xác định Acceptance Criteria (AC) cho các Functional Requirement (FR) và thiết lập mối quan hệ truy vết giữa BR → FR → AC → UC → Test Case để phục vụ kiểm thử và nghiệm thu hệ thống.
BR → FR → AC → UC → Test Case
Yêu cầu nào → chức năng nào → tiêu chí đạt nào → Use Case nào → Test nào.
| BR              | FR                             | AC                                           | UC                  | Test                             |
| --------------- | ------------------------------ | -------------------------------------------- | ------------------- | -------------------------------- |
| **BR01** Đặt xe | **FR01** Nhập thông tin chuyến | **AC01** Nhập đủ thông tin → cho tạo chuyến  | **UC03** Tạo chuyến | **TC01** Kiểm tra tạo chuyến     |
| **BR01** Đặt xe | **FR01** Nhập thông tin chuyến | **AC02** Thiếu điểm đón → prevent tạo chuyến | **UC03** Tạo chuyến | **TC02** Kiểm tra thiếu điểm đón |
| **BR01** Đặt xe | **FR01** Nhập thông tin chuyến | **AC03** Thiếu loại xe → prevent tạo chuyến  | **UC03** Tạo chuyến | **TC03** Kiểm tra thiếu loại xe  |
