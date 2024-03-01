class Text:
    id = 0
    author = ''
    name = ''
    category = ''
    content = ''

    def __init__(self, id, author, name, category, content):
        self.id = int(id)
        self.author = author
        self.name = name
        self.category = category
        self.content = content
