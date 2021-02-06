from webscraper import get_cna_headlines, get_mothership_headlines, get_straits_times
from sentiment_analysis import get_sentiments
import sqlite3
from sqlite3 import Error
from datetime import datetime
from database import *

cna_articles = []

# Get CNA
cna_headlines,cna_links = get_cna_headlines()
# print(cna_headlines)
for i in range(len(cna_headlines)):
    article = [cna_headlines[i], cna_links[i]]
    print(get_sentiments(cna_headlines[i]))
    article += list(get_sentiments(cna_headlines[i]))
    cna_articles.append(article)

print(cna_articles)

mothership_articles = []

# Get CNA
mothership_headlines, mothership_links = get_mothership_headlines()
# print(cna_headlines)
for i in range(len(mothership_headlines)):
    article = [mothership_headlines[i], mothership_links[i]]
    # print(get_sentiments(mothership_headlines[i]))
    article += list(get_sentiments(mothership_headlines[i]))
    mothership_articles.append(article)

straitstimes_articles = []
# Get Straits Times
straitstimes_headlines, straitstimes_links = get_straits_times()
# print(cna_headlines)
for i in range(len(straitstimes_headlines)):
    article = [straitstimes_headlines[i], straitstimes_links[i]]
    # print(get_sentiments(mothership_headlines[i]))
    article += list(get_sentiments(straitstimes_headlines[i]))
    straitstimes_articles.append(article)



database = "db/news.db"
sql_create_news_table = """ CREATE TABLE IF NOT EXISTS news (
                                id integer PRIMARY KEY,
                                headline text NOT NULL,
                                link text NOT NULL,
                                source text NOT NULL,
                                og_compound_rating real NOT NULL,
                                og_negative_rating real NOT NULL,
                                og_neutral_rating real NOT NULL,
                                og_positive_rating real NOT NULL,
                                date text NOT NULL
                            ); """

sql_create_votes_table = """CREATE TABLE IF NOT EXISTS votes (
                            id integer PRIMARY KEY,
                            vote text NOT NULL,
                            news_id integer NOT NULL,
                            last_updated text NOT NULL,
                            FOREIGN KEY (news_id) REFERENCES news (id)
                        );"""

conn = create_connection(database)

if conn is not None:
    create_table(conn, sql_create_news_table)
    create_table(conn,sql_create_votes_table)
else:
    print("Error! Cannot create connection")

for i in cna_articles:
    print(create_news(conn, i, "CNA"))

for i in mothership_articles:
    print(create_news(conn, i, "Mothership"))

for i in straitstimes_articles:
    print(create_news(conn, i, "TheStraitsTimes"))