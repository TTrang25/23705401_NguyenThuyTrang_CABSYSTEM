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

Bước 2. Xác định Stakeholder matrix
|                    | **Quan tâm thấp**                                              | **Quan tâm cao**                                                                                        |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Ảnh hưởng cao**  | **Keep Satisfied**  <br>• Cơ quan quản lý                      | **Manage Closely**  <br>• Ban giám đốc <br>• Khách hàng <br>• Tài xế <br>• Nhân viên vận hành <br>• BA |
| **Ảnh hưởng thấp** | **Monitor** <br>• Notification Provider <br>• Map/GPS Provider | **Keep Informed** <br>• Development Team <br>• Payment Provider                                         |
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
