import requests
import json


class Ai21Client:
    url = "https://api.ai21.com/studio/v1/j2-ultra/chat"

    @staticmethod
    def generate_request(text):
        payload = {
            "numResults": 1,
            "temperature": 0.7,
            "messages": [
                {
                    "text": text,
                    "role": "user"
                }
            ],
            "system": "ты филолог"

        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "Bearer sVq40clRCZjHWnwWwxTcgKBzWQTqepDo"
        }
        return payload, headers

    @staticmethod
    def send_request(text):
        payload, headers = Ai21Client.generate_request(text)
        response = requests.post(Ai21Client.url, json=payload, headers=headers)
        return json.loads(response.text)['outputs'][0]['text']



