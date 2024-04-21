from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/data/<ticker>')
def get_data(ticker):
    data = yf.download(ticker, period='3y')['Adj Close']
    return jsonify(list(zip(data.index.strftime('%Y-%m-%d'), data.values)))

if __name__ == '__main__':
    app.run(debug=True)
