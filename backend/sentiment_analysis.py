import pandas as pandas
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

def get_sentiments(text):
    sia = SIA()
    pol_score = sia.polarity_scores(text)
    return pol_score['compound'], pol_score['neg'], pol_score['neu'], pol_score['pos']

