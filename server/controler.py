from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from Utils.readFiles.FilesReader import FilesReader
import psycopg2
import spacy
from spacy import displacy
import re


nlp = spacy.load('C:\\Users\\evgen\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python310\\site-packages\\spacy\\data\\ru_core_news_md\\ru_core_news_md-3.7.0')
app = Flask(__name__)
CORS(app)

texts = []
spacy_texts = []


@app.route('/texts', methods=['POST', 'GET'])
@cross_origin()
def upload_files():
    global texts, spacy_texts
    if request.method == 'POST':
        files = request.files.getlist('files')
        if len(files) == 0:
            return 'No files uploaded', 400

        for file in files:
            if file.filename == '':
                return 'One or more files have no name', 400

            filename = secure_filename(file.filename)
            file.save('C:\\Learning\\EASIS\\TextualCorpus\\server\\texts\\' + filename)

        texts = FilesReader.read_files('C:\\Learning\\EASIS\\TextualCorpus\\server\\texts')
        print(texts)
        for text in texts:
            buffer = []
            lines = text.content.replace('\n', '\n ').split('\n')
            sentences = ''.join(lines[4:])
            sentences = sentences.split('.')
            for sentence in sentences:
                doc = nlp(sentence.strip())
                buffer.append(doc)
            spacy_texts.append([text.id, buffer])

        return 'Files uploaded successfully', 200
    else:
        json = []
        for text in texts:
            json.append({'id': str(text.id), 'author': text.author, 'title': text.name, 'category': text.category,
                         'content': text.content})
        return jsonify(json)


@app.route('/syntax', methods=['GET'])
@cross_origin()
def get_texts():
    global texts
    json = []
    for text in texts:
        json.append({'id': str(text.id), 'author': text.author, 'title': text.name, 'category': text.category,
                     'content': text.content})
    return jsonify(json)


@app.route('/texts/<id>', methods=['PUT'])
@cross_origin()
def update_text(id):
    global texts
    text = request.get_json()
    index = 0
    for item in texts:
        if item.id == int(id):
            index = texts.index(item)
            break
    texts[index].content = text['content']
    return {'status': 'ok'}


@app.route('/syntax/<id>', methods=['GET'])
@cross_origin()
def dependency(id):
    global spacy_texts
    svg_list = []
    text = []
    for texts in spacy_texts:
        if texts[0] == int(id):
            text = texts[1]
    for sentence in text:
        svg = displacy.render(sentence, style='dep', options={'compact': True})
        """pattern = r'width="(\d+)"'  # Регулярное выражение для поиска подстроки width="n"
        replacement = r'width="200%"'  # Заменить на новое значение
        svg_with_new_size = re.sub(pattern, replacement, svg, count=1)"""
        svg_list.append(svg)
    svg_list.pop()
    return jsonify(svg=svg_list)
