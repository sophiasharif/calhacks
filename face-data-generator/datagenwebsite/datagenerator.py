from flask import Flask, render_template, request
import random
from string import Template
from flask import Markup
import math


app = Flask(__name__)

# List of image URLs
image_urls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    # Add more image URLs as needed
]

likes = {image_url: 0 for image_url in image_urls}


@app.route('/')
def index():
    return render_template('index.html')


def generate_random_svg():

    # generate a 16 digit random number to use as the image id
    id = random.randint(1000000000000000, 9999999999999999)

    # pass 18 random numbers into the file ./assets/face-template.svg
    # save the contents as a string
    # return the string

    template_file = open('../assets/face-template.svg', 'r')
    template_string = template_file.read()
    template_file.close()

    random_numbers = [random.randint(0, 100) for i in range(18)]

    def random_number_between(min, max):
        return random.randint(min, max)

    # dictionary of with the following keys
    # lex1 through lex3, random number between 10 and 50
    # ley1 through ley3, random number between 10 and 50
    # rex1 through rex3, random number between 50 and 90
    # rey1 through rey3, random number between 10 and 50
    # mx1 through mx3, random number between 10 and 90
    # my1 through my3, random number between 50 and 90

    random_numbers_dict = {
        'lex1': random_number_between(10, 45),
        'lex2': random_number_between(10, 45),
        'lex3': random_number_between(10, 45),
        'ley1': random_number_between(20, 40),
        'ley2': random_number_between(20, 40),
        'ley3': random_number_between(20, 40),
        'rex1': random_number_between(55, 90),
        'rex2': random_number_between(55, 90),
        'rex3': random_number_between(55, 90),
        'rey1': random_number_between(10, 50),
        'rey2': random_number_between(10, 50),
        'rey3': random_number_between(10, 50),
        'mx1': random_number_between(20, 50),
        'mx2': random_number_between(30, 70),
        'mx3': random_number_between(50, 80),
        'my1': random_number_between(60, 90),
        'my2': random_number_between(60, 90),
        'my3': random_number_between(60, 90),
    }

    # if the distance between (lex1, ley1) and (lex3, ley3) is over 30
    # then bring them closer together so that the distance is 30 or less
    # if the distance between (rex1, rey1) and (rex3, rey3) is over 30
    # then bring them closer together so that the distance is 30 or less

    def distance_between_points(x1, y1, x2, y2):
        return ((x2 - x1)**2 + (y2 - y1)**2)**0.5

    def bring_points_closer(x1, y1, x2, y2, min_distance):
        distance = distance_between_points(x1, y1, x2, y2)
        if distance > min_distance:
            x2 = x1 + (x2 - x1) * min_distance / distance
            y2 = y1 + (y2 - y1) * min_distance / distance

        return x2, y2

    random_numbers_dict['lex3'], random_numbers_dict['ley3'] = bring_points_closer(
        random_numbers_dict['lex1'],
        random_numbers_dict['ley1'],
        random_numbers_dict['lex3'],
        random_numbers_dict['ley3'],
        15
    )

    random_numbers_dict['rex3'], random_numbers_dict['rey3'] = bring_points_closer(
        random_numbers_dict['rex1'],
        random_numbers_dict['rey1'],
        random_numbers_dict['rex3'],
        random_numbers_dict['rey3'],
        15
    )

    svg_string = Template(template_string).substitute(random_numbers_dict)
    print(svg_string)
    svg_string += "<h1>" + str(id) + "</h1>"

    # join all the random numbers into a string
    all_random_numbers = ' '.join(map(str, random_numbers))

    return svg_string, all_random_numbers


@app.route('/random_image')
def random_image():
    svg_string, all_random_numbers = generate_random_svg()
    return render_template('random_image.html', svg_image=Markup(svg_string), random_numbers=all_random_numbers)


@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.form
    # print(data)

    returnString = ""

    # save the data to a file
    #  go through these keys: happy, sad, angry, surprise, love, fear, confusion, boredom
    for key in ['happy', 'sad', 'angry', 'surprise', 'love', 'fear', 'confusion', 'boredom']:
        print(data[key], end=' ')
        returnString += data[key] + ' '

    print(data["numbers"])
    returnString += data["numbers"] + '\n'

    file = open('../dataset.txt', 'a')
    file.write(returnString)
    file.close()

    return render_template('redirectToRandomImage.html')


@app.route('/like/<path:image_url>')
def like_image(image_url):
    likes[image_url] += 1
    return str(likes[image_url])


if __name__ == '__main__':
    app.run(debug=True)
