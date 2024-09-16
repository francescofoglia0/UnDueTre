from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

mazzo = [
    "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C",
    "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D",
    "1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S",
    "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shuffle', methods=['GET'])
def shuffle_deck():
    random.shuffle(mazzo)
    return jsonify(mazzo)

if __name__ == '__main__':
    app.run(debug=True)
