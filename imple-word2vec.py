from fakenews1 import Word2Vec
import pandas as pd
import numpy as np

#filename = 'final_output1.csv'
#
#with open(filename) as f:
#    lines = f.readlines()

d = pd.read_csv('final_output1.csv',encoding = 'latin1')
d.dropna()
#lines = d.values.tolist()

#print(type(lines))
#print(lines)

corpus = d.text_without_stopwords.to_string()
#print(corpus)
skipg = Word2Vec(method="skipgram", corpus=corpus,
                window_size=1, n_hidden=2,
                n_epochs=30, learning_rate=0.1)
W1, W2, loss_vs_epoch = skipg.run()

x = np.array([[0, 1, 0, 0, 0, 0, 0]])
y_pred = skipg.predict(x, W1, W2)
print(("prediction_skipgram = [" + 6*"{:.3e}, " + "{:.3e}]").format(*y_pred))