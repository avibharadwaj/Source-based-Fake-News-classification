from flask import jsonify
import pickle
import h5py as h5

tf_idf = pickle.load(open("tfidf.pkl", "rb"))
svm = pickle.load(open("svm.pkl", "rb"))
naive_bayes = pickle.load(open("naive_bayes.pkl","rb"))
nn = h5.File("nn.h5", "r")

def predictResult(text, model):
    return jsonify(model.predict(text)[0])