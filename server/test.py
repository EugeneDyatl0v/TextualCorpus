import datetime
import random
import matplotlib.pyplot as plt
import string

import spacy
from spacy import displacy
import time

all_words = ''
x = []
y = []
nlp = spacy.load('ru_core_news_md')


def oktest():
    global all_words
    for i in range(100):
        all_words = []
        generate_words(i)
        start = time.perf_counter_ns()
        for sentence in all_words:
            doc = nlp(sentence)
            svg = displacy.render(doc, style='dep', options={'compact': True})
        y.append(int(time.perf_counter_ns()) - int(start))
        x.append(i)
        i += 10


def generate_words(number):
    global all_words
    for i in range(number):
        if i % 10 == 0:
            all_words += '.'
        all_words += ' ' + generate_random_word(10)


def generate_random_word(length):
    letters = string.ascii_lowercase
    random_word = ''.join(random.choice(letters) for _ in range(length))
    return random_word


if __name__ == '__main__':
    oktest()
    plt.plot(x, y)

    plt.ylabel('время выполнения(нс)')
    plt.xlabel('количество слов')
    plt.title('тест производительности')

    plt.show()
