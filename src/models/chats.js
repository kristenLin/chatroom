var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const connectMongo = 'mongodb://root:example@localhost:27017/lala';
mongoose.connect();
//Set up default mongoose connection

mongoose.connect(connectMongo);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
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
                                                        
/*****
 *  **NEW ADD: room_id
 *  is_group -> one on one, 2 > people
 *  to_chat_id -> reply message
 *  read_count -> how many people read
 *  deleted -> delete
 *  no update ?
 */
var Chats = new Schema({
    chat_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    room_id     : {
        type    : String,
        trim    : true,
        required: true
    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    message     : String,
    from_id     : String,
    to_chat_id  : String,
    read_count  : {
        type    : Number,
        default : 0
    },
    deleted     :  {
        type    : Boolean,
        default : false 
    }
})


mongoose.model('chats',Chats);


/****
 * ADD: description
 *  member_ids:  {
 *      "Auser_id": member,
 *      "Buser_id": owner,
 *      "Auser_id": member,
 *  }
 */
var ChatRoom = new Schema({
    room_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    is_group    : {
        type    : Boolean,
        default : false
    },
    member_ids  : {
        type    : Map,
        of      : String
    },
    photo       : String,
    title       : String,
    deleted     :  {
        type    : Boolean,
        default : false 
    }
});

mongoose.model('chatroom',ChatRoom);
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

/****
 *  user_id -> system
 *  identity -> a identity code by system
 *  user_name -> a nickname
 *  signup_code -> for registry from email
 */
var Users = new Schema({
    user_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true
    },
    user_code   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true
    },
    user_name   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    mobile_phone: {
        type    : Number,
        required: true,
        unique  : true
    },
    email       : {
        type    : String,
        required: true,
        unique  : true
    },
    password    : String,
    birthday    : String,
    gender      : String,
    national_code: String,
    place_residence: String,
    recommend_id: String,
    signup_code : String,
    upload_avatar_number : Number,
    avatar      : String,
    gender      : String,
    gender_tag  : String,
    gender_love : String,
    weight      : String,
    height      : String,
    status_recent: String,
    status_relation: String,
    status_marriage: String,
    hair        : String,
    sex_sm      : String,
    deleted     :  {
        type    : Boolean,
        default : false 
    }
});

mongoose.model('users',Users);



/****
 */
var AboutUser = new Schema({
    abu_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    user_id   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    introduction: String,
    like_introduction: String,
    have_meet_ids: [String],
    fans_ids   : [String],
    crach_by_ids: [String],
    friends_ids : [String],
    chatroom_ids: [String],
    read_count  : Number,
    deleted     :  {
        type    : Boolean,
        default : false 
    }

    
});
mongoose.model('aboutuser',AboutUser);

/****
 * 100 QA about user by system
 */
var QAUser = new Schema({
    qa_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    user_id   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    reply_no    : String,
    reply_content: String,
    liked_ids   : [String],
    deleted     :  {
        type    : Boolean,
        default : false 
    }
    
});
mongoose.model('qauser',QAUser);






/****
 * photos = some links of photo
 */
var UserPhoto = new Schema({
    up_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    user_id   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    photos: [String],
    to_chat_id: String,
    is_all_clear: {
        type    : Boolean,
        default : false 
    },
    deleted     :  {
        type    : Boolean,
        default : false 
    }
    
});
mongoose.model('userphoto',UserPhoto);

/****
 * files = some links of file
 */
var UserFiles = new Schema({
    up_id     : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    user_id   : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    files: [String],
    to_chat_id: String,
    is_all_clear: {
        type    : Boolean,
        default : false 
    }
    
});
mongoose.model('userfiles',UserFiles);

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


/****
 * read_permission: [everyone, TTL, PPL...]
 */
var ArticleBoard = new Schema({
    ab_id       : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    catagory    : String,
    title       : String,
    link        : String,
    to_gender_love: String,
    read_permission:{
        type    : String,
        default : "all"
    },
    deleted     :  {
        type    : Boolean,
        default : false 
    }
});
mongoose.model('articleboard',ArticleBoard);

/****
 * reply_at_id if re: Title happend
 * link_id :unique and simple 
 */
var Articles = new Schema({
    at_id  : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    is_reply    : {
        type    : Boolean,
        default : false
    },
    reply_atid  : {
        type    : String,
        default : null
    },
    user_id     : String,
    title       : String,
    content     : String,
    read_count  : Boolean,
    pass_on_count: String,
    link_id     : String,
    user_ip     : String,
    hide_user   : Boolean,
    deleted     :  {
        type    : Boolean,
        default : false 
    }
});
mongoose.model('articles',Articles);


/****
 *  floor is about floor number of message
 */
var ArticleMessage = new Schema({
    am_id  : {
        type    : String,
        trim    : true,
        required: true,
        unique  : true

    },
    article_id  : {
        type    : String,
        trim    : true,
        required: true

    },
    createdAt   : {
        type    : Date,
        default : Date.now
    },
    updatedAt   : {
        type    : Date,
        default : Date.now
    },
    user_id     : String,
    hide_user   : Boolean,
    content     : String,
    read_count  : Boolean,
    floor       : Number,
    is_reply    : {
        type    : Boolean,
        default : false
    },
    reply_floor : {
        type    : Number,
        default : 0
    },
    deleted     :  {
        type    : Boolean,
        default : false 
    }
});

mongoose.model('articlemessage',ArticleMessage);
