
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
 *  is_group -> one on one, 2 > people
 *  to_chat_id -> reply message
 *  read_count -> how many people read
 *  deleted -> delete
 *  no update ?
 */

 1. get Caht room list:

 /** get user info */
 get("aboutuser/${u_id}/cahtroom/list/", (req,res)=>{
    collection:aboutuser
    key: user_id
    return: 
        chatroom_ids 
        => 
        /** get chatroom info */
        get("chats/${room_id}/chatrooms/info/", (req,res)=>{
            collection:chatroom
            key: room_id
            return:
                createdAt
                updatedAt
                is_group
                member_ids
                photo
                title
                deleted
        })
   
})
2. get Chat message:
 /** 2.1 get user ids in rooms  */
get("chats/${room_id}/chatrooms/info/", (req,res)=>{
    collection:chatroom
    key: room_id
    return:
        createdAt
        updatedAt
        is_group
        member_ids
            =>member_ids
            get("users/${u_id}/name/photo/", (req,res)=>{
                return user name and photo
            }
        photo
        title
        deleted
})
 /** 2.2 get chat message info */
 get("chats/${room_id}/messages", (req,res)=>{
    collection:chats
    key: room_id
    return: 
        chat_ids
        room_id
        message     : String,
        from_id     : String,
            mapping 2.1 name/photo
        to_chat_id  : String,
            mapping 2.1 name/photo
        read_count  : {
            type    : Number,
            default : 0
        },
        deleted     :  {
            type    : Boolean,
            default : false 
        }
   
})



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
 *  ADD: firends_ids, chatrooms_ids
 *  user_id -> system
 *  identity -> a identity code by system
 *  user_name -> a nickname
 *  signup_code -> for registry from email
 */

1. get friend list
get("aboutuser/${u_id}/friend/list/", (req,res)=>{
    DB: aboutuser
    key: u_id
    return: 
    friends_ids : [String],
    get("users/${u_id}/simple_intro/", (req,res)=>{
        DB: users
        key: u_id
        return: 
        avatar      : String,
        user_name
        status_recent: String,
    })

})

