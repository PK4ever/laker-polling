angularApp
	.factory('SocketIO', function (socketFactory) {
        var socket = socketFactory();
        socket.forward('broadcast');
        socket.forward('numConnectedClients');
        socket.forward('listNumCurrentViewers');
        socket.forward('list_newItem')
        return socket;
    })