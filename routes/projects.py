import sys
import os

from .baseHandler import BaseHandler

from pymongo import MongoClient
from bson.json_util import dumps, loads

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from routes.baseHandler import BaseHandler
from models.Projects import Projects

class ProjectHandler(BaseHandler):
    def initialize(self, database):
        self.projects = Projects(database)
    
    def get(self):
        p = self.projects.getAll()
        
        res = dumps(p)
        
        self.write(res)
    
