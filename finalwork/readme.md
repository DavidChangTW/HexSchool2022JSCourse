# 最終作業注意事項

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
