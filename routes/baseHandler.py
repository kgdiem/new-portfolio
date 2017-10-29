import os
import tornado.web

class BaseHandler(tornado.web.RequestHandler):
    def write_error(self, status_code, **kwargs):
        if os.getenv("ENVIRONMENT", "PROD") == "DEV" or (self.settings.get("serve_traceback") and "exc_info" in kwargs):
            self.set_header('Content-Type', 'text/plain')
            for line in traceback.format_exception(*kwargs["exc_info"]):
                self.write(line)

            self.finish()
        else:    
            self.render('error.html')