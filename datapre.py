# -*- coding: utf-8 -*-
"""
Created on Wed Oct  9 14:55:36 2019

@author: Avinash
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
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

#Text
d_copy['text'] = d_copy['text'].str.lower() #lowercase
d_copy['text'] = d_copy['text'].str.replace(r'[^\w\s]+', '') #punctuations
d_copy['text'] = d_copy['text'].str.strip() #leading and ending white spaces

#Saving d_Copy as csv
d_copy.to_csv(r'C:\Users\Administrator\Downloads\BE Project\Datasets\Getting real with Fake News\kaggle_gr_clean.csv')

#independent variable
y=d_copy.FakeNews
#dependent variable
x=d_copy.drop('FakeNews',axis=1)
#dividing into test and training set
from sklearn.cross_validation import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.20)





 

