const express = require("express");

const app = express();
const es6Renderer = require('express-es6-template-engine');


/*
const server = require('http').Server(app);
const io = require('socket.io')(server);*/
const fs = require('fs');
const https = require('https');
const http = require('http');



//const server = http.createServer(app);
//const io = require('socket.io').listen(server);

// Certificate
const privateKey = fs.readFileSync('./ssl_key/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./ssl_key/cert.pem', 'utf8');
const ca = fs.readFileSync('./ssl_key/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const server = http.createServer(app);
const io = require('socket.io').listen(server);
const httpsServer = https.createServer(credentials, app);

app.engine('html', es6Renderer);
app.set('views', 'dist');
app.set('view engine', 'html');


/*****
 * To do : ingore html file
 */
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    /**** not work */
    if (path.indexOf(".htm") > 0){
      console.log(path.indexOf(".htm"))
      return false;
    }else{
      res.set('x-timestamp', Date.now());
    }
    
  }
}



app.use(express.static('dist',options))


app.get('/', (req, res)=>{
  //  res.send('Hello, World');
   console.log(__dirname);
  
 res.render('chat-1', {locals: {
   
  title: 'Welcome!',
  chats: {
    title: "聊天室"
  },
  friend: {
    title: "朋友名單"
  },
  articles: {
    title: "論壇主題"
  },
  profile: {
    title: "個人資料"
  },
  demo: {
    title: "ＤＥＭＯ"
  },
  search:{
    placeholder: "找尋"
  },
  signup:{
    "name": "姓名",
    "mobile_phone": "行動電話",
    "email": "電子郵件",
    "password": "設定密碼",
    "birthday": "生日",
    "gender": "性別",
    "nationality": "國籍",
    "place_residence": "縣市",
    "recommend_id": "推薦人暱稱",
    "signup_code": "登入號碼牌",
    "upload_avatar_number": "上傳頭照手寫號碼",
    "upload_avatar": "上傳頭照",
      placeholder:{
        "name": "請輸入暱稱(送出系統會檢查重複)",
        "mobile_phone": "09XXXXXXXX(10碼)",
        "email": "EX: email-ID@gmail.com",
        "password": "6個中英文組成的密碼",
        "birthday": "輸入西元年月日, EX:19981101",
        "gender": "目前的生理性別，LGBT之後設定（男,女,男變女,女變男,雙性別）",
        "nationality": "國籍碼，兩碼（EX: TW, US, HK, JP,TH https://reurl.cc/nz1lgd)",
        "place_residence": "縣市,三字(EX: 台北市, 台東縣)",
        "recommend_id": "推薦人暱稱",
        "signup_code": "登入的序號（若沒有，請忽略）",
        "upload_avatar_number": "請手寫您的暱稱在一張紙條上，自拍您的頭像與紙條後，上傳照片",
        "upload_avatar": "上傳頭照"
    },
    options:{
      "nationality":{
        "national_code":["AD","AE","AF","AG","AI","AL","AM","","AO","AR","AT","AU","AZ","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BR","BS","BW","BY","BZ","CA","","CF","CG","CH","CK","CL","CM","CN","CO","CR","CS","CU","CY","CZ","DE","DJ","DK","DO","DZ","EC","EE","EG","ES","ET","FI","FJ","FR","GA","GB","GD","GE","GF","GH","GI","GM","GN","GR","GT","GU","GY","HK","HN","HT","HU","ID","IE","IL","IN","IQ","IR","IS","IT","","JM","JO","JP","KE","KG","KH","KP","KR","KT","KW","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","MG","ML","MM","MN","MO","MS","MT","","","MU","MV","MW","MX","MY","MZ","NA","NE","NG","NI","NL","NO","NP","","NR","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PR","PT","PY","QA","","RO","RU","SA","SB","SC","SD","SE","SG","SI","SK","SL","SM","","","SN","SO","SR","ST","SV","SY","SZ","TD","TG","TH","TJ","TM","TN","TO","TR","TT","TW","TZ","UA","UG","US","UY","UZ","VC","VE","VN","YE","YU","ZA","ZM","ZR","ZW"],
        "national_name":["安道爾共和國","阿拉伯聯合酋長國","阿富汗","安提瓜和巴布達","安圭拉島","阿爾巴尼亞","亞美尼亞","阿森松" ,"安哥拉","阿根廷","奧地利","澳大利亞","阿塞拜疆","巴巴多斯","孟加拉國","比利時","布基納法索","保加利亞","巴林", "布隆迪","貝寧","巴勒斯坦","百慕大群島","文萊","玻利維亞","巴西","巴哈馬","博茨瓦納","白俄羅斯","伯利茲","加拿大","開曼群島","中非共和國","剛果","瑞士","庫克群島","智利","喀麥隆","中國","哥倫比亞","哥斯達黎加","捷克","古巴","塞浦路斯","捷克","德國","吉布提","丹麥","多米尼加共和國","阿爾及利亞","厄瓜多爾","愛沙尼亞","埃及","西班牙" ,"埃塞俄比亞","芬蘭","斐濟","法國","加蓬","英國","格林納達","格魯吉亞","法屬圭亞那","加納","直布羅陀","岡比亞" ,"幾內亞","希臘","危地馬拉","關島","圭亞那","香港特別行政區","洪都拉斯" ,"海地","匈牙利","印度尼西亞","愛爾蘭","以色列","印度","伊拉克","伊朗","冰島","意大利","科特迪瓦","牙買加","約旦","日本","肯尼亞","吉爾吉斯坦","柬埔寨","朝鮮","韓國","科特迪瓦共和國","科威特","哈薩克斯坦","老撾","黎巴嫩", "聖盧西亞","列支敦士登","斯里蘭卡","利比里亞","萊索托","立陶宛","盧森堡","拉脫維亞","利比亞","摩洛哥","摩納哥","摩爾多瓦", "馬達加斯加","馬里","緬甸","蒙古","澳門","蒙特塞拉特島","馬耳他","馬里亞那群島","馬提尼克","毛里求斯","馬爾代夫","馬拉維","墨西哥","馬來西亞","莫桑比克","納米比亞","尼日爾","尼日利亞","尼加拉瓜","荷蘭","挪威","尼泊爾","荷屬安的列斯","瑙魯","新西蘭","阿曼","巴拿馬","秘魯","法屬玻利尼西亞","巴布亞新幾內亞","菲律賓","巴基斯坦","波蘭","波多黎各","葡萄牙","巴拉圭","卡塔爾","留尼旺","羅馬尼亞","俄羅斯", "沙特阿拉伯","所羅門群島","塞舌爾","蘇丹","瑞典","新加坡","斯洛文尼亞","斯洛伐克","塞拉利昂","聖馬力諾","東薩摩亞(美)","西薩摩亞","塞內加爾","索馬里","蘇里南","聖多美和普林西比","薩爾瓦多","敘利亞","斯威士蘭","乍得", "多哥","泰國","塔吉克斯坦","土庫曼斯坦","突尼斯","湯加","土耳其","特立尼達和多巴哥","台灣省","坦桑尼亞" ,"烏克蘭","烏干達","美國","烏拉圭","烏茲別克斯坦","聖文森特島","委內瑞拉","越南","也門","南斯拉夫","南非","贊比亞" ,"扎伊爾","津巴布韋"],
        "national_en":["Andorra","United Arab Emirates","Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia","Ascension","Angola","Argentina","Austria","Australia","Azerbaijan","Barbados","Bangladesh","Belgium","Burkina-faso","Bulgaria","Bahrain","Burundi","Benin","Palestine","Bermuda Is.","Brunei","Bolivia","Brazil","Bahamas","Botswana","Belarus","Belize","Canada","Cayman Is.","Central African Republic","Congo","Switzerland","Cook Is.","Chile","Cameroon","China","Colombia","Costa Rica","Czech","Cuba","Cyprus","Czech Republic","Germany","Djibouti","Denmark","Dominica Rep.","Algeria","Ecuador","Estonia","Egypt","Spain","Ethiopia","Finland","Fiji","France","Gabon","United Kiongdom","Grenada","Georgia","French Guiana","Ghana","Gibraltar","Gambia","Guinea","Greece","Guatemala","Guam","Guyana","Hongkong","Honduras","Haiti","Hungary","Indonesia","Ireland","Israel","India","Iraq","Iran","Iceland","Italy","Ivory Coast","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Kampuchea (Cambodia )","North Korea","Korea","Republic of Ivory Coast","Kuwait","Kazakstan","Laos","Lebanon","St.Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova, Republic of","Madagascar","Mali","Burma","Mongolia","Macao","Montserrat Is","Malta","Mariana Is","Martinique","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","Niger","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Netheriands Antilles","Nauru","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Cuinea","Philippines","Pakistan","Poland","Puerto Rico","Portugal","Paraguay","Qatar","Reunion","Romania","Russia","Saudi Arabia","Solomon Is","Seychelles","Sudan","Sweden","Singapore","Slovenia","Slovakia","Sierra Leone","San Marino","Samoa Eastern","San Marino","Senegal","Somali","Suriname","Sao Tome and Principe","EI Salvador","Syria","Swaziland","Chad","Togo","Thailand","Tajikstan","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad and Tobago","Taiwan","Tanzania","Ukraine","Uganda","United States of America","Uruguay","Uzbekistan","Saint Vincent","Venezuela","Vietnam","Yemen","Yugoslavia","South Africa","Zambia","Zaire","Zimbabwe"]
      },
      "gender":["男","女","男變女","女變男","雙性別"],
      "place_residence": ["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣", "基隆市","新竹市","嘉義市"]
    }

  },
  signin:{
    "email": "電子郵件",
    "password": "密碼",
    "forget_password": "忘記密碼",
    "forget_email": "忘記郵件"
  },
  signin_advence_gender:{
    "gender":{
      "pleaceholder": "選擇您在拉界自我認識的標籤",
      "tag": ["T","P","H","B","TS"],
      "name": ["T","P","不分","BI","跨性別"]
    },
    "TP":{
      "name": "TP戀",
      "pleaceholder": "選擇加入TP群組(成員包含T,P,不分)",
      "showif": ["T","P","H"]
    },
    "TT":{
      "name": "TT戀",
      "pleaceholder": "選擇加入TT群組(成員包含T,不分)",
      "showif": ["T","H"]
    },
    "PP":{
      "name": "PP戀",
      "pleaceholder": "選擇加入PP群組(成員包含P,不分)",
      "showif": ["P","H"]
    },
    "HH":{
      "name": "不分戀",
      "pleaceholder": "選擇加入不分群組(成員包含T,P,不分)",
      "showif": ["T","P","H"]
    },
    "TS":{
      "name": "跨性別之戀",
      "pleaceholder": "選擇加入跨性別之戀群組(成員包含T,P,不分,雙性戀,跨性別戀)",
      "showif": ["T","P","H","B","TS"]
    },
    "BI":{
      "name": "雙性戀",
      "pleaceholder": "選擇加入雙性戀群組(成員包含T,P,不分,雙性戀)",
      "showif": ["T","P","H","B"]
    }
  },profile:{
    "weight":{
      "unit": "公斤",
      name: "體重"
    },
    "height":{
      "unit": "公分",
      "name": "身高"
    },
    "avatar":{
      "name": "頭像",
      
    },
    "introduction": "自我描述",
    "like_introduction": "喜歡類型",
    "status_recent": "最近狀態",
    "status_relation": ["徵伴中","交往中","結婚了","暗戀中","搞孤僻中","交友中","徵跑Ｕ","失戀中"],
    "status_marriage": ["未婚","已婚"],
    "gender":{
      "tag": ["T","P","H","B","TS"],
      "name": ["T","P","不分","BI","跨性別"]
    },
    "some_question":{
      self_hair: ["長","短"],
      like_hair: ["長","短"],
      self_sex_sm: ["S","M","SM"],
      like_sex_sm: ["S","M","SM"]
    }
  }

  }});
 })


