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
                input_data = input_data[:2]
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
        self.fc1 = nn.Linear(2, 32)
        self.fc2 = nn.Linear(32, 32)
        self.fc4 = nn.Linear(32, 18)

    def forward(self, x):
        x = self.fc1(x)
        x = self.fc2(x)
        # x = self.fc3(x)
        x = self.fc4(x)
        return x


data_path_objects = [
    # {
    #     'path': './data/dataset.txt',
    #     'num_epochs': 10,
    # },
    # {
    #     'path': './data/dataset-jiggled.txt',
    #     'num_epochs': 10,
    # },
    {
        'path': './data/happy-face-data.txt',
        'num_epochs': 5,
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

    # Split the dataset into train and test set
    train_size = int(0.8 * len(dataset))
    test_size = len(dataset) - train_size
    train_dataset, test_dataset = torch.utils.data.random_split(
        dataset, [train_size, test_size])

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
    dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

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

    # # Testing loop
    # with torch.no_grad():
    #     for inputs, targets in DataLoader(test_dataset, batch_size=1):
    #         outputs = model(inputs)

    #         # Compare the outputs with targets with math
    #         def distance(x1, y1, x2, y2):
    #             return ((x1-x2)**2 + (y1-y2)**2)**0.5

    #         # print(f"Predicted: {outputs}, Target: {targets}")

    # Save the trained model
    torch.save(model.state_dict(), 'trained_model.pth')
