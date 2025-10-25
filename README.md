# k58ktp_baitap2
### môn: phát triển ứng dụng trên nền web
###### 
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ảnh.
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?

#### Bài làm:
##### 1. Cài đặt Apache web server:
######
###### - vô hiệu hóa iis
<img width="390" height="112" alt="1" src="https://github.com/user-attachments/assets/56a63607-42cd-46ba-8f6e-f6bc20653b6a" />
###### - Download apache server, giải nén ra ổ D, cấu hình các file:
<img width="551" height="70" alt="2" src="https://github.com/user-attachments/assets/c05070f6-07d2-4ee3-8d5d-63c2174c0570" />
<img width="568" height="32" alt="3" src="https://github.com/user-attachments/assets/34d8147e-166f-4997-b5d9-03b911b1f6ef" />
<img width="263" height="150" alt="4" src="https://github.com/user-attachments/assets/78635f01-db0d-4e09-a0fb-f3dced3b7604" />

###### + D:\Apache24\conf\httpd.conf
###### đổi thành đường dẫn cài đặt ở ổ d
###### thêm servername
<img width="391" height="56" alt="5" src="https://github.com/user-attachments/assets/1d276b3f-47d2-4809-a210-7f32b61a205c" />

<img width="646" height="209" alt="7" src="https://github.com/user-attachments/assets/fa1af55a-9d1f-44ff-9637-a29c185146b0" />
<img width="503" height="64" alt="12 1" src="https://github.com/user-attachments/assets/943d6377-4c8b-4d37-a7fb-f3a2a24c6d1f" />
<img width="305" height="184" alt="12 2" src="https://github.com/user-attachments/assets/0f54376f-b2bf-4101-af67-d5dab5df7d03" />

###### + D:Apache24\conf\extra\httpd-vhosts.conf
<img width="286" height="289" alt="6" src="https://github.com/user-attachments/assets/6c2ea0f3-344c-478d-a35c-63654a775f16" />
<img width="437" height="150" alt="8" src="https://github.com/user-attachments/assets/07a7f5f9-04af-4d2c-b606-f1de8aeec520" />

###### website đặt tại thư mục:
<img width="343" height="29" alt="image" src="https://github.com/user-attachments/assets/5df4d589-0ab5-40ee-827b-f888005658ac" />

###### - sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
<img width="404" height="85" alt="10" src="https://github.com/user-attachments/assets/b661aff6-1f61-434e-84f5-09b1b9eeecc0" />
<img width="574" height="347" alt="11" src="https://github.com/user-attachments/assets/82e0b724-3957-418d-b6ae-02fea13b9893" />

###### - cài đặt, khởi động Apache
<img width="605" height="101" alt="13" src="https://github.com/user-attachments/assets/73ccf6e6-d0ed-4282-822f-6783727b9b67" />
<img width="427" height="32" alt="14" src="https://github.com/user-attachments/assets/038b7b0c-4718-42af-810a-0168520fde2b" />
<img width="376" height="183" alt="15" src="https://github.com/user-attachments/assets/fa3731c1-1550-4eb3-8da3-56a36714410d" />
<img width="351" height="179" alt="12 3" src="https://github.com/user-attachments/assets/e5068f20-6f83-4bc6-ab1b-2ed9014d7cab" />
<img width="335" height="123" alt="15 1" src="https://github.com/user-attachments/assets/28821a15-0b75-4357-a6dc-273f9dec1ba0" />

##### 2. Cài đặt nodejs và nodered
###### - Cài đặt nodejs:
<img width="457" height="108" alt="16" src="https://github.com/user-attachments/assets/846ad881-ea82-423e-84a1-ea3a5ec764da" />
###### - cài đặt nodered: chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
<img width="809" height="179" alt="17" src="https://github.com/user-attachments/assets/3024a333-efe0-4188-880d-72ab89ee60c8" />
###### + giải nén được file nssm.exe, copy nssm.exe vào thư mục `D:\nodejs\nodered\`
<img width="266" height="235" alt="18" src="https://github.com/user-attachments/assets/ac507a6d-abf5-4793-9454-6779f90822bf" />
###### + Node.js và npm đã hoạt động
<img width="154" height="92" alt="19" src="https://github.com/user-attachments/assets/bb55db84-b15b-457e-9834-cdb02979ae1d" />
###### + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung:
<img width="863" height="177" alt="20" src="https://github.com/user-attachments/assets/e19504ad-847d-4912-909c-c1e93d28c70d" />
###### + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
###### + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
<img width="649" height="50" alt="21" src="https://github.com/user-attachments/assets/43936631-d8c8-4905-883d-35e0a1eb6e6e" />
###### + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
<img width="458" height="51" alt="22" src="https://github.com/user-attachments/assets/c1a17ef9-d7de-4f76-9270-70f98ada66b0" />

##### 3. Tạo csdl tuỳ ý trên mssql (sql server 2022)
