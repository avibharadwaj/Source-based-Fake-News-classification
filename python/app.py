from flask import Flask, jsonify, request, abort
from newspaper import Article
from langdetect import detect
from urllib.parse import urlparse
from iso639 import languages
from sklearn.feature_extraction.text import TfidfVectorizer

from model import predictResult

import pickle
import re

# tf_idf = pickle.load(open("history_tfidf.pkl", "rb"))
# svm = pickle.load(open("histroy_svm.pkl", "rb"))
# naive_bayes = pickle.load(open("history_naive_bayes.pkl","rb"))

tf_idf = pickle.load(open("tfidf.pkl", "rb"))
svm = pickle.load(open("SVM.pkl", "rb"))
naive_bayes = pickle.load(open("naive_bayes.pkl","rb"))
random_forest = pickle.load(open("random_forest.pkl", "rb"))
adaboost = pickle.load(open("adaboost.pkl", "rb"))
logistic_regression = pickle.load(open("logistic_regression.pkl", "rb"))
basic_neural_network = pickle.load(open("basic_neural_network.pkl", "rb"))

app = Flask(__name__)

@app.route('/api/extract', methods = ['POST'])
def index():
	#error handling yet to be done
	print("Inside extraction")
	print(request)
	if not request.json or not 'url' in request.json:
		abort(400)
	url = request.json['url']
	article = Article(url)
	
	article.download()
	article.parse()
	article.nlp()
	
	print("Publish date:")
	print(article.publish_date)

	#authors of article
	authors = []
	print("Authors:")
	for x in article.authors:
		authors.append( x )
	
	content = []
	lines = article.text.split('\n')
	print("Article text:")
	for x in lines:
		if x != "AD":
			content.append(x)
	
	#text of article
	text = ''.join(content)
	# print(text)

	#title of article
	print("Article Title:")
	title = article.title

	#hasImage in article
	print("Has Image:")
	hasImage = 0
	if article.images:
		hasImage = 1

	#language of article
	print("Language of article:")
	language = detect(text)

	#mainsite URL
	#find a better way than [4:]
	print("Main Site URL:")
	mainSiteURL = (urlparse(url).netloc)[4:]
	print(mainSiteURL)

	##extract keywords
	print("Keyword extraction:")
	print(article.keywords)

	return jsonify(
		authors = article.authors,
		text = text,
		title = title,
		hasImage = hasImage,
		language = (languages.get(alpha2 = language)).name,
		site_url = mainSiteURL,
		published = article.publish_date,
		keywords = article.keywords
	)

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

if __name__ == "__main__":
	app.run(debug=True)