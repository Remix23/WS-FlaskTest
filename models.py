from app import db
from datetime import datetime

class Measurement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_station = db.Column(db.String(50), nullable=False)
    temp = db.Column(db.Float, nullable=False)
    pres = db.Column(db.Float, nullable=False)
    hum = db.Column(db.Float, nullable=False)
    batV = db.Column(db.Float, nullable=False)
    RSSI = db.Column(db.Float, nullable=False)
    date_received = db.Column(db.DateTime, default=datetime.now) #when was sent from raspberry
    date_added = db.Column(db.DateTime, default=datetime.now) #when server added it to database

    def __repr__(self):
        return '<Measurement %r>' % self.id

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(100), nullable=False)

db.create_all()