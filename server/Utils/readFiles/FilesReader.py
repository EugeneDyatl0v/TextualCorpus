import glob
import os
import re
import chardet
import docx2txt
import PyPDF2
from striprtf.striprtf import rtf_to_text
from ..dto.Proxy import Text


class FilesReader:
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
