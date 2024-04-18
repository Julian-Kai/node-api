## node-api
- using Node.js to implement the api of required
    - required
        - 必須使用 Node.js 來實作這個 API server
        - 完成後的 API 需要有相對應的測試
        - 你的 code 裡面必須包含你所寫的註解
        - 實作的過程必須使用 git 來做版本控管
        - 可以使用第三方的 library
        - 提供一份 README 文件說明
        - 我們該如何跑起這個 server
        - 專案的架構，API server 的架構邏輯
        - 你對於所有使用到的第三方 library 的理解，以及他們的功能簡介
        - 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解
        - 在這份專案中你遇到的困難、問題，以及解決的方法
    - bonus
        - 各個 route 對於接收資料的各種邊際情況的處理
        - 程式的可讀性與可維護性
        - 任何你想得到會讓我們覺得很酷的東西
    - ref
        - https://github.com/hahow/hahow-recruit/blob/master/backend.md

## 說明
1. 由於 heroku api 異常，因此使用 mock data 替代
    - 但有用 isMock 布林值來控制是否調用 heroku api 
2. web 框架使用 express + axios
3. test 框架使用 chai + supertest + mocha
4. mock data 使用 mockjs
5. 使用 nodemon 開發並快速測試
6. 終端機輸入 make run 啟動服務搭配 postman 手動測試
7. 終端機輸入 make test 執行 api 測試，撰寫了六個案例
    1. GET /heroes without authenticate (success case)
    2. GET /heroes with authenticate (success case)
    3. GET /heroes with authenticate (error case)
    4. GET /heroes/:heroId without authenticate (success case)
    5. GET /heroes/:heroId with authenticate (success case)
    6. GET /heroes/:heroId with authenticate (error case)