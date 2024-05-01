from pymongo import MongoClient, DESCENDING


class DB:
    _host = 'localhost'
    _port = 27017

    _client = MongoClient(_host, _port)

    connection = _client.TextualCorpusDb

    @staticmethod
    def get_collection_names():
        return DB.connection.list_collection_names()

    @staticmethod
    def get_all_data(collection_name):
        collection = DB.connection[collection_name]
        documents = collection.find({}).sort("timestamp", DESCENDING)
        return list(documents)

    @staticmethod
    def add_message(collection_name, data):
        collection = DB.connection[collection_name]
        result = collection.insert_one(data)
        return result.inserted_id

    @staticmethod
    def create_collection(collection_name):
        DB.connection.create_collection(collection_name)
