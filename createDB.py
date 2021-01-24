import sqlite3
import csv

conn = sqlite3.connect('StatsDB.db')
c = conn.cursor()

# create table - stats
c.execute('''CREATE TABLE STATS
            ([generate_id] INTEGER PRIMARY KEY, [Game_Mode] text, [Map] text, [Result] text, [Agent] text, [Headshot_Percent] real, [ADR] real, [Combat_Score] integer)''')
            
            
conn.commit()

