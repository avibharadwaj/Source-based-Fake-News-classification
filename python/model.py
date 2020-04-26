from flask import jsonify
import pickle

def predictResult(text, tfidf, model):
	text_features = tfidf.transform([text])
	print(text_features.shape)
	# print(text_features)
	result = model.predict(text_features)
	# print(naive_result)
	return jsonify(result[0])