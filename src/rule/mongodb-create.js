/**
 * 
 * 
 * Create DB
 */

// ues lesapp

// install mongodb
// https://hub.docker.com/_/mongo
// docker-compose -f mongo.yml up
// login mongodb:
// mongo --username root --password example --host localhost:27017 --authenticationDatabase admin

// use admin
// db.createUser(
//     {
//       user: "kristen",
//       pwd: "1104kristen",
//       roles: [ "readWrite", "dbAdmin" ]
//     }
//  )

// db.getUser('kristen')

// use lala
// db.createUser(
//     {
//       user: "kristen",
//       pwd: "1104kristen",
//      roles: [ { role: "readWrite", db: "lala" } ]
//     }
//  )

// > db.foo.insert({x:1,y:2})
// WriteResult({ "nInserted" : 1 })
// > db.auth("kristen", "1104kristen" )

//  mongo --username kristen --password  1104kristen --host localhost:27017 --authenticationDatabase admin

//  docker exec -it b37 mongo --username kristen --password 1104kristen  --host localhost:27017 --authenticationDatabase lala


/***   IDs
 * 
 *      1. chat_id: chats-
 *      2. user_id: id- 
 *      3. room_id: room-
 *      4. signup_code: sign
 *      5. recommend_id = user_id
 *      6. ab_id = ab- (board id)
 *      7. am_id = am- (board message id)
 * 
 * ========no encode:
 *      1. user_code
 * 
 */


/**
 * 
 ______   __                    __              
 /      \ /  |                  /  |             
/$$$$$$  |$$ |____    ______   _$$ |_    _______ 
$$ |  $$/ $$      \  /      \ / $$   |  /       |
$$ |      $$$$$$$  | $$$$$$  |$$$$$$/  /$$$$$$$/ 
$$ |   __ $$ |  $$ | /    $$ |  $$ | __$$      \ 
$$ \__/  |$$ |  $$ |/$$$$$$$ |  $$ |/  |$$$$$$  |
$$    $$/ $$ |  $$ |$$    $$ |  $$  $$//     $$/ 
 $$$$$$/  $$/   $$/  $$$$$$$/    $$$$/ $$$$$$$/                                                                           
 * 
 */
    
db.chats.insertMany([
    {
        chat_id     : "chats-h6iq14bjk8upnpek",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        message     : "What the fuck WHO!",
        from_id     : "id-h6iq14bjk8uxkd6y",
        to_chat_id  : "id-h6iq14bjk8uxl641",
        read_count  : 2,
        deleted     : false
    },
    {
        chat_id     : "chats-h6iq14bjk8upnpek",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        message     : "He is Asshole!",
        from_id     : "id-h6iq14bjk8uxl641",
        to_chat_id  : "id-h6iq14bjk8uxkd6y",
        read_count  : 2,
        deleted     : false
    },
    {
        chat_id     : "chats-h6iq14bjk8upnpek",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        message     : "世界衛生組織遭指控，在中國去年底爆發武漢肺炎疫情後，對台灣提出病毒能人傳人的警告置之不理。但世衛今天否認這項說法，宣稱台灣所發電郵未提人傳人一事。",
        from_id     : "id-h6iq14bjk8uxl641",
        to_chat_id  : "id-h6iq14bjk8uxkd6y",
        read_count  : 2,
        deleted     : false
    }
 ]);


 db.chatroom.insertMany([
    {
        room_id     : "room-h6iq14bjk8uyiay6",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        is_group    : false,
        member_ids  : { 
            "id-h6iq14bjk8uxl641" : "master",
            "id-h6iq14bjk8uxkd6y" : "master"
        },
        photo       : "https://qph.fs.quoracdn.net/main-qimg-cd9c38fe6f5362af532dcc42cf22a6b7",
        title       : "",
        deleted     :  false
    },
    {
        room_id     : "room-h6iq14bjk8uzlsm8",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        is_group    : true,
        member_ids  : { 
            "id-h6iq14bjk8uxl641" : "master",
            "id-h6iq14bjk8uxkd6y" : "member",
            "id-h6iq14bjk8uzoh04" : "member"
        },
        photo       : "https://qph.fs.quoracdn.net/main-qimg-cd9c38fe6f5362af532dcc42cf22a6b7",
        title       : "南部小吃部",
        deleted     :  false
    }
 ]);

 /**
 * 
 __    __                                         
/  |  /  |                                        
$$ |  $$ |  _______   ______    ______    _______ 
$$ |  $$ | /       | /      \  /      \  /       |
$$ |  $$ |/$$$$$$$/ /$$$$$$  |/$$$$$$  |/$$$$$$$/ 
$$ |  $$ |$$      \ $$    $$ |$$ |  $$/ $$      \ 
$$ \__$$ | $$$$$$  |$$$$$$$$/ $$ |       $$$$$$  |
$$    $$/ /     $$/ $$       |$$ |      /     $$/ 
 $$$$$$/  $$$$$$$/   $$$$$$$/ $$/       $$$$$$$/  
                                                                                                                                      
 * 
 */

