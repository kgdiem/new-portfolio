import os
import sys
from tornado.testing import AsyncHTTPTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import main

class TestIndex(AsyncHTTPTestCase):
    def get_app(self):
        return main.make_app()

    def test_homepage_status(self):
        response = self.fetch('/')
        
        self.assertEqual(response.code, 200)
        
        with open('../resources/views/index.html') as file:
            
            self.assertEqual(response.body, file.read())
            
        self.stop()