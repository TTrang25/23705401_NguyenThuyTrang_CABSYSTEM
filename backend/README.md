# CAB System - Node.js Microservices

Backend MVP dựa trên Bounded Context và Microservice đã phân tích từ `srs.md`.

## Kiến trúc

- MS01 Identity Service: `3001`
- MS02 Customer Service: `3002`
- MS03 Driver Service: `3003`
- MS04 Fleet Service: `3004`
- MS05 Trip Service: `3005`
- MS06 Dispatch Service: `3006`
- MS07 Location Service: `3007`
- MS08 Payment Service: `3008`
- MS09 Notification & Rating Service: `3009`
- MS10 Operation & Reporting Service: `3010`
- API Gateway: `3000`

Hiện tại mỗi service sở hữu store dữ liệu riêng theo domain logic; bản MVP dùng in-memory để dễ chạy và học. Bước tiếp theo có thể thay từng store bằng PostgreSQL/MongoDB mà không đổi API nghiệp vụ.

## Chạy

Yêu cầu Node.js >= 20.

```bash
cd backend
npm start
```

Gateway: `http://localhost:3000`

## API mẫu

### Đăng ký

```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "trang",
  "password": "123456",
  "role": "CUSTOMER"
}
```

### Đăng nhập

```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "trang",
  "password": "123456"
}
```

### Tạo tài xế

```http
POST http://localhost:3000/drivers
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "phone": "0900000000"
}
```

Sau đó chuyển tài xế sang `AVAILABLE` bằng `PUT /drivers/{driverId}/status`.

### Tạo chuyến

```http
POST http://localhost:3000/trips
Content-Type: application/json

{
  "customerId": "CUS_xxx",
  "pickup": "Đại học Công nghiệp TP.HCM",
  "destination": "Bến Thành",
  "vehicleType": "CAR"
}
```

### Dispatch

```http
POST http://localhost:3000/dispatch/{tripId}
```

### Thanh toán

```http
POST http://localhost:3000/payments
Content-Type: application/json

{
  "tripId": "TRIP_xxx",
  "amount": 75000,
  "method": "CASH"
}
```

### Báo cáo

```http
GET http://localhost:3000/reports/summary
```

## Lưu ý

Đây là bản MVP phục vụ việc học và chứng minh kiến trúc. Mật khẩu đang được lưu trong memory chỉ để demo; khi triển khai thật phải hash bằng Argon2/bcrypt, dùng JWT/OAuth2, database riêng cho từng service, message broker/event bus, validation, logging, retry/circuit breaker và tích hợp provider thật.
