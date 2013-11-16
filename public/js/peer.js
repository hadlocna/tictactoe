var peer = new Peer({key: 'ry9t770xq4hx5hfr'});
  // peer.on('open', function(id) {
  //   console.log('My peer ID is: ' + id);
  // });

  peer.on('open', function(id) {
    if ($( ".board" ).data( "p-id" ) !== "") {
      // initiate connection
    } else {
      // send p-id to server
      console.log(id);
      $.post("/pid", {pid: id});
    }
  })
