import tornado.web

class NotFoundHandler(tornado.web.RequestHandler):
    def prepare(self):
        self.set_status(404)
        self.render("404.html")