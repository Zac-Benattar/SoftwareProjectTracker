#Import SK learn libary for machine learning
from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split

import pickle #Used to serialise the model to be loaded later saves retraining everytime the program is rerun


COMBINED_MODEL_NAME = "model"
FILE_EXTENSION = ".sav"

START_POSTFIX = "start" #The filename for the model to load
IN_PROGRESS_POSTFIX = "inprogress" #The filename for the model to load

def get_start_model_filename():
    return COMBINED_MODEL_NAME + START_POSTFIX + FILE_EXTENSION

def get_in_progress_model_filename():
    return COMBINED_MODEL_NAME + IN_PROGRESS_POSTFIX + FILE_EXTENSION

#Used to turn the models prediction into a score of sorts viewed as a percentage to the user
def combine_scores(classes, probability):
    NO_OF_CLASSES = len(classes)
    #Treat this precition as some random variable and compute expectation
    #to come up with a score
    sum = 0
    for i in range(NO_OF_CLASSES):
        #Converts the class into a percentage (changing -1 to 1 into 0% to 100%)
        #This is used because -1 represents failiure and 1 represents sucess.
        #1 means 100% sucessful and -1 means 0% sucessful
        percentage_score_of_class = convert_to_percentage(classes[i])

        #Use formula for expectaion over discrete outcomes to decide final "sucess score"
        #Probabilities are normalised so sum of probability will be
        #approximately 1 (give or take for floating point innaccuracy)
        sum += percentage_score_of_class * probability[i]

    return sum

#Takes in a value between -1 and 1 and converts to a percentage
def convert_to_percentage(value):
    return (value + 1) * 50

#Used to store a loaded linear model and update/save it
class ProjectEvaluator:


    def __init__(self):

        #Get filenames for model files
        self.START_MODEL_FILENAME = get_start_model_filename()
        self.IN_PROGRESS_MODEL_FILENAME = get_in_progress_model_filename()

        #Load logistic regression models
        self.start_model = pickle.load(open(self.START_MODEL_FILENAME, 'rb')) #Update this to load in the model
        self.in_progress_model = pickle.load(open(self.IN_PROGRESS_MODEL_FILENAME, 'rb')) #Update this to load in the model

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_initial_chance_of_success(self, startevaluationdata):
        input_data = startevaluationdata.get_data_as_matrix()

        prediction = self.start_model.predict_proba(input_data)

        return combine_scores(self.start_model.classes_, prediction[0]) #Return the prediction

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_current_chance_of_success(self, currentevaluationdata):
        input_data = currentevaluationdata.get_data_as_matrix()

        prediction = self.in_progress_model.predict_proba(input_data)

        return combine_scores(self.in_progress_model.classes_, prediction[0]) #Return the prediction

    def update_model(self):
        #Not sure how to implement this yet will do this at a later point
        #Needs to "retrain" the model using refit()
        #Then need to serialize the data and save it again (similar to modeltrainer.py)

        #Refit the model
        #Make sure warm start is enabled as to not delete all old training data
        #self.start_model.fit()
        #self.in_progress_model.fit()

        #Save start model
        print("Saving start model to: " + self.START_MODEL_FILENAME)
        #Save model in serialised form
        pickle.dump(self.start_model, open(self.START_MODEL_FILENAME, 'wb'))
        print("Saved!")

        #Save in progress model
        print("Saving in progress model to: " + self.IN_PROGRESS_MODEL_FILENAME)
        #Save model in serialised form
        pickle.dump(self.in_progress_model, open(self.IN_PROGRESS_MODEL_FILENAME, 'wb'))
        print("Saved!")
