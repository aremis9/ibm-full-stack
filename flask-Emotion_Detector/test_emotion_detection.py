from EmotionDetection.emotion_detection import emotion_detector
import unittest

class TestEmotionDetector(unittest.TestCase):
    def test_emotion_detector(self):
        t1 = emotion_detector("I am glad this happened")
        self.assertEqual(t1['dominant_emotion'], 'joy')
        t2 = emotion_detector("I am really mad about this")
        self.assertEqual(t2['dominant_emotion'], 'anger')
        t3 = emotion_detector("I feel disgusted just hearing about this")
        self.assertEqual(t3['dominant_emotion'], 'disgust')
        t4 = emotion_detector("I am so sad about this")
        self.assertEqual(t4['dominant_emotion'], 'sadness')
        t5 = emotion_detector("I am really afraid that this will happen")
        self.assertEqual(t5['dominant_emotion'], 'fear')
    
unittest.main()