import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset

# impot os
import os

# Define your custom dataset


class CustomDataset(Dataset):
    def __init__(self, file_path):
        self.data = []
        with open(file_path, 'r') as file:
            for line in file:
                line = line.strip().split()
                input_data = list(map(float, line[:8]))
                output_data = list(map(float, line[8:]))
                # normalize data
                input_data = [x/100 for x in input_data]
                output_data = [x/100 for x in output_data]

                # print("INPUT DATA LENGTH")
                # print(len(input_data))

                self.data.append((input_data, output_data))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index):
        input_data, output_data = self.data[index]
        return torch.tensor(input_data), torch.tensor(output_data)

# Define your model


class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        # Adjust input and output dimensions accordingly
        self.fc1 = nn.Linear(8, 128)
        self.fc2 = nn.Linear(128, 128)
        self.fc3 = nn.Linear(128, 128)
        self.fc4 = nn.Linear(128, 18)

    def forward(self, x):
        x = self.fc1(x)
        x = self.fc2(x)
        x = self.fc3(x)
        x = self.fc4(x)
        return x


data_path_objects = [
    {
        'path': './data/dataset.txt',
        'num_epochs': 10,
    },
    {
        'path': './data/dataset-jiggled.txt',
        'num_epochs': 10,
    },
    {
        'path': './data/happy-face-data.txt',
        'num_epochs': 3,
    },
    {
        'path': './data/sad-face-data.txt',
        'num_epochs': 3,
    },
]

for data_path_object in data_path_objects:

    data_path = data_path_object['path']
    num_epochs = data_path_object['num_epochs']

    # Define training parameters
    batch_size = 16
    learning_rate = 0.001

    # Initialize your dataset and model
    dataset = CustomDataset(data_path)
    model = Model()
    # load the model from trained_model.pth
    # model.load_state_dict(torch.load('trained_model.pth'))

    model_file = 'trained_model.pth'
    if os.path.exists(model_file):
        print("Model exists")
        # Load the existing model
        model.load_state_dict(torch.load(model_file))
        print("Model loaded")

    # Define loss function and optimizer
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

    # Create data loader
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Training loop
    for epoch in range(num_epochs):
        for inputs, targets in dataloader:
            # Forward pass
            outputs = model(inputs)
            loss = criterion(outputs, targets)

            # Backward pass and optimization
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        # Print the loss for every epoch
        print(f"Epoch {epoch+1}/{num_epochs}, Loss: {loss.item()}")

    # Save the trained model
    torch.save(model.state_dict(), 'trained_model.pth')
