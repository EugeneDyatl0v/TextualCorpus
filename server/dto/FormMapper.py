import re

from server.Utils.Constants import Constants


class FormMapper:

    @staticmethod
    def convert(item):
        chars = re.split(r'\s|,', str(item.tag))
        res = {'word': item.word}
        for characteristic in chars:
            if characteristic in Constants.part_of_speech_map:
                res['part_of_speech'] = Constants.part_of_speech_map[characteristic]
            if characteristic in Constants.number:
                res['number'] = Constants.number[characteristic]
            if characteristic in Constants.case:
                res['case'] = Constants.case[characteristic]
            if characteristic in Constants.gender:
                res['gender'] = Constants.gender[characteristic]
            if characteristic in Constants.animation:
                res['animation'] = Constants.animation[characteristic]
            if characteristic in Constants.degree:
                res['degree'] = Constants.degree[characteristic]
            if characteristic in Constants.mest:
                res['form'] = Constants.mest[characteristic]
            if characteristic in Constants.time:
                res['time'] = Constants.time[characteristic]
            if characteristic in Constants.inclination:
                res['inclination'] = Constants.inclination[characteristic]

        print(res)
        return res

    @staticmethod
    def convert_form(characteristic):
        if characteristic in Constants.part_of_speech_map:
            return Constants.part_of_speech_map[characteristic]
        if characteristic in Constants.number:
            return Constants.number[characteristic]
        if characteristic in Constants.case:
            return Constants.case[characteristic]
        if characteristic in Constants.gender:
            return Constants.gender[characteristic]
        if characteristic in Constants.animation:
            return Constants.animation[characteristic]
        if characteristic in Constants.degree:
            return Constants.degree[characteristic]
        if characteristic in Constants.mest:
            return Constants.mest[characteristic]
        if characteristic in Constants.time:
            return Constants.time[characteristic]
        if characteristic in Constants.inclination:
            return Constants.inclination[characteristic]