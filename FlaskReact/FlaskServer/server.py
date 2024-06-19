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
    data = request.get_json()
    if data and 'question' in data:
        user_question = data['question'].strip()
    else:
        user_question = 'what is design card'  # Default question if 'question' is not provided
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_question}],
    )
    
    if response.choices is not None:
        answer = response.choices[0].message.content.strip()
    else:
        answer = 'No response'
    return jsonify({'answer': answer}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000) #change port for access within eduroam