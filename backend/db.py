import sqlite3
import json


class Database:
    def __init__(self):
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        cur.execute(("CREATE TABLE IF NOT EXISTS recipes(Titel, Portionen, Zubereitungszeit, Zutaten, Zubereitungsschritte, Tipps)"))
        con.close()

    def save_recipe(self, recipe):
        con = sqlite3.connect('saved_recipes.db')
        try:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO recipes (Titel, Portionen, Zubereitungszeit, Zutaten, Zubereitungsschritte, Tipps) VALUES (?, ?, ?, ?, ?,?)",
                    (
                str(recipe.parsed.name),
                json.dumps(recipe.parsed.portionen),
                json.dumps(recipe.parsed.zubereitungszeit),
                json.dumps(recipe.parsed.zutaten),
                json.dumps(recipe.parsed.zubereitungsschritte),
                json.dumps(recipe.parsed.tipps)
                    )
            )
            con.commit()
            print("Rezept gespeichert")
        except Exception as e:
            print("Fehler beim Speichern des Rezepts:", e)
        finally:
            con.close()


    def get_previous_recipes():
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        cur.execute("SELECT Titel FROM recipes ORDER BY rowid DESC LIMIT 7")
        last_titles = [row[0] for row in cur.fetchall()]
        return last_titles
    

    # funktioniert noch nicht: TypeError: Database.get_all_recipes() takes 0 positional arguments but 1 was given
    
    def get_all_recipes(self):
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        cur.execute("SELECT * FROM recipes")
        all_recipes = cur.fetchall()
        return all_recipes