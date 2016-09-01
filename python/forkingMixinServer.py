from SocketServer import TCPServer,ForkingMinIn, StreamRequestHandler

class Server(ForkingMixIn, TCPServer): pass

class Handler(StreamRequestHandler):
      def handle(self):
          addr = self.request.getpeername()
	  print 'Gop connection from', addr
	  self.wfile.write('Thank you for connecting')

server = TCPServer(('', 1234), Handler)
server.serve_forever()