/***
 * 
var CryptoJS = require("crypto-js");
 
var data = [{id: 1}, {id: 2}]
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(decryptedData); // [{id: 1}, {id: 2}]
 'd2f2297d6e829cd3493aa7de4416a18f'
> hash = CryptoJS.MD5("eee").toString();
 */


db.users.insertMany([
    {
        user_id     : "id-h6iq14bjk8uzoh04",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        user_code   : "bubuku",
        user_name   : "kiki",
        mobile_phone: "0962122617",
        email       : "kiki@lesapp.com",
        password    : "d2f2297d6e829cd3493aa7de4416a18f",
        birthday    : "1999-11-11",
        gender      : "女",
        national_code: "TW",
        place_residence: "台南市",
        recommend_id: "id-h6iq14bjk8uxkd6y",
        signup_code : "sigh6iq1bg4k8v5ks6x",
        upload_avatar_number : 2,
        avatar      : "https://upload.wikimedia.org/wikipedia/commons/5/52/190322_Park_Cho-rong_Verdique_Fan_Sign_2.jpg,https://p1.hiclipart.com/preview/71/905/135/chorong-apink-png-clipart.jpg",
        gender_tag  : "P",
        gender_love : "PPL",
        weight      : "60",
        height      : "165",
        status_recent: "心情很煩，別來煩我",
        status_relation: "交往中",
        status_marriage: "未婚",
        hair        : "短",
        sex_sm      : "sm",
        deleted     :false 
        
    },
    {
        user_id     : "id-h6iq14bjk8uxl641",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        user_code   : "mmmm",
        user_name   : "Maybe",
        mobile_phone: "0962122617",
        email       : "Maybe@lesapp.com",
        password    : "d2f2297d6e829cd3493aa7de4416a18f",
        birthday    : "1989-01-11",
        gender      : "女",
        national_code: "TW",
        place_residence: "高雄市",
        recommend_id: "id-h6iq14bjk8uxkd6y",
        signup_code : "sigh6iq1bg4k8v5ks6x",
        upload_avatar_number : 1,
        avatar      : "https://3.bp.blogspot.com/-8iulpGQYTVs/WNia697JojI/AAAAAAACAgs/lLWrefBvL1EWx44zeJBGotbbfA5Gyn0tACLcB/s1600/63e34f7bce608b0fc2f48ee424df0693.jpg",
        gender_tag  : "P",
        gender_love : "PPL",
        weight      : "60",
        height      : "168",
        status_recent: "忙碌中",
        status_relation: "暗戀中",
        status_marriage: "未婚",
        hair        : "短",
        sex_sm      : "sm",
        deleted     :false 
        
    },
    {
        user_id     : "id-h6iq14bjk8uxkd6y",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        user_code   : "lolo",
        user_name   : "lolo",
        mobile_phone: "0962122617",
        email       : "lolo@lesapp.com",
        password    : "d2f2297d6e829cd3493aa7de4416a18f",
        birthday    : "2000-11-11",
        gender      : "女",
        national_code: "TW",    
        place_residence: "屏東市",
        recommend_id: "",
        signup_code : "sigh6iq1bg4k8v5ks6x",
        upload_avatar_number : 1,
        avatar      : "https://img.ltn.com.tw/Upload/style/page/2018/06/20/180620-7952-1-kRjU1.jpg",
        gender_tag  : "P",
        gender_love : "PPL",
        weight      : "50",
        height      : "169",
        status_recent: "心情很煩，別來煩我",
        status_relation: "徵伴中",
        status_marriage: "未婚",
        hair        : "短",
        sex_sm      : "sm",
        deleted     :false 
        
    }
 ]);

 db.aboutuser.insertMany([
     {
        abu_id      : "abu-h6iq1bg4k8vabpwv",
        user_id     : "id-h6iq14bjk8uzoh04",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        introduction: "大家好我是ＫＩＫＩ金年時吧歲",
        like_introduction: "我喜歡長頭髮的",
        have_meet_ids: ["id-h6iq14bjk8uxkd6y"],
        fans_ids    : ["id-h6iq14bjk8uxkd6y"],
        crach_by_ids: ["id-h6iq14bjk8uxkd6y"],
        friends_ids : ["id-h6iq14bjk8uxkd6y"],
        chatroom_ids: ["room-h6iq14bjk8uzlsm8"],
        read_count  : 3,
        deleted     :  false
    },
    {
        abu_id      : "abu-h6iq1bg4k8vaib6b",
        user_id     : "id-h6iq14bjk8uxkd6y",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        introduction: "大家好我是---lolo---金年時吧歲",
        like_introduction: "我喜歡長頭髮的",
        have_meet_ids: ["id-h6iq14bjk8uzoh04","id-h6iq14bjk8uxl641"],
        fans_ids    : ["id-h6iq14bjk8uxl641"],
        crach_by_ids: ["id-h6iq14bjk8uzoh04"],
        friends_ids : ["id-h6iq14bjk8uzoh04"],
        chatroom_ids: ["room-h6iq14bjk8uzlsm8","room-h6iq14bjk8uyiay6"],
        read_count  : 3,
        deleted     :  false
    },
    {
        abu_id      : "abu-h6iq1bg4k8vam4jz",
        user_id     : "id-h6iq14bjk8uxl641",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        introduction: "大家好我是---Maybe---金年時吧歲",
        like_introduction: "我喜歡個性壞壞的短頭髮的",
        have_meet_ids: ["id-h6iq14bjk8uzoh04"],
        fans_ids    : ["id-h6iq14bjk8uzoh04"],
        crach_by_ids: ["id-h6iq14bjk8uzoh04"],
        friends_ids : ["id-h6iq14bjk8uzoh04"],
        chatroom_ids: ["room-h6iq14bjk8uzlsm8","room-h6iq14bjk8uyiay6"],
        read_count  : 3,
        deleted     :  false
    }
])



