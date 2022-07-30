## 概要
firebase emulatorからtokenを取得する簡易アプリです

## 動かし方 
```
webpack serve
```  
もしwebpackなかったらbrewかなんかでもってきてね

firebase emulatorを起動して、`localhost:4000/auth`のGUIから`emailaddress`と`password`でユーザーを作成  
その後このアプリを起動して指定の項目を入力して、Signinをするとブラウザのdev toolにtokenが出ます  
それをコピペしてBearer tokenに貼り付けてください  

参考  
https://zenn.dev/tatsuyasusukida/articles/firebase-auth-email
