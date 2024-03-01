import pymorphy2

from server.model.Word import Word


class Checker:
    morph = pymorphy2.MorphAnalyzer()
    words = []

    def __init__(self):
        self.words = []

    def count_words(self, a_list):
        id = 1
        for i in range(len(a_list)):
            word = Word()
            item = self.morph.parse(a_list[i])[0]
            matching_words = [word for word in self.words if word.normal_form == item.normal_form]
            if len(matching_words) == 0:
                word.normal_form = item.normal_form
                word.id = id
                id += 1
                self.words.append(word)
            matching_words = [word for word in self.words if word.normal_form == item.normal_form]
            for word in matching_words:
                if not self.check_forms(item, word):
                    word.forms.append(item)
                word.number = word.number + 1
        return self.words[:-1]

    def check_forms(self, item, word):
        for form in word.forms:
            if self.check_form(item, form):
                return True
        return False

    def check_form(self, item, form):
        if item.word != form.word:
            return False
        if item.tag.POS != form.tag.POS:
            return False
        if item.tag.gender != form.tag.gender:
            return False
        if item.tag.case != form.tag.case:
            return False
        if item.tag.number != form.tag.number:
            return False
        return True
