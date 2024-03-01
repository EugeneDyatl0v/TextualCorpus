import re


def get_text(text):
    text = text.replace("\n", " ")
    text = text.replace(" - ", " ")
    text = text.replace(" -", "-")
    text = text.replace(".", "")
    text = text.replace("?", "")
    text = text.replace(",", "")
    text = text.replace("!", "")
    text = text.replace("'", "")
    text = text.replace('"', "")
    text = text.replace('<', "")
    text = text.replace('>', "")
    text = text.replace('+', "")

    text = re.sub(r"\s+", " ", text)
    return text
