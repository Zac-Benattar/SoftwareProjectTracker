import modeltrainer
import projectevaluator

#Automatic train and test from dataset
#Train start estimation
modeltrainer.train_model_and_save("startevaluationdataset.txt", projectevaluator.get_start_model_filename())
#Train in progress estimation
modeltrainer.train_model_and_save("inprogressevaluationdataset.txt", projectevaluator.get_in_progress_model_filename())
