# CAB System API

REST API cho hệ thống đặt xe CAB, xây dựng dựa trên `srs.md` (stakeholder analysis,
Business Requirements BR01–BR30, Functional Requirements FR01–FR17, Use Cases
UC01–UC32, Entities E01–E13). Mỗi endpoint bên dưới có ghi chú UC/FR/BR tương ứng
để bạn dễ đối chiếu ngược lại tài liệu SRS khi bảo vệ đồ án.

## Cài đặt & chạy

```bash
npm install
node server.js
# Server chạy tại http://localhost:3000
```

Khi khởi động, hệ thống tự seed 1 tài khoản **Operations Staff**:
`username: admin` / `password: admin123` (vì UC32/BR10/BR24 quy định nhân viên
không tự đăng ký công khai — chỉ khách hàng và tài xế mới đăng ký qua `/auth/register`).

Dữ liệu lưu **in-memory** (mảng JS trong `src/data/store.js`) để dễ chạy demo/đồ án.
Muốn dùng DB thật, chỉ cần thay nội dung file đó bằng lớp truy cập DB — các
controller không cần đổi.

## Kiến trúc thư mục

```
server.js                  # entry point
src/
  app.js                   # cấu hình Express, mount routes
  data/store.js            # "database" in-memory (E01-E13)
  data/seed.js             # seed tài khoản staff
  middleware/auth.js       # JWT auth + phân quyền theo role (NFR06/BR10/BR24)
  utils/helpers.js         # audit log, notification, tính khoảng cách, tính cước
  controllers/             # logic nghiệp vụ theo từng module (M01-M12)
  routes/                  # khai báo endpoint
```

## Xác thực

Tất cả endpoint (trừ `/auth/*`) yêu cầu header:

```
Authorization: Bearer <token>
```

Token lấy từ `POST /api/auth/login`. Vai trò (`role`) được gắn trong token và
kiểm tra ở middleware `authorize()` cho từng route — tương ứng BR10/BR24 (phân quyền)
và NFR06.

---

## 1. Auth — M01 (UC01, UC02, UC13)

| Method | Endpoint | Mô tả | Tham chiếu |
|---|---|---|---|
| POST | `/api/auth/register` | Đăng ký customer hoặc driver | UC01, UC13, BR01(BG), FR-liên quan |
| POST | `/api/auth/login` | Đăng nhập, trả JWT | UC02 |

Body `register`:
```json
{ "username": "cust1", "password": "pass123", "role": "customer", "name": "Nguyen Van A", "phone": "0900000001", "email": "a@x.com" }
```
`role` là `"customer"` hoặc `"driver"`.

## 2. Customer — M01 (UC03, UC07)

| Method | Endpoint | Mô tả | Tham chiếu |
|---|---|---|---|
| GET | `/api/customers/me` | Xem hồ sơ | UC03 |
| PUT | `/api/customers/me` | Cập nhật hồ sơ | UC03 |
| GET | `/api/customers/me/history` | Lịch sử chuyến + thanh toán | UC07, BR17 |

## 3. Driver — M02 (UC14–UC17, UC21)

| Method | Endpoint | Mô tả | Tham chiếu |
|---|---|---|---|
| GET | `/api/drivers/me` | Xem hồ sơ + phương tiện | UC14 |
| PUT | `/api/drivers/me` | Cập nhật hồ sơ | UC14 |
| PUT | `/api/drivers/me/vehicle` | Thêm/cập nhật phương tiện | UC15, BR11 |
| PUT | `/api/drivers/me/status` | Chuyển trạng thái (`available`/`unavailable`/`on_trip`/`offline`) | UC16 |
| PUT | `/api/drivers/me/location` | Cập nhật vị trí GPS | UC21, BR09/FR08 |
| GET | `/api/drivers/me/trip-requests` | Xem các chuyến đang được mời | UC17 |

## 4. Trip / Booking — M03, M04, M05, M06, M08

| Method | Endpoint | Vai trò | Mô tả | Tham chiếu |
|---|---|---|---|---|
| POST | `/api/trips` | customer | Tạo chuyến đi (điểm đón/đến/loại xe) → tự động tìm & mời tài xế gần nhất | UC04, BR01, FR01–FR04, AC01–AC04 |
| GET | `/api/trips/:id` | mọi role | Theo dõi trạng thái + vị trí tài xế | UC05, FR08 |
| PUT | `/api/trips/:id/cancel` | customer | Hủy chuyến | UC06 |
| PUT | `/api/trips/:id/accept` | driver | Chấp nhận chuyến | UC18 |
| PUT | `/api/trips/:id/reject` | driver | Từ chối → **hệ thống tự tìm tài xế khác**, không cần khách đặt lại | UC19, BR03, FR05 |
| PUT | `/api/trips/:id/status` | driver | Cập nhật trạng thái: `arrived`, `picked_up`, `in_progress`, `completed` | UC20, UC22 |
| GET | `/api/trips/:id/fare` | mọi role | Xem cước phí (tự tính khi chuyến `completed`) | UC08, BR06, FR09 |
| POST | `/api/trips/:id/payment` | customer | Thanh toán (`cash` hoặc `electronic`) | UC09, BR07/BR08, FR10–FR12 |
| GET | `/api/trips/:id/payment` | mọi role | Xem kết quả thanh toán | UC10, FR13/FR14 |
| POST | `/api/trips/:id/rating` | customer | Đánh giá tài xế sau khi hoàn thành | UC11 |

