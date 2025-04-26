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
                "INSERT INTO recipes (Titel, Portionen, Zubereitungszeit, Zutaten, Zubereitungsschritte, Tipps) VALUES (?, ?, ?, ?, ?, ?)",
                    (
                str(recipe.parsed.name),
                json.dumps(recipe.parsed.portionen),
                json.dumps(recipe.parsed.zubereitungszeit),
                json.dumps(recipe.parsed.zutaten),
                json.dumps(recipe.parsed.zubereitungsschritte),
                json.dumps(recipe.parsed.tipps), 
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
    

    
    def get_all_recipes(self):
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        cur.execute("SELECT * FROM recipes")
        raw_recipes = cur.fetchall()
        con.close()
        
        recipes_list = []
        for recipe in raw_recipes:
            formatted_recipe = {
                "title": recipe[0],
                "portions": recipe[1],
                "time": recipe[2].strip('"'),
                "ingredients": json.loads(recipe[3]),
                "steps": json.loads(recipe[4]),
                "tips": json.loads(recipe[5]) if len(recipe) > 5 else []
            }
            recipes_list.append(formatted_recipe)
        
        return recipes_list