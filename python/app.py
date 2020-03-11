from flask import Flask, jsonify, request, abort
from newspaper import Article
from langdetect import detect
from urllib.parse import urlparse
from iso639 import languages
from sklearn.feature_extraction.text import TfidfVectorizer

# from model import predictResult

import pickle
import re

tf_idf = pickle.load(open("tfidf.pkl", "rb"))
svm = pickle.load(open("svm.pkl", "rb"))
naive_bayes = pickle.load(open("naive_bayes.pkl","rb"))

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
	print("Article Title")
	title = article.title

	#hasImage in article
	print("Has Image")
	hasImage = 0
	if article.images:
		hasImage = 1

	#language of article
	print("Language of article")
	language = detect(text)

	#mainsite URL
	#find a better way than [4:]
	print("Main Site URL")
	mainSiteURL = (urlparse(url).netloc)[4:]

	##extract keywords
	print("Keyword extraction")
	print(article.keywords)

	return jsonify(
		authors = authors,
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
	tfidf = tf_idf
	text_features = tfidf.transform([text])
	print(text_features.shape)
	# print(text_features)
	naive_result = naive_bayes.predict(text_features)
	# print(naive_result)
	return jsonify(naive_result[0])

@app.route('/api/svm', methods = ['POST'])
def predSvm():
	print(request)
	if not request.json or not 'text' in request.json:
		abort(400)
	text = re.sub(r'\d+','', request.json['text'])
	tfidf = tf_idf
	text_features = tfidf.transform([text])
	print(text_features.shape)
	# print(text_features)
	svm_result = svm.predict(text_features)
	# print(naive_result)
	return jsonify(svm_result[0])

if __name__ == "__main__":
	app.run(debug=True)