Body `POST /api/trips`:
```json
{
  "pickup": { "latitude": 10.77, "longitude": 106.69, "address": "..." },
  "destination": { "latitude": 10.78, "longitude": 106.70, "address": "..." },
  "vehicleType": "bike" | "car4" | "car7"
}
```

Body `PUT /api/trips/:id/status`: `{ "status": "arrived" }` (một trong 4 giá trị trên).

Body `POST /api/trips/:id/payment`: `{ "method": "cash" | "electronic" }`
(thanh toán điện tử được mô phỏng gọi Payment Provider, tỉ lệ thất bại ngẫu nhiên
để minh họa luồng BR09/FR14 — thông báo lỗi + cho phép thử lại).

Body `POST /api/trips/:id/rating`: `{ "score": 1-5, "comment": "..." }`

## 5. Notifications — M07

| Method | Endpoint | Mô tả | Tham chiếu |
|---|---|---|---|
| GET | `/api/notifications` | Danh sách thông báo của người dùng hiện tại | BR16, FR06/FR13 |

## 6. Operations Staff / Admin — M09, M10, M11

Yêu cầu role `staff` (đăng nhập bằng `admin` / `admin123`).

| Method | Endpoint | Mô tả | Tham chiếu |
|---|---|---|---|
| GET | `/api/admin/customers` | Danh sách khách hàng | UC23 |
| GET | `/api/admin/drivers` | Danh sách tài xế | UC24 |
| GET | `/api/admin/vehicles` | Danh sách phương tiện | UC25 |
| GET | `/api/admin/trips` | Danh sách toàn bộ chuyến | UC26 |
| GET | `/api/admin/trips/ongoing` | Chuyến đang diễn ra | UC27 |
| GET | `/api/admin/drivers/status` | Trạng thái tài xế | UC28 |
| PUT | `/api/admin/trips/:id/incident` | Ghi nhận xử lý sự cố | UC29 |
| GET | `/api/admin/transactions` | Lịch sử giao dịch/thanh toán | UC30 |
| GET | `/api/admin/reports` | Báo cáo: số chuyến, doanh thu, tỷ lệ hoàn thành/hủy, hiệu quả tài xế | UC31, BG10 |
| PUT | `/api/admin/users/:id/role` | Cập nhật vai trò/trạng thái tài khoản | UC32, BR10/BR24 |
| GET | `/api/admin/audit-logs` | Tra cứu nhật ký thao tác | BR11/BR26/NFR07 |

---

## Ví dụ luồng đầy đủ (curl)

```bash
# 1. Đăng ký khách hàng & tài xế
curl -X POST localhost:3000/api/auth/register -H "Content-Type: application/json" \
  -d '{"username":"cust1","password":"pass123","role":"customer","name":"A","phone":"0900000001"}'
curl -X POST localhost:3000/api/auth/register -H "Content-Type: application/json" \
  -d '{"username":"drv1","password":"pass123","role":"driver","name":"B","phone":"0900000002"}'

# 2. Đăng nhập lấy token
CUST_TOKEN=$(curl -s -X POST localhost:3000/api/auth/login -H "Content-Type: application/json" \
  -d '{"username":"cust1","password":"pass123"}' | jq -r .token)
DRV_TOKEN=$(curl -s -X POST localhost:3000/api/auth/login -H "Content-Type: application/json" \
  -d '{"username":"drv1","password":"pass123"}' | jq -r .token)

# 3. Tài xế bật trạng thái sẵn sàng + cập nhật vị trí
curl -X PUT localhost:3000/api/drivers/me/status -H "Authorization: Bearer $DRV_TOKEN" \
  -H "Content-Type: application/json" -d '{"status":"available"}'
curl -X PUT localhost:3000/api/drivers/me/location -H "Authorization: Bearer $DRV_TOKEN" \
  -H "Content-Type: application/json" -d '{"latitude":10.77,"longitude":106.69}'

# 4. Khách hàng tạo chuyến (tự động mời tài xế gần nhất)
curl -X POST localhost:3000/api/trips -H "Authorization: Bearer $CUST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pickup":{"latitude":10.77,"longitude":106.69},"destination":{"latitude":10.78,"longitude":106.70},"vehicleType":"car4"}'

# 5. Tài xế chấp nhận, cập nhật trạng thái tới khi hoàn thành, khách thanh toán & đánh giá
# (xem chi tiết endpoint ở bảng trên)
```

## Đối chiếu với các bước SRS

- **Entity (10.2)** → `src/data/store.js`
- **FR01–FR17** → logic trong `tripController.js` / `authController.js`
- **NFR05/NFR06/NFR07** (bảo mật, phân quyền, audit) → `middleware/auth.js` + `writeAuditLog()`
- **BR → FR → AC → UC → Test** (Bước 12) → mỗi hàm controller có comment nêu rõ UC/FR/BR liên quan để bạn viết test case tương ứng
