#Import SK learn libary for machine learning
from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split

import pickle #Used to serialise the model to be loaded later saves retraining everytime the program is rerun

import sys #Used to fetch command line arguments


def train_model_and_save(data_set_filepath, model_filename):
    print("=== Start Training ===")

    print("Loading Dataset from path: " + data_set_filepath)
    #Loads data from a file called dataset.txt
    #(this is actually a svmlight file)
    #this is a file used to represent a sparse matrix (sparse matrix being a matrix with many 0s)
    #this matrix represents the dataset we'll use to train
    #in_data is the inputs we'll take and output_data are like the results of the data.
    #Think in data as happiness etc. out data is probability of success
    in_data, out_data = datasets.load_svmlight_file(data_set_filepath)


    print("Dataset Loaded!")
    #Logistic Regression Algorithm/Object to load
    logisitc_regression = linear_model.LogisticRegression(warm_start = True, max_iter = 2000) #Warm start makes the model reuse old training data
    #Maybe use solver='sag' inside

    #Seperate training data into a train test Split
    #All this does is take our input data and our output data and split it into a set of training data
    #and a set of data the model hasn't seen
    in_train, in_test, out_train, out_test = train_test_split(in_data, out_data, test_size=0.2)


    print("=== Start Training Linear Regression Model ===")
    #Train model
    #This function trains on the training data
    trained_model = logisitc_regression.fit(in_train, out_train);

    #make predictions based on the test data
    predictions = trained_model.predict(in_test)

    #get the size of the test data for a loop (I bodged this code)
    size = len(in_test.toarray())
    #size = in_test.getnnz() #this didn't work

    #This is a bodged output to try and deal with all the crazy matricies
    #and numpy values and arrays flying around all over the place
    for i in range(size):
        #print out predicted values
        input_values = in_test[i].toarray()
        expected_output = out_test[i]
        predicted_output = predictions[i]
        print("Values: ")
        print(input_values)
        print("Expected: ")
        print(expected_output)
        print("Predicted: ")
        print(predicted_output)

    print("Saving model to: " + model_filename)
    #Save model in serialised form
    pickle.dump(trained_model, open(model_filename, 'wb'))

#Code if this file is executed through the command line
#TO RUN TRAINING CODE
#Type: python3 modeltrainer.py dataset.txt model.sav
#Type: python3 modeltrainer.py [DATASET_FILEPATH] [MODEL_FILENAME]

args = sys.argv; #Get arguments

no_of_arguments = len(args) #Get number of arguments note first/0th argument is just run program call

if no_of_arguments == 3:
    #If the code ran with the correct amount of arguments
    train_model_and_save(args[1], args[2]) #First argument is just the call to running the program
else:
    print("Incorrect number of arguments");
    print("Use python3 modeltrainer.py [DATASET_FILEPATH] [MODEL_FILENAME]")
