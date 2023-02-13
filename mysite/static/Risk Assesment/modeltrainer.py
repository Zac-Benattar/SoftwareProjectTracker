from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split

print("=== Start Training ===")

print("Loading Dataset")
#Loads data from a file called dataset.txt
#(this is actually a svmlight file)
#this is a file used to represent a sparse matrix (sparse matrix being a matrix with many 0s)
#this matrix represents the dataset we'll use to train
#in_data is the inputs we'll take and output_data are like the results of the data.
#Think in data as happiness etc. out data is probability of success
in_data, out_data = datasets.load_svmlight_file("dataset.txt")


print("Dataset Loaded!")
#Linear Regression Algorithm/Object to load
linear_regression = linear_model.LinearRegression()


#Seperate training data into a train test Split
#All this does is take our input data and our output data and split it into a set of training data
#and a set of data the model hasn't seen
in_train, in_test, out_train, out_test = train_test_split(in_data, out_data, test_size=0.2)


print("=== Start Training Linear Regression Model ===")
#Train model
#This function trains on the training data
trained_model = linear_regression.fit(in_train, out_train);

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
