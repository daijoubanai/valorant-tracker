from flask import Flask, jsonify, request, render_template, make_response

import json
import sqlite3
from sqlite3 import Error


app = Flask(__name__)

DATABASE = 'statsDB.db'


@app.route('/')
def home():
    return render_template('index.html')

# insert game data into db
@app.route('/getData', methods=['POST'])
def getData():

    req = request.get_json()

    print("flask function")
    gData = req['gameData']

    values = '''INSERT INTO STATS(Game_Mode, Map, Result, Agent, Headshot_Percent, ADR, Combat_Score) VALUES('''
    values += '\'' + gData['gameType'] + '\',\'' + gData['map'] + '\',\'' + gData['result'] + '\',\'' + gData['agent'] + '\',\'' + gData['hs'] + '\',\'' + gData['adr'] + '\',\'' + gData['combatScore']
    values += '\')'

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(values)
    conn.commit()
    conn.close()

    res = make_response(jsonify({"message": "ok"}), 200)
    return res
    
# return data for given game mode
@app.route('/returnData', methods=['POST'])
def returnData():

    req = request.get_json()
    print(req)
    mode = req['mode']
    print(mode)
    
    query = 'SELECT * FROM STATS WHERE Game_Mode = \'' + mode + '\''
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchall()
    conn.close()
    
    return jsonify(data)

# get win rate as percent
@app.route('/summaryData', methods=['POST'])
def returnSummary():
    req = request.get_json()
    query = '''SELECT (CAST(a as float)/CAST(b as float))*100 as WR FROM
            (SELECT
	        (SELECT count(Result) as WR FROM STATS WHERE Game_Mode = 'competitive' AND Result = 'win') as a,
	        (SELECT count(Result) FROM STATS WHERE Game_Mode = 'competitive') as b
            )'''
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(query)
    data = cur.fetchall()
    conn.close()

    print(data)

    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)


