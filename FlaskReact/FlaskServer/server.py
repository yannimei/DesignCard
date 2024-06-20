from flask import Flask, request, jsonify
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)

def load_templates(filename):
    with open(filename, 'r') as file:
        templates = file.readlines()
    # Strip whitespace and newline characters
    templates = ''.join(templates).strip()
    return templates

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
    

    templates_file = 'example_template.txt'
    prompt_templates = load_templates(templates_file)
    full_prompt = prompt_templates.format(user_question)

    print(prompt_templates)


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": full_prompt}],
    )
    
    if response.choices is not None:
        answer = response.choices[0].message.content.strip()
    else:
        answer = 'No response'
    return jsonify({'answer': answer}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000) #change port for access within eduroam