import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import tornado.web

from pymongo import MongoClient
from bson.json_util import dumps, loads

from models.Projects import Projects

class ProjectHandler(tornado.web.RequestHandler):
    def initialize(self, database):
        self.projects = Projects(database)
    
    def get(self):
        p = self.projects.getAll()
        
        res = dumps(p)
        
        self.write(res)
        
class CreateProjectHandler(tornado.web.RequestHandler):
    def initialize(self, database):
        self.projects = Projects(database)
    
    def post(self, **kwargs):
        data = self.get_argument('data', '{}')
        
        json = loads(data)
        
        id = self.projects.put(json)
        
        self.write('{"id": "%s"}' % str(id))