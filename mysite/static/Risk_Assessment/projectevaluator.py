#Import SK learn libary for machine learning
from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split

import pickle #Used to serialise the model to be loaded later saves retraining everytime the program is rerun

MODEL_FILENAME = "model.sav" #The filename for the model to load

#Used to store a loaded linear model and update/save it
class ProjectEvaluator:


    def __init__(self, model_filename):
        self.trained_model = pickle.load(open(MODEL_FILENAME, 'rb')) #Update this to load in the model

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_initial_riskiness(self):
        input_data = None

        prediction = self.trained_model.predict(input_data)

        return prediction[0][0] #Return the prediction

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_current_riskiness(self):
        input_data = None

        prediction = self.trained_model.predict(input_data)

        return prediction[0][0] #Return the prediction
