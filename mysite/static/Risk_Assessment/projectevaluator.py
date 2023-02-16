#Import SK learn libary for machine learning
from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split

import pickle #Used to serialise the model to be loaded later saves retraining everytime the program is rerun


START_MODEL_FILENAME = "startmodel.sav" #The filename for the model to load
IN_PROGRESS_MODEL_FILENAME = "inprogressmodel.sav" #The filename for the model to load

#Used to store a loaded linear model and update/save it
class ProjectEvaluator:


    def __init__(self, model_filename):
        self.start_model = pickle.load(open(START_MODEL_FILENAME, 'rb')) #Update this to load in the model
        self.in_progress_model = pickle.load(open(IN_PROGRESS_MODEL_FILENAME, 'rb')) #Update this to load in the model

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_initial_riskiness(self, startevaluationdata):
        input_data = startevaluationdata.get_data_as_matrix()

        prediction = self.start_model.predict(input_data)

        return prediction[0][0] #Return the prediction

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_current_riskiness(self, currentevaluationdata):
        input_data = currentevaluationdata.get_data_as_matrix()

        prediction = self.in_progress_model.predict(input_data)

        return prediction[0][0] #Return the prediction

    def update_model(self):
        #Not sure how to implement this yet will do this at a later point
        #Needs to "retrain" the model using refit()
        #Then need to serialize the data and save it again (similar to modeltrainer.py)
        pass
