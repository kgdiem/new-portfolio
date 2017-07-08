import os
import sys
from tornado.testing import AsyncHTTPTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import main

class TestProjects(AsyncHTTPTestCase):
    def get_app(self):
        return main.make_app()
        

    def test_get_all_projects(self):
        response = self.fetch('/projects')
        
        self.assertEqual(response.code, 200)
        
        
    def test_auth_for_project_submission(self):
        response = self.fetch('/projects/create', method="GET", follow_redirects=False)
        
        self.assertEqual(response.code, 302)
        
        self.assertTrue(
            response.headers['Location'].endswith('/login?next=%2Fprojects%2Fcreate'),
            "response.headers['Location'] did not end with /login. Got: %s" % response.headers['Location']
        )
        
    def test_auth_for_project_creation(self):
        response = self.fetch('/projects/create', method="POST", follow_redirects=False)
        
        self.assertEqual(response.code, 302)
        
        self.assertTrue(
            response.headers['Location'].endswith('/login?next=%2Fprojects%2Fcreate'),
            "response.headers['Location'] did not end with /login. Got: %s" % response.headers['Location']
        )