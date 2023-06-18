import random

emotions = ['happy', 'sad', 'angry', 'surprise',
            'love', 'fear', 'confusion', 'boredom']

# for i in range(0, 8):

#     emotionNums = []

#     for j in range(0, 8):
#         if i == j:
#             emotionNums.append(100)
#         else:
#             emotionNums.append(0)

# generate happy faces
for i in range(10000):
    random_numbers_dict = {
        'lex1': 30,
        'lex2': 30,
        'lex3': 30,
        'ley1': 20,
        'ley2': 25,
        'ley3': 30,
        'rex1': 70,
        'rex2': 70,
        'rex3': 70,
        'rey1': 20,
        'rey2': 25,
        'rey3': 30,
        'mx1': 20,
        'mx2': 50,
        'mx3': 70,
        'my1': 60,
        'my2': 70,
        'my3': 60,
    }

    def addRandomness(x, y, xmag, ymag):
        random_numbers_dict[x] = random_numbers_dict[x] + \
            random.randint(-1 * xmag, xmag)
        random_numbers_dict[y] = random_numbers_dict[y] + \
            random.randint(-1 * ymag, ymag)

    def addRandomBetween(point, min, max):
        random_numbers_dict[point] = random_numbers_dict[point] + \
            random.randint(min, max)

    # if (emotionNums[0] == "happy"):
    addRandomness("lex2", "ley2", 5, 5)
    addRandomness("rex2", "rey2", 5, 5)
    addRandomness("mx2", "my2", 10, 10)
    addRandomBetween("my2", 10, 20)
    addRandomBetween("mx2", -10, 10)

    addRandomness("lex1", "ley1", 2, 2)
    addRandomness("lex3", "ley3", 2, 2)
    addRandomness("rex1", "rey1", 2, 2)
    addRandomness("rex3", "rey3", 2, 2)
    addRandomness("mx1", "my1", 2, 2)
    addRandomness("mx3", "my3", 2, 2)

    keys = ['lex1',
            'ley1',
            'lex2',
            'ley2',
            'lex3',
            'ley3',
            'rex1',
            'rey1',
            'rex2',
            'rey2',
            'rex3',
            'rey3',
            'mx1',
            'my1',
            'mx2',
            'my2',
            'mx3',
            'my3']

    # turn random_numbers_dict into a string
    numbers_to_join = []
    for key in keys:
        numbers_to_join.append(str(random_numbers_dict[key]))

    string_to_write = "100 0 0 0 0 0 0 0 " + ' '.join(numbers_to_join) + '\n'

    # write string to file /data/happy-face-data.txt
    file_to_write = open('data/happy-face-data.txt', 'a+')
    file_to_write.write(string_to_write)
    file_to_write.close()

# generate sad faces
for i in range(10000):
    random_numbers_dict = {
        'lex1': 30,
        'lex2': 30,
        'lex3': 30,
        'ley1': 20,
        'ley2': 25,
        'ley3': 30,
        'rex1': 70,
        'rex2': 70,
        'rex3': 70,
        'rey1': 20,
        'rey2': 25,
        'rey3': 30,
        'mx1': 20,
        'mx2': 50,
        'mx3': 70,
        'my1': 80,
        'my2': 70,
        'my3': 80,
    }

    def addRandomness(x, y, xmag, ymag):
        random_numbers_dict[x] = random_numbers_dict[x] + \
            random.randint(-1 * xmag, xmag)
        random_numbers_dict[y] = random_numbers_dict[y] + \
            random.randint(-1 * ymag, ymag)

    def addRandomBetween(point, min, max):
        random_numbers_dict[point] = random_numbers_dict[point] + \
            random.randint(min, max)

    # if (emotionNums[0] == "happy"):
    addRandomness("lex2", "ley2", 5, 5)
    addRandomness("rex2", "rey2", 5, 5)
    addRandomness("mx2", "my2", 10, 10)
    addRandomBetween("mx2", -10, 0)
    addRandomBetween("my2", -10, 10)

    addRandomness("lex1", "ley1", 2, 2)
    addRandomness("lex3", "ley3", 2, 2)
    addRandomness("rex1", "rey1", 2, 2)
    addRandomness("rex3", "rey3", 2, 2)
    addRandomness("mx1", "my1", 2, 2)
    addRandomness("mx3", "my3", 2, 2)

    keys = ['lex1',
            'ley1',
            'lex2',
            'ley2',
            'lex3',
            'ley3',
            'rex1',
            'rey1',
            'rex2',
            'rey2',
            'rex3',
            'rey3',
            'mx1',
            'my1',
            'mx2',
            'my2',
            'mx3',
            'my3']

    # turn random_numbers_dict into a string
    numbers_to_join = []
    for key in keys:
        numbers_to_join.append(str(random_numbers_dict[key]))

    string_to_write = "0 100 0 0 0 0 0 0 " + ' '.join(numbers_to_join) + '\n'

    file_to_write = open('data/sad-face-data.txt', 'a+')
    file_to_write.write(string_to_write)
    file_to_write.close()


# clone and jiggle manual faces

# read file /data/dataset.txt and iterate over every line

preexisting_data = open('data/dataset.txt', 'r')
preexisting_data_lines = preexisting_data.readlines()
preexisting_data.close()

updated_lines = []
for reps in range(20):
    for line in preexisting_data_lines:
        line = line.strip().split()
        for i in range(8, len(line)):
            new_number = int(line[i]) + random.randint(-3, 3)

            if new_number < 0:
                new_number = 0
            if new_number > 100:
                new_number = 100

            line[i] = str(new_number)

        updated_lines.append(' '.join(line) + '\n')

# write updated_lines to file /data/dataset-jiggled.txt

file_to_write = open('data/dataset-jiggled.txt', 'a+')
file_to_write.writelines(updated_lines)
file_to_write.close()
