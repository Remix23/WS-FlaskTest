from flask import Flask, url_for, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import *
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

db = SQLAlchemy(app)



@app.route('/', methods=['POST', 'GET'])
def home_page ():
    if request.method == 'POST':
        newMes = Measurement(from_station=request.form['from'], temp=request.form['temp'], pres=request.form['pres'], hum=request.form['hum'], batV=request.form['batV'], RSSI=request.form['RSSI'], date_received=request.args.get('date_received'))
        try:
            db.session.add(newMes)
            db.session.commit()
            return redirect('/data/')
        except:
            return "There was an issue"
    else:
        return render_template('index.html')

@app.route('/data/')
def data ():
    data = Measurement.query.order_by(Measurement.date_received).all()
    data = data[::-1]
    return render_template('data.html', data=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
