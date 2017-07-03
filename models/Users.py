import hashlib, binascii

class Users:
    
    def __init__(self, database):
        self.users = database
        
    
    def login(self, username, password):
        user = self.get(username)
        
        return self.check(user, password)
        
    
    def get(self, username):
        user = self.users.find_one({"username": username})
        
        return user
    
    def put(self, user):
        user['password'] = self.hashPassword(user['password'])
        
        id = self.users.insert_one(user).inserted_id
        
        return id
        
    def check(self, user, password):
        
        if not user or not user['password'] == self.hashPassword(password):
           return 0
           
        return 1
    
    def hashPassword(self, password):
        dk = hashlib.pbkdf2_hmac('sha256', password.encode(), 'temporary salt'.encode(), 100000)
        
        hashed = binascii.hexlify(dk)
        
        return hashed.decode('utf-8')