var mongoose = require('mongoose');
var Schema   = mongoose.schema;

/*****
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

/****
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
})


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
    nationality : String,
    place_residence: String,
    recommend_id: String,
    signup_code : String,
    upload_avatar_number : Number,
    avatar      : String,
    national_code: String,
    gender      : String,
    gender_tag  : String,
    gender_love : String,
    place_residence: String,
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
})



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

    
})

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
    
})






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
    
})


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
    
})

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
    to_gender_love: String,
    read_permission:{
        type    : String,
        default : "everyone"
    },
    deleted     :  {
        type    : Boolean,
        default : false 
    }
})

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
})

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
})

mongoose.model('Chat', Chat);
mongoose.connect('mongodb//localhost/chats');