from sklearn import datasets
from sklearn import linear_model
from sklearn.model_selection import train_test_split


#THINGS TO DO
#1) Add loading and writing models to files (Can be done just not implemented yet)
#2) Implement more classes to evaluate project

#Used to store a loaded linear model and update/save it
class ProjectEvaluator:


    def __init__(self, model_filename):
        self.model = None #Update this to load in the model

    #This will take in a projects riskiness and return a number between 0 and 1 which can be used as a percentage
    def get_riskiness(self):
        input_data = None

        prediction = self.model.predict(input_data)

        return prediction[0][0] #Return the prediction
