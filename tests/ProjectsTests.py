import os
import sys

from tornado.testing import AsyncHTTPTestCase
from tornado.web import create_signed_value

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import main
from routes.projects import ProjectHandler


class ProjectsTests(AsyncHTTPTestCase):
    def get_app(self):
        return main.make_app()
        

    def test_get_all_projects(self):
        response = self.fetch('/api/projects')
        
        self.assertEqual(response.code, 200)
        
    
    def get_headers(self):
        cookieName = "user"
        
        secure_cookie = create_signed_value(
            self.get_app().settings["cookie_secret"],
            cookieName,
            "1234")
            
        headers = {'Cookie': '='.join((cookieName, secure_cookie))}
        
        return headers