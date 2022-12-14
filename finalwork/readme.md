# 最終作業注意事項

## 作業等級表

1. LV1：挑選做前台或後台功能任一頁
2. `LV2：兩頁前後台都做`
3. LV3：兩頁 JS 撰寫時間在一個工作天八小時內完成

## 後台圖表等級

1. LV1：做圓餅圖，做全產品類別營收比重，類別含三項，共有：床架、收納、窗簾
2. `LV2：做圓餅圖，做全品項營收比重，類別含四項，篩選出前三名營收品項，其他 4~8 名都統整為「其它」`

>PS：後台圖表可不依照設計稿來設計，可直接用 C3.js 內建的色系與樣式來設計即可。

## 實作網站

前台：<https://davidchangtw.github.io/HexSchool2022JSCourse/finalwork/>

後台：<https://davidchangtw.github.io/HexSchool2022JSCourse/finalwork/admin.html>

## API文件

- UID路徑：`davidchang`
- UID Token：`l8RBNxrth3etIQcXKV4Kn3OaZdi2`
- <https://hexschool.github.io/hexschoolliveswagger/>

## 各種API

### 產品相關(客戶)

#### 取得產品列表(GET)

- URL：<https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/products>
- 若成功取得則會回傳一個物件陣列的產品資料列表。

### 購物車相關(客戶)

#### 取得購物車列表(GET)

- URL：<https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts>
- 若取得成功將會回傳一個物件陣列，原價總金額與販售總金額會由後端計算。
- 比較需要注意的是 productId 將會對產品列表 API 的 ID。

#### 加入購物車(POST)

- URL：<https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts>
- 加入購物車時只需要傳送產品 ID 與數量即可加入完成。
- 請注意，若重複加入相同的產品 ID 將會自動合併產品，並依照本次傳送的 quantity 數量為主並覆蓋原本的數量。
- 加入購物車之後將會回傳新的購物車列表，因此可以不用再執行「取得購物車列表」的行為。

### 訂單相關(客戶)

### 訂單相關(管理者)

## 20221123 助教提供關於作業細節的建議

### 前台

- [x] 按加入購物車應該為加入該品項一項，而加入第二次會變 2個品項 以此類推~
- [x] 可以試著完成 PATCH 編輯購物車的產品數量 - + 或是下拉選擇
- [x] 表單驗證的電話可驗證是否 8 碼，另外目前信箱格式錯誤也會成功送出訂單，可在 addOrders 也加上這段判斷，若沒有錯誤才送出訂單
- [x] 搜尋和加入監聽，會建議寫在外面將每個功能獨立一個函式，在管理上會較方便～

### 後台

- [x] headers 可以抽離出來（避免每一支都寫一次）
