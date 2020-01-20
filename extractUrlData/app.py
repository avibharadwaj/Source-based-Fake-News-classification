from flask import Flask
from newspaper import Article
from langdetect import detect
from urllib.parse import urlparse
import re

app = Flask(__name__)

@app.route('/')
def index():
	print("Inside extraction")
	url = 'https://www.washingtonpost.com/business/economy/amazon-is-the-third-superpower-heightening-the-drama-of-the-us-china-trade-war/2019/05/17/3b274486-7720-11e9-b7ae-390de4259661_story.html'
	article = Article(url)
	
	article.download()
	article.parse()
	
	#authors of article
	print("Authors:")
	for x in article.authors:
		print( x )
	
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
	print(article.title)

	#hasImage in article
	print("Has Image")
	if article.images:
		print("Yes")
	else:
		print("No")

	#language of article
	print("Language of article")
	print(detect(text))

	#mainsite URL
	#find a better way than [4:]
	print("Main Site URL")
	print((urlparse(url).netloc)[4:])

	return "Hello, World! works"

if __name__ == "__main__":
	app.run(debug=True)