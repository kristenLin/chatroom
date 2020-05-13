
const ApiPath = 'http://localhost:3010/';

//articleBoard

var aticleBoard = async () => {
    
    $.ajax({
        url: 'articleBoards',
        dataType: "text",
        timeout: 15000 // adjust the limit. currently its 15 seconds
    })
    .done(function(data) {
        console.log( "second success: " +data);
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
        console.log( "complete" );
      });

   
};


 aticleBoard();