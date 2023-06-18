import torch
import torch.optim as optim
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader


class MyDataset(Dataset):
    def __init__(self, file_path):
        self.data = []
        with open(file_path, 'r') as file:
            for line in file:
                line = line.strip().split()
                label = list(map(float, line[:8]))
                data = list(map(float, line[8:]))
                self.data.append((label, data))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index):
        label, data = self.data[index]
        label_tensor = torch.tensor(label)
        data_tensor = torch.tensor(data)
        return label_tensor, data_tensor


class Model(torch.nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        self.fc1 = torch.nn.Linear(18, 128)
        self.fc2 = torch.nn.Linear(128, 18)

    def forward(self, x):
        x = self.fc1(x)
        x = torch.nn.functional.relu(x)
        x = self.fc2(x)
        return x


# Create the dataset
dataset = MyDataset(file_path='dataset.txt')

# Set the number of epochs and batch size
num_epochs = 10
batch_size = 32

# Create the data loader
data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Create the model
model = Model()

# Set up the optimizer and loss function
optimizer = optim.SGD(model.parameters(), lr=0.01)
loss_fn = F.mse_loss

# Training loop
for epoch in range(num_epochs):
    running_loss = 0.0

    for labels, data in data_loader:
        # Forward pass
        outputs = model(data)

        # Compute the loss
        loss = loss_fn(outputs, labels)

        # Zero the gradients, perform backward pass, and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # Accumulate the loss
        running_loss += loss.item()

    # Print the average loss for the epoch
    avg_loss = running_loss / len(data_loader)
    print(f"Epoch {epoch+1}/{num_epochs}, Average Loss: {avg_loss:.4f}")
