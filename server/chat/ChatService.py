import json


from server.chat.Request import Ai21Client
from server.chat.db import DB
from server.model.Message import Message
from bson import json_util


class ChatService:

    db = DB()

    def get_chats(self):
        return self.db.get_collection_names()

    def create_chat(self, collection_name):
        self.db.create_collection(collection_name)

    def get_chat(self, collection_name):
        data = list(self.db.get_all_data(collection_name))
        json_data = json_util.dumps(data)
        return json_data

    def add_message(self, text, collection_name, sender):
        message = Message(text=text, sender=sender)
        self.db.add_message(collection_name, message.to_dict())
        return message

    def get_user_message(self, text, chat_name):
        self.add_message(text, chat_name, sender="user")
        response_text = Ai21Client.send_request(text)
        message = self.add_message(response_text, chat_name, "AI")
        return message
