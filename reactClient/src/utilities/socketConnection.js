import io from  'socket.io-client'
let socket = io.connect('http://localhost:8181');
socket.emit('clientAuth', 'adsf87637uj3o9')

// console.log(socket)

export default socket;