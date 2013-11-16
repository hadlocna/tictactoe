var peer = new Peer({
  key: 'ry9t770xq4hx5hfr'
});
// peer.on('open', function(id) {
//   console.log('My peer ID is: ' + id);
// });

peer.on('connection', function(conn) {
  console.log("yippee!");

  conn.on('open', function(){
    conn.send("hello other browser!");
    $(".space").click(function() {
        var data = { "p": $( this ).index() + 1 }
        conn.send(data);
      })

    conn.on('data', function(data){
      $(".space:nth-child(" + data.p + ")").append("<p>O</p>");

      console.log('Received', data)
    })
  })
  // conn.send("hello other browser!");
})


peer.on('open', function(id) {
  if ($(".board").data("p-id") !== "") {
    var pId = $(".board").data("p-id");
  } else {
    $.post("/pid", {
      pid: id
    });
  }

  if (pId) {
    var conn = peer.connect(pId);
    conn.on('open', function() {
      $(".space").click(function() {
        var data = { "p": $( this ).index() + 1 }
        conn.send(data);
      })

      conn.on('data', function(data) {
        console.log('Received', data);
        $(".space:nth-child(" + data.p + ")").append("<p>O</p>");
      });
    })
  }
});
