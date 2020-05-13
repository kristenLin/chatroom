var express = require('express');
var router  = express.Router();




router.get('/', function(req, res){
    console.log("HELLO ARTICELs")
    
    res.send("HELLO ARTICELs");
   
});



module.exports = router;