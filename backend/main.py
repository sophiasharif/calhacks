from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    return "bucks in 6"

@app.route("/get/<query>", methods=['GET'])
def testGet(query):
    return ("your query was " + query)

@app.route("/post/<query>", methods=['POST'])
def testPost(query):
    return ("big chungus idk bruh")

if __name__ == ("__main__"):
    app.run()