/***
 * 
 *   ______               __      __            __                     
 /      \             /  |    /  |          /  |                    
/$$$$$$  |  ______   _$$ |_   $$/   _______ $$ |  ______    _______ 
$$ |__$$ | /      \ / $$   |  /  | /       |$$ | /      \  /       |
$$    $$ |/$$$$$$  |$$$$$$/   $$ |/$$$$$$$/ $$ |/$$$$$$  |/$$$$$$$/ 
$$$$$$$$ |$$ |  $$/   $$ | __ $$ |$$ |      $$ |$$    $$ |$$      \ 
$$ |  $$ |$$ |        $$ |/  |$$ |$$ \_____ $$ |$$$$$$$$/  $$$$$$  |
$$ |  $$ |$$ |        $$  $$/ $$ |$$       |$$ |$$       |/     $$/ 
$$/   $$/ $$/          $$$$/  $$/  $$$$$$$/ $$/  $$$$$$$/ $$$$$$$/  
                                                                    
 * 
 * 
 */


db.articleboard.insertMany([
    {
        ab_id       : "ab-h6iq1bg4k8wudx9i",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "感情需求",
        link        : "love",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yg77rh",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "追求方法",
        link        : "chasing",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yg8xvf",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "失戀專區",
        link        : "break",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yg9mgz",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "戀愛生活",
        link        : "inlove",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8ygaop6",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "婚姻生活",
        link        : "merrage",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8ygb8lz",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "love",
        title       : "徵伴徵友",
        link        : "getalover",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjai9i",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "activity",
        title       : "見面活動",
        link        : "meetsup",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjbyvn",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "online",
        title       : "星座交友",
        link        : "horoscope",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjc90w",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "online",
        title       : "線上活動",
        link        : "onlineactivity",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
     {
        ab_id       : "ab-h6iq1bg4k8yjcoul",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "online",
        title       : "話題交友",
        link        : "onlineactivity",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjcxta",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "online",
        title       : "相親配對",
        link        : "onlineactivity",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjd5o9",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "online",
        title       : "問題回報",
        link        : "onlineactivity",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    },
    {
        ab_id       : "ab-h6iq1bg4k8yjdicp",
        createdAt   : new Date(),
        updatedAt   : new Date(),
        catagory    : "18x",
        title       : "18話題",
        link        : "18x",
        to_gender_love: "all",
        read_permission: "all",
        deleted     : false 
    }
    
])
