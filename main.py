import os

import tornado.ioloop
import tornado.web

from pymongo import MongoClient

from routes.index import IndexHandler
from routes.login import LoginHandler
from routes.logout import LogoutHandler
from routes.signup import SignupHandler
from routes.projects import ProjectHandler, CreateProjectHandler

resources = os.path.join(os.path.dirname(__file__), 'resources')
templates = os.path.join(os.path.dirname(__file__), 'resources/views')

mongouri = os.getenv("MONGO_URI", "127.0.0.1:3306")
client = MongoClient(mongouri)

projectDbProvider = dict(database = client.portfolio.projects)
authDbProvider = dict(database = client.portfolio.users)

def make_app():
    settings = dict(
      debug=True,
      template_path=templates,
      cookie_secret='tempSecret123',
      login_url="/login",
    )
    
    return tornado.web.Application([
        (r"/", IndexHandler),
        (r"/projects", IndexHandler),
        (r"/login", LoginHandler, authDbProvider),
        (r"/logout", LogoutHandler),
        (r"/signup", SignupHandler, authDbProvider),
        (r"/api/projects", ProjectHandler, projectDbProvider),
        (r"/projects/create", CreateProjectHandler, projectDbProvider),
        (r"/resources/(.*)", tornado.web.StaticFileHandler, {"path": resources}),
    ], **settings)

if __name__ == "__main__":
    app = make_app()
    app.listen(os.getenv("PORT", 8080))
    tornado.ioloop.IOLoop.current().start()