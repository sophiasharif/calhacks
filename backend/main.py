from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    return "bucks in 6"



if __name__ == ("__main__"):
    app.run()