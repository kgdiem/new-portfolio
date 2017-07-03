import sys
import os

import tornado.web

from pymongo import MongoClient
from bson.json_util import dumps, loads

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from routes.baseHandler import BaseHandler
from models.Projects import Projects

class ProjectHandler(tornado.web.RequestHandler):
    def initialize(self, database):
        self.projects = Projects(database)
    
    def get(self):
        p = self.projects.getAll()
        
        res = dumps(p)
        
        self.write(res)
        
class CreateProjectHandler(BaseHandler):
    def initialize(self, database):
        self.projects = Projects(database)
    
    @tornado.web.authenticated
    def get(self):
        self.render('submit.html')
    
    @tornado.web.authenticated
    def post(self, **kwargs):
        project = dict()
        
        project['name'] = self.get_argument('name', '')
        project['category'] = self.get_argument('category', '')
        project['url'] = self.get_argument('url', '')
        project['img'] = self.get_argument('img', '')
        project['git'] = self.get_argument('git', '')
        
        attrs = self.get_argument('attrs', '').split(',')
        
        project['attrs'] = attrs
        
        id = self.projects.put(project)
        
        self.write('{"id": "%s"}' % str(id))