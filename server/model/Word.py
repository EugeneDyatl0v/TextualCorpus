class Word:
    id = 0
    normal_form = ''
    forms = []
    number = 0

    def __init__(self):
        self.id = 0
        self.normal_form = ''
        self.forms = []
        self.number = 0

    def __str__(self):
        return ("Normal form: "+self.normal_form+"\n"+
                "Number: "+str(self.number))

    def __json__(self):
        return {
            'id': self.id,
            'normal_form': self.normal_form
        }

