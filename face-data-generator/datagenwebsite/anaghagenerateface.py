# 100 0 0 0 0 0 0 0 28 29 30 18 28 30 72 67 72 20 24 32 20 40 68 59 92 59

import random
from string import Template

# read numbers from standard input
numbers = [int(x) for x in input().split()]

# ignore the first 8 numbers
numbers = numbers[8:]


template_file = open('../assets/face-template.svg', 'r')
template_string = template_file.read()
template_file.close()

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

random_numbers_dict = {}

for i in range(len(keys)):
    random_numbers_dict[keys[i]] = numbers[i]

# random_numbers_dict = {
#     'lex1': numbers[0],
#     'lex2': numbers[1],
#     'lex3': numbers[2],
#     'ley1': numbers[3],
#     'ley2': numbers[4],
#     'ley3': numbers[5],
#     'rex1': numbers[6],
#     'rex2': numbers[7],
#     'rex3': numbers[8],
#     'rey1': numbers[9],
#     'rey2': numbers[10],
#     'rey3': numbers[11],
#     'mx1': numbers[12],
#     'mx2': numbers[13],
#     'mx3': numbers[14],
#     'my1': numbers[15],
#     'my2': numbers[16],
#     'my3': numbers[17],
# }

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

sorted_numbers = []

# for key in keys:
#     sorted_numbers.append(str(random_numbers_dict[key]))


svg_string = Template(template_string).substitute(random_numbers_dict)

print(svg_string)

# write to ../assets/anaghaface.svg
file = open('../assets/anaghaface.svg', 'w')
file.write(svg_string)
file.close()
