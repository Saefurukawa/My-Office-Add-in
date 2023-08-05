import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
import nltk
import re
import json
import joblib
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
from nltk.stem.porter import PorterStemmer


data = pd.read_csv('./datasets/Phishing_Email.csv',index_col=[0])

corpus = []
for text in data['Email Text']:
    email = re.sub('[^a-zA-Z]', ' ', str(text))
    email = email.lower()
    email = email.split()
    stemmer = PorterStemmer() #stemming
    email = [stemmer.stem(word) for word in email if word not in set(stop_words)]
    email = ' '.join(email)
    corpus.append(email)

cv = CountVectorizer(max_features = 10000)
X = cv.fit_transform(corpus).toarray()
y = data.iloc[:, -1].values

# Save preprocessed data as a JSON file
#preprocessed_data = {"X": X.tolist(), "y": y.tolist()}
#with open('preprocessed_data.json', 'w') as file:
    #json.dump(preprocessed_data, file)

# Train and test data split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 5)

from sklearn.naive_bayes import MultinomialNB, ComplementNB, BernoulliNB

#Accuracy score: 95.20 %
complementNB_model = ComplementNB(
    alpha = 0.1,
    fit_prior = True,
)
complementNB_model.fit(X_train, y_train)

# #Accuracy score: 95.17 %
# multinomialNB_model = MultinomialNB(
#     alpha = 0.1,
#     fit_prior = False,
# )
# multinomialNB_model.fit(X_train, y_train)

# #Accuracy score: 89.17 %
# bernoulliNB_model = BernoulliNB(
#     alpha = 0.1,
#     fit_prior = True,
# )
# bernoulliNB_model.fit(X_train, y_train)


#Save the model using joblib
#joblib.dump(complementNB_model, "complementNB_model.joblib")
#joblib.dump(multinomialNB_model, "multinomialNB_model.joblib")
#joblib.dump(bernoulliNB_model, "bernoulliNB_model.joblib")
joblib.dump(cv, 'count_vectorizer.joblib')
#import onnx
i#mport onnxruntime as ort
#import skl2onnx

# Convert the scikit-learn model to ONNX format
#from skl2onnx.common.data_types import FloatTensorType

# Convert sklearn model to ONNX
#initial_type = [('input', FloatTensorType([None, X_train.shape[1]]))]
#onnx_model = skl2onnx.convert_sklearn(complementNB_model, initial_types=initial_type)


# Save the ONNX model to a file
#onnx.save_model(onnx_model, "model.onnx")
