from flask import Flask, request, jsonify
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)

#Members API Route
@app.route("/home")
def cards():
    return {"cards": ["card1","card2","card3"]}

@app.route("/answer", methods=["GET", "POST"])
def answer():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "what is design card"}],
        stream=True
    )
    response_content = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            response_content += chunk.choices[0].delta.content  # Accumulate responses
    
    return response_content, 200, {"Content-Type": "text/plain"}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000) #change port for access within eduroam