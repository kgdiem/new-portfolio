import sys
import os

import tornado.web

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from routes.baseHandler import BaseHandler
from models.Users import Users

class SignupHandler(BaseHandler):
    def initialize(self, database):
        self.users = Users(database)
    
    def get(self):
        if self.current_user:
            self.redirect('/')
            return
        
        self.render('signup.html')
        
    def post(self, **kwargs):
        if self.current_user:
            self.redirect('/')
            return
        
        username = self.get_argument("username", "")
        password = self.get_argument("password", "")
        confirm = self.get_argument("confirm", "")
        
        if(confirm == password):
            self.users.put({"username": username, "password": password})
            self.set_secure_cookie("user", username)
            self.redirect("/")
        else:
            self.render('signup.html')