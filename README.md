# AIdetection
Crafting an Outlook mail plug-in that detects AI-generated phishing emails.

1. Processing the training data
The training dataset includes the email content (X_train) and label of email being ham or spam (y_train). I used stemming and vectorizing to preprocess the data.


2. Finding models

I tested accuracy for four models, gaussian, multinomial, complement, and bernaulli. 
--------------------
Using : gaussian
Confusion matrix for : gaussian
[[1391  105]
 [ 403 1831]]
Accuracy score for : gaussian
0.8638069705093834
--------------------
--------------------
Using : multinomial
Confusion matrix for : multinomial
[[1406   90]
 [  90 2144]]
Accuracy score for : multinomial
0.9517426273458445
--------------------
--------------------
Using : compliment
Confusion matrix for : compliment
[[1416   80]
 [  99 2135]]
Accuracy score for : compliment
0.9520107238605898
--------------------
--------------------
...
 [ 358 1876]]
Accuracy score for : bernaulli
0.8916890080428954
--------------------
Based on this, I concluded that complementNB is the best model. In my office-add-in project, I added complementNB model with alpha = 0.1 and fit_prior = True, BernouliNB model with alpha = 0.1 and fit_prior = True, and multinomialNB model with alpha = 0.1 and fit_prior = False.

3. Testing the model
Jupyter Notebook shows an example of how the sample email content can be processed by complementNB model to be labelled as either spam or ham. The email content is first stemmed and vectorized and is passed onto the trained model.

4. Office-Add in
A user will be able to sideload the add-in and run the phishing email detection on the email content. The reading taskpane will show the model's prediction. 

One challenge is that the original models are all trained in python, but the Office-Add-in taskpanes are all written in Javascript, and most of Python libraries used during the model training are not available directly in Javascript. For this reason, I created a Python backend (Flask) to host scikit-learn models and provide an API for making predictions. 