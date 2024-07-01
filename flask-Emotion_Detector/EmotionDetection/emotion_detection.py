import json
import requests

def emotion_detector(text_to_analyse):
    url = "https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict"
    my_json = { "raw_document": { "text": text_to_analyse } }
    header = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}

    response = requests.post(url, json = my_json, headers=header)
    if response.status_code == 200:
        final_response = format_response(response)
    elif response.status_code == 400:
        final_response = None

    return final_response

def format_response(response):
    response_json = json.loads(response.text)
    emotions_json = response_json['emotionPredictions'][0]['emotion']

    emotions = {
        'anger': emotions_json['anger'],
        'disgust': emotions_json['disgust'],
        'fear': emotions_json['fear'],
        'joy': emotions_json['joy'],
        'sadness': emotions_json['sadness'],
    }

    dominant_emotion = max(emotions, key=emotions.get)
    emotions['dominant_emotion'] = dominant_emotion
    
    return emotions
