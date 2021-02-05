from flask import Flask, request, g
from flask_cors import CORS, cross_origin
import sqlite3
import json
from database import select_news_by_source_date, vote_news, select_vote_by_news_id

app = Flask(__name__)
cors = CORS(app)
database = 'db/news.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(database)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/api/v1/headlines', methods=["GET"])
@cross_origin()
def get_headlines():
    """
    Get headlines based on news source
    """
    source = request.args.get('source')
    date = request.args.get('date')
    return json.dumps(select_news_by_source_date(get_db(), source, date))

@app.route('/api/v1/votes', methods=["GET"])
@cross_origin()
def get_votes():
    news_id = request.args.get('news_id')
    return json.dumps(select_vote_by_news_id(get_db(),news_id))

@app.route('/api/v1/votes', methods=["POST"])
@cross_origin()
def vote_headlines():
    news_id = request.json['news_id']
    vote = request.json['vote']
    vote_news(get_db(),news_id,vote)
    return 'Received Vote'

if __name__ == '__main__':
    app.run(debug=True)