app.get('/chch', (req, res)=>{
 //  res.send('Hello, World');
  console.log(__dirname);
  res.sendFile(__dirname + '/view/index.html');
//res.send(`I'm listening Index A. Please access with POST.`);
})

app.get('/chat', (req, res)=>{
  //  res.send('Hello, World');
 
   res.sendFile(__dirname + '/view/chat-1.html');
 //res.send(`I'm listening Index A. Please access with POST.`);
 })

app.get('/i', (req, res)=>{
 //  res.send('Hello, World');
  console.log(__dirname);
  res.sendFile(__dirname + '/dist/index.html');
})

app.get('/a', (req, res) => { 
   //res.send(`I'm listening Index A. Please access with POST.`);
   res.sendFile(__dirname + '/dist/index.html');
});

/*
io.on('connection', (socket)=>{
  console.log('Hello');
  onlineCount ++;
  io.emit("online", onlineCount);
  socket.on("greet", ()=>{
    socket.emit("greet", onlineCount);
  });
  socket.on('disconnect', ()=>{
   
    onlineCount = (onlineCount < 0)? 0:onlineCount -=1;
    io.emit("online", onlineCount);
    console.log('Bye~');
  });
});
*/

// 加入線上人數計數
let onlineCount = 0;
 
// 修改 connection 事件
io.on('connection', (socket) => {
    // 有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);
 
    socket.on("greet", () => {
        socket.emit("greet", onlineCount);
    });
   
    socket.on("send", (msg) => {
       //console.log(msg);
        io.emit("msg", msg);
    });

    socket.on('disconnect', () => {
        // 有人離線了，扣人
        onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
        io.emit("online", onlineCount);
    });
   
});



server.listen(3010, ()=>{

  console.log("Server Stared. http://localhost:3010");

});

/*
httpsServer.listen(4499, () => {
    console.log('HTTPS Server running on port 443');
});*/
