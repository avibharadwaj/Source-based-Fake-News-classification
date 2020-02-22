from flask import jsonify
import pickle

tf_idf = pickle.load(open("tfidf.pkl", "rb"))
svm = pickle.load(open("svm.pkl", "rb"))
naive_bayes = pickle.load(open("naive_bayes.pkl","rb"))

def predictResult(text, model):
    return jsonify(model.predict(text)[0])