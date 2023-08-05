# AIdetection
Crafting an Outlook mail plug-in that detects AI-generated phishing emails.

1. Processing the training data
   
The training dataset includes the email content (X_train) and label of email being ham or spam (y_train). I used stemming and vectorizing to preprocess the data.

![phishing dataset](https://github.com/Saefurukawa/My-Office-Add-in/assets/123199087/71601091-5313-4562-a3fa-23cfd42957c4)

2. Finding models
   
I tested accuracy for four models, gaussian, multinomial, complement, and bernaulli. 

![Screenshot 2023-08-04 at 9 43 30 PM](https://github.com/Saefurukawa/My-Office-Add-in/assets/123199087/3a11812c-7dab-4fa8-b920-04fc7bf6b258)

Based on this, I concluded that complementNB is the best model. In my office-add-in project, I added complementNB model with alpha = 0.1 and fit_prior = True, BernouliNB model with alpha = 0.1 and fit_prior = True, and multinomialNB model with alpha = 0.1 and fit_prior = False.

3. Testing the model
   
Jupyter Notebook shows an example of how the sample email content can be processed by complementNB model to be labelled as either spam or ham. The email content is first stemmed and vectorized and is passed onto the trained model.

5. Office-Add in
   
A user will be able to sideload the add-in and run the phishing email detection on the email content. The reading taskpane will show the model's prediction. 

Please note that it uses a Python backend (Flask API) to communicate between Python (machine learning models) and Javascript (Office Add-in project). When the user clicks "run" button on Outlook's taskpane, it sends a Post request to Flask API, which processes the data and makes predictions based on the chosen machine learning model. Please run TestFetch.js to test Flask API on a local server. 

Since Flask API is hosted on a local server, the Outlook app won't be able to access the API, purporting to the "Network error". To make this API accessible from Outlook, it's recommended to use services such as AWS to host the API on a public server. (I have not implemented this part in this project). 
