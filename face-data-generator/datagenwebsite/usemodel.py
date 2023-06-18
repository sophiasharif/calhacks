# import pytorch packages
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset

# load model from trained_model.pth
model = torch.load('trained_model.pth')


class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        # Adjust input and output dimensions accordingly
        self.fc1 = nn.Linear(2, 32)
        self.fc2 = nn.Linear(32, 32)
        self.fc4 = nn.Linear(32, 18)

    def forward(self, x):
        x = self.fc1(x)
        x = self.fc2(x)
        # x = self.fc3(x)
        x = self.fc4(x)
        return x

# def genModelOutput(input_data):

#     print("PRINTING INPUT DATA")
#     print(input_data)

#     # normalize data
#     input_data = [x/100 for x in input_data]
#     # convert input_data to tensor
#     input_data = torch.tensor(input_data)
#     # add a batch dimension
#     # input_data = input_data.unsqueeze(0)
#     # pass input_data to model

#     output_data = model(input_data)
#     # remove batch dimension
#     output_data = output_data.squeeze(0)

#     # convert output_data to list
#     output_data = output_data.tolist()
#     # denormalize data
#     output_data = [x*100 for x in output_data]
#     return output_data


def genModelOutput(input_data):
    input_data = input_data[:2]
    # normalize data
    input_data = [x/100 for x in input_data]
    # convert input_data to tensor
    input_data = torch.tensor(input_data)

    # MyModel()  # Instantiate your model
    model = Model()
    model.load_state_dict(torch.load("trained_model.pth"))
    model.eval()

    print("sussty baka")

    # generate output
    output_data = model(input_data)

    # output_data = model(input_data)
    print("i beg dear go baka")

    # convert output_data to list
    output_data = output_data.tolist()
    # denormalize data
    output_data = [x*100 for x in output_data]

    print("PRINTING OUTPUT DATA")
    print(output_data)

    return output_data
