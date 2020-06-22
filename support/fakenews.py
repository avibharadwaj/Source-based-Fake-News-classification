import collections
import pandas as pd
import numpy as np
import tensorflow as tf
#import csv
#df = pd.read_csv('cars_sample.csv',delimiter = ',',encoding = "utf-8")
#print (df)
#filename = 'final_output1.csv'
#d = pd.read_csv('final_output1.csv',encoding = 'latin1')
#print(d)
def read_data(filename):
    d = tf.compat.as_str(filename.read()).split()
    print(type(d))
    return d
d = read_data('final_output1.csv')

d.dropna()
print(d)

def collect_data(words,n_words):
    #Process raw inputs into a dataset
    count = [['UNK',-1]]
    count.extend(collections.Counter(words).most_common(n_words-1))
    dictionary = dict()
    for word, _ in count:
        dictionary[word] = len(dictionary)
    data = list()
    unk_count = 0
    for word in words:
        if word in dictionary:
            index = dictionary[word]
        else:
            index = 0
            unk_count += 1
        data.append(index)
    count[0][1] = unk_count
    reverse_dictionary = dict(zip(dictionary.values(),dictionary.keys()))
    return data, count, dictionary, reverse_dictionary

vocab_size = 10000
data, count, dictionary, reverse_dictionary = collect_data(d,vocab_size)

window_size = 3
vector_dim = 300
epochs = 1000000

valid_size = 16
valid_window = 100
valid_examples = np.random.choice(valid_window,valid_size,replace = False)