var peer = new Peer({key: 'ry9t770xq4hx5hfr'});
  // peer.on('open', function(id) {
  //   console.log('My peer ID is: ' + id);
  // });

peer.on('connection', function(conn){
  console.log("yippee!");
})

peer.on('open', function(id) {
  if ($( ".board" ).data( "p-id" ) !== "") {
    var pId = $(".board" ).data("p-id");
    var connection = peer.connect(pId);

  } else {
    // send p-id to server
    console.log(id);
    $.post("/pid", {pid: id});
  }
})
