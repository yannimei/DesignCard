from flask import Flask
from openai import OpenAI


app = Flask(__name__)

#Members API Route
@app.route("/home")
def cards():
    return {"cards": ["card1","card2","card3"]}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000) #change port for access within eduroam