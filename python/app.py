from flask import Flask, jsonify, request, abort
from newspaper import Article
from langdetect import detect
from sklearn.feature_extraction.text import TfidfVectorizer

from model import predictResult
from web_scraper import scrape

import pickle, re, json

# tf_idf = pickle.load(open("history_tfidf.pkl", "rb"))
# svm = pickle.load(open("histroy_svm.pkl", "rb"))
# naive_bayes = pickle.load(open("history_naive_bayes.pkl","rb"))

tf_idf = pickle.load(open("models/tfidf.pkl", "rb"))
svm = pickle.load(open("models/SVM.pkl", "rb"))
naive_bayes = pickle.load(open("models/naive_bayes.pkl","rb"))
random_forest = pickle.load(open("models/random_forest.pkl", "rb"))
adaboost = pickle.load(open("models/adaboost.pkl", "rb"))
logistic_regression = pickle.load(open("models/logistic_regression.pkl", "rb"))
basic_neural_network = pickle.load(open("models/basic_neural_network.pkl", "rb"))

app = Flask(__name__)

@app.route('/api/extract', methods = ['POST'])
def index():
	#error handling yet to be done
	print("Inside extraction")
	print(request)
	return scrape(request)
	

@app.route('/api/naive', methods = ['POST'])
def predNaive():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, naive_bayes)

@app.route('/api/svm', methods = ['POST'])
def predSvm():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, svm)

@app.route('/api/adaboost', methods = ['POST'])
def predAda():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, adaboost)

@app.route('/api/rf', methods = ['POST'])
def predRF():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, random_forest)

@app.route('/api/logistic', methods = ['POST'])
def predLog():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, logistic_regression)

@app.route('/api/nn', methods = ['POST'])
def predNN():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	return predictResult(text, tf_idf, basic_neural_network)

@app.route('/api/all', methods = ['POST'])
def all():
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	ml = {}
	ml['nn'] = predictResult(text, tf_idf, basic_neural_network).json['result']
	ml['logistic'] = predictResult(text, tf_idf, logistic_regression).json['result']
	ml['rf'] = predictResult(text, tf_idf, random_forest).json['result']
	ml['ada'] = predictResult(text, tf_idf, adaboost).json['result']
	ml['svm'] = predictResult(text, tf_idf, svm).json['result']
	ml['naive'] = predictResult(text, tf_idf, naive_bayes).json['result']
	print(ml)
	return jsonify(ml)

if __name__ == "__main__":
	app.run(debug=True)