class Projects:
    
    def __init__(self, database):
        self.projects = database
        
    def getAll(self):
        return self.projects.find()
        
    def get(self, id):
        return self.projects.find_one({'id': id})
        
    