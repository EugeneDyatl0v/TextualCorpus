import glob
import os
import re
import chardet
import docx2txt
import PyPDF2
from striprtf.striprtf import rtf_to_text
from ..dto.Proxy import Text
import xml.etree.ElementTree as ET
import xml.dom.minidom
import spacy


class FilesReader:
    @staticmethod
    def generate_xml(text, output_file):
        # Загружаем модуль Spacy
        nlp = spacy.load(
            'C:\\Users\\evgen\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python310\\site-packages\\spacy\\data\\ru_core_news_md\\ru_core_news_md-3.7.0')

        # Создаем корневой элемент
        root = ET.Element('t')

        # Обрабатываем текст с помощью Spacy
        doc = nlp(text)

        # Проходим по предложениям и создаем элементы "s"
        for sentence in doc.sents:
            sentence_element = ET.SubElement(root, 's')

            # Проходим по словам и пунктуации в предложении
            for token in sentence:
                if token.is_alpha or token.is_punct:
                    # Определяем, является ли элемент словом или пунктуацией
                    if token.is_alpha:
                        element_tag = 'w'
                    else:
                        element_tag = 'p'

                    # Создаем соответствующий элемент и задаем значение
                    element = ET.SubElement(sentence_element, element_tag)
                    element.text = token.text

                    # Создаем элемент "ana" для морфологических свойств слова
                    ana = ET.SubElement(element, 'ana')

                    # Создаем элементы "tag" и "lemma" и задаем значения
                    tag = ET.SubElement(ana, 'tag')
                    tag.text = token.tag_

                    lemma = ET.SubElement(ana, 'lemma')
                    lemma.text = token.lemma_

                    for key, value in token.morph.to_dict().items():
                        lemma = ET.SubElement(ana, key)
                        lemma.text = value

                    # Создаем XML-дерево
        tree = ET.ElementTree(root)

        # Сохраняем XML-дерево в файл
        tree.write(output_file, encoding='utf-8', xml_declaration=True)
        dom = xml.dom.minidom.parseString(ET.tostring(root, encoding='utf-8').decode('utf-8'))
        print(dom.toprettyxml(indent='\t'))
        return dom.toprettyxml(indent='\t')

    @staticmethod
    def read_files(folder_path: str) -> list[Text]:
        text_list = []

        # Поиск файлов с расширениями pdf, docs, txt, rtf
        file_extensions = ['pdf', 'docx', 'txt', 'rtf']
        for extension in file_extensions:
            file_pattern = f'{folder_path}/*.{extension}'
            file_paths = glob.glob(file_pattern)

            # Чтение текста из файлов разных форматов
            for file_path in file_paths:
                if extension == 'pdf':
                    with open(file_path, 'rb') as file:
                        pdf_reader = PyPDF2.PdfReader(file)
                        text = ''
                        for page in pdf_reader.pages:
                            t = page.extract_text()
                            text = text + t
                    text = re.sub(r'\n+', '\n', text)
                    text_list.append(re.sub(r'-\n', '', text))
                    file.close()
                elif extension == 'docx':
                    doc_text = docx2txt.process(file_path)
                    doc_text = re.sub(r'\n+', '\n', doc_text)
                    text_list.append(re.sub(r'-\n', '', doc_text))
                elif extension == 'txt':
                    # Чтение текста из файлов форматов TXT
                    with open(file_path, 'rb') as file:
                        raw_data = file.read()
                        encoding = chardet.detect(raw_data)['encoding']
                        file.close()

                    with open(file_path, 'r', encoding=encoding) as file:
                        file_text = file.read()
                        file_text = re.sub(r'\n+', '\n', file_text)
                        text_list.append(re.sub(r'-\n', '', file_text))
                        file.close()
                elif extension == 'rtf':
                    doc = open(file_path, 'r')
                    content = doc.read()
                    text = rtf_to_text(content)
                    text = re.sub(r'\n+', '\n', text)
                    text_list.append(re.sub(r'-\n', '', text))
                    doc.close()
        result = []
        for id, text in enumerate(text_list):
            start_index = text.find('Название:') + len('Название:')
            end_index = text.find('\n', start_index)
            title = text[start_index:end_index].strip()

            # Извлечение автора
            start_index = text.find('Автор:') + len('Автор:')
            end_index = text.find('\n', start_index)
            author = text[start_index:end_index].strip()

            # Извлечение категории
            start_index = text.find('Категория:') + len('Категория:')
            end_index = text.find('\n', start_index)
            category = text[start_index:end_index].strip()

            result.append(Text(id, author, title, category, text))

            files = glob.glob('C:\\Learning\\EASIS\\TextualCorpus\\server\\texts\\*')
            for f in files:
                os.remove(f)
        return result
