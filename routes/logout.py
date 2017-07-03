import sys
import os

import tornado.web

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from routes.baseHandler import BaseHandler

class LogoutHandler(BaseHandler):
    
    def get(self):
        if not self.current_user:
            self.redirect('/')
            return
        
        self.clear_all_cookies()
        
        self.render('login.html')
        