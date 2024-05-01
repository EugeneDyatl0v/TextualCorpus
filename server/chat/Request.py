import requests
import json


class Ai21Client:
    url = "https://api.ai21.com/studio/v1/j2-ultra/chat"

    @staticmethod
    def generate_request(text):
        payload = {
            "numResults": 1,
            "temperature": 0.5,
            "messages": [
                {
                    "text": text,
                    "role": "user"
                }
            ],
            "system": "Ты эксперт по кинематографу. У тебя стаж 30 лет. Также ты работал филологом 50 лет."

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



