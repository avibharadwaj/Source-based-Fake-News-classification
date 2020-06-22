# -*- coding: utf-8 -*-
"""
Created on Wed Oct  9 14:55:36 2019

@author: Avinash
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
#from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
#import itertools
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
#from sklearn.linear_model import PassiveAggressiveClassifier
#Getting Real With Fake News dataset
#importing the dataset and examining it's characteristics
dataset1=pd.read_csv('fake.csv')
dataset1.shape 
dataset1.ndim
dataset1.info
dataset1.describe
dataset1.isnull()
# filling a null values using fillna()  
dataset1["author"].fillna("No Author", inplace = True)
dataset1["title"].fillna("No Title", inplace = True)
dataset1["domain_rank"].fillna(0, inplace = True)
dataset1["main_img_url"].fillna("No Image URL", inplace = True)
#categories of news
dataset1.type.unique()

#getting frequency count of each category
print(dataset1['type'].value_counts())
#working on copy of dataset for now
d_copy = dataset1.copy()

#categorizing the column 'type' into fake or not
fakeList = ["bs","conspiracy","satire","junksci","fake"]
realList = ["hate","bias","state"]
fakeL=set(fakeList)
d_copy['FakeNews'] = np.where((d_copy.type.isin(fakeL)), 1, 0)

#cleaning text and title in d_copy
#Title
d_copy['title'] = d_copy['title'].str.lower() #lowercase
d_copy['title'] = d_copy['title'].str.replace(r'[^\w\s]+', '') #punctuations
d_copy['title'] = d_copy['title'].str.strip() #leading and ending white spaces
stop = stopwords.words('english')
d_copy['title'] = d_copy['title'].str.replace('\d+', '') #remove numbers
#removing stop words from title body
patt = r'\b(?:{})\b'.format('|'.join(stop))
d_copy['title_without_stopwords'] = d_copy['title'].str.replace(patt, '')
d_copy['title_without_stopwords'] = d_copy['title_without_stopwords'].str.replace(r'\s+', ' ')




#Text
d_copy['text'] = d_copy['text'].str.lower() #lowercase
d_copy['text'] = d_copy['text'].str.replace(r'[^\w\s]+', '') #punctuations
d_copy['text'] = d_copy['text'].str.strip() #leading and ending white spaces
d_copy['text'] = d_copy['text'].str.replace('\d+', '') #remove numbers
#removing stop words from text body
pat = r'\b(?:{})\b'.format('|'.join(stop))
d_copy['text_without_stopwords'] = d_copy['text'].str.replace(pat, '')
d_copy['text_without_stopwords'] = d_copy['text_without_stopwords'].str.replace(r'\s+', ' ')



#Saving d_Copy as csv
d_copy.to_csv(r'C:\Users\Administrator\Downloads\BE Project\Datasets\Getting real with Fake News\kaggle_gr_clean.csv')


#new dataset
dataset2= pd.read_csv(r"C:\Users\Administrator\Downloads\BE Project\Datasets\Getting real with Fake News\final_output1.csv", encoding="latin", index_col=0)
dataset2=dataset2.dropna()
dataset3=dataset2
dataset3=dataset3.drop(['X','author','published','title','text','title_without_stopwords','hasImage','language'],axis=1)
dataset3=dataset3.drop(['main_img_url'],axis=1)

#preprocessing site url
dataset3['site_url'] = dataset3['site_url'].str.lower() #lowercase
dataset3['site_url'] = dataset3['site_url'].str.replace(r'[^\w\s]+', '') #punctuations
dataset3['site_url'] = dataset3['site_url'].str.strip() #leading and ending white spaces
stop = stopwords.words('english')
dataset3['site_url'] = dataset3['site_url'].str.replace('\d+', '') #remove numbers
#removing stop words from title body
patt = r'\b(?:{})\b'.format('|'.join(stop))
dataset3['site_url'] = dataset3['site_url'].str.replace(patt, '')
dataset3['site_url'] = dataset3['site_url'].str.replace(r'\s+', ' ')



#Dependent variable
y=dataset3.label
print(len(set(dataset2.type.values)))
#independent variable
x=dataset3.loc[:,['site_url','text_without_stopwords']]
x['source']= x["site_url"].astype(str) +" "+ x["text_without_stopwords"] 
x=x.drop(['site_url','text_without_stopwords'],axis=1)
x=x.source


#dividing into test and training set
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.40)

#Feature Engineering TF-IDF
tfidf_vect = TfidfVectorizer(stop_words = 'english')
tfidf_train = tfidf_vect.fit_transform(x_train)
tfidf_test = tfidf_vect.transform(x_test)
tfidf_df = pd.DataFrame(tfidf_train.A, columns=tfidf_vect.get_feature_names())


#Naive Bayes
clf = MultinomialNB() 
clf.fit(tfidf_train, y_train)                       # Fit Naive Bayes classifier according to X, y
pred = clf.predict(tfidf_test)                     # Perform classification on an array of test vectors X.
print(pred)
type(tfidf_test)
NBscore = metrics.accuracy_score(y_test, pred)
print("accuracy:   %0.3f" % NBscore)
cm = metrics.confusion_matrix(y_test, pred)
print(cm)



#Support Vector Machine
#fitting SVM to the training set
from sklearn.svm import SVC
classifier=SVC(kernel='linear',random_state=0)
classifier.fit(tfidf_train,y_train)

#predicting the test set results
y_pred=classifier.predict(tfidf_test)
SVMscore=metrics.accuracy_score(y_test,y_pred)
print(y_pred)
print("accuracy:  %0.3f" %SVMscore)
#making the confusion matrix to see how many incorrect values are there
from sklearn.metrics import confusion_matrix
cm=confusion_matrix(y_test,y_pred)
print(cm)

#Random Forest Classifier
from sklearn.ensemble import RandomForestClassifier
Rando= RandomForestClassifier(n_estimators=100)
Rando.fit(tfidf_train,y_train)
y_pred1=Rando.predict(tfidf_test)
RFscore=metrics.accuracy_score(y_test,y_pred1)
print("accuracy:  %0.3f" %RFscore)
print(y_pred1)

#Logistic Regression
from sklearn.linear_model import LogisticRegression
logreg=LogisticRegression(C=1e5)
logreg.fit(tfidf_train,y_train)
y_pred2=logreg.predict(tfidf_test)
LRscore=metrics.accuracy_score(y_test,y_pred2)
print("accuracy:  %0.3f" %LRscore)
print(y_pred2)

#AdaBoost Classifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
Adab= AdaBoostClassifier(DecisionTreeClassifier(max_depth=3),n_estimators=5)
Adab.fit(tfidf_train, y_train)
y_pred3=Adab.predict(tfidf_test)
ABscore = metrics.accuracy_score(y_test,y_pred3)
print("accuracy: %0.3f" %ABscore)
print(y_pred3)

#Neural Network
from sklearn.neural_network import MLPClassifier
N=MLPClassifier(solver='lbfgs', alpha=1e-5,hidden_layer_sizes=(12, 5), random_state=1)
N.fit(tfidf_train,y_train)
y_pred4=N.predict(tfidf_test)
NNscore = metrics.accuracy_score(y_test,y_pred4)
print("accuracy: %0.3f" %NNscore)
print(y_pred4)







 

