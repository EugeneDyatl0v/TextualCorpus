from datetime import datetime


class Message:
    def __init__(self, text, sender):
        self.time = datetime.now().time()
        self.text = text
        self.sender = sender

    def to_dict(self):
        return {
            'time': str(self.time),
            'text': self.text,
            'sender': self.sender
        }