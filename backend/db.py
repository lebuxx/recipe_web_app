import sqlite3
import json


class Database:
    def __init__(self):
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        cur.execute(("CREATE TABLE IF NOT EXISTS recipes(Titel, Portionen, Zubereitungszeit, Zutaten, Zubereitungsschritte, Tipps)"))
        cur.execute("CREATE TABLE IF NOT EXISTS previous_recipes_temp(Titel)")
        con.close()

    def save_recipes_temp(self, recipe):
        con = sqlite3.connect('saved_recipes.db')
        try:
            cur = con.cursor()
            # Check if there are already 7 recipes
            cur.execute("SELECT COUNT(*) FROM previous_recipes_temp")
            count = cur.fetchone()[0]
            if count >= 7:
                # Delete the oldest recipe
                cur.execute("DELETE FROM previous_recipes_temp WHERE rowid = (SELECT rowid FROM previous_recipes_temp ORDER BY rowid ASC LIMIT 1)")
            cur.execute(
                "INSERT INTO previous_recipes_temp (Titel) VALUES (?)",
                (recipe.parsed.titel,)
            )
            con.commit()
            print("Rezept temporär gespeichert")
        except Exception as e:
            print("Fehler beim Speichern des Rezepts:", e)
        finally:
            con.close()

    def save_recipe(self, recipe):
        con = sqlite3.connect('saved_recipes.db')
        try:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO recipes (Titel, Portionen, Zubereitungszeit, Zutaten, Zubereitungsschritte, Tipps) VALUES (?, ?, ?, ?, ?, ?)",
                    (
                str(recipe['titel']), 
                json.dumps(recipe['portionen']),
                json.dumps(recipe['zubereitungszeit']),
                json.dumps(recipe['zutaten']),
                json.dumps(recipe['zubereitungsschritte']),
                json.dumps(recipe['tipps']), 
                    )
            )
            con.commit()
            print("Rezept gespeichert")
        except Exception as e:
            print("Fehler beim Speichern des Rezepts:", e)
        finally:
            con.close()


    def get_previous_generated_recipes():
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        # Debugging
        cur.execute("SELECT Titel FROM previous_recipes_temp")
        all_titles = [row[0] for row in cur.fetchall()]
        for title in all_titles:
            print(title)
        cur.execute("SELECT Titel FROM previous_recipes_temp ORDER BY rowid DESC LIMIT 7")
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
                "titel": recipe[0],
                "portionen": recipe[1],
                "zubereitungszeit": recipe[2].strip('"'),
                "zutaten": json.loads(recipe[3]),
                "zubereitungsschritte": json.loads(recipe[4]),
                "tipps": json.loads(recipe[5]) if len(recipe) > 5 else []
            }
            recipes_list.append(formatted_recipe)
        
        return recipes_list
    
    def delete_recipe(self, recipe_title):
        con = sqlite3.connect('saved_recipes.db')
        cur = con.cursor()
        try:
            print(f"Attempting to delete recipe: '{recipe_title}'")
            
            # First check if the recipe exists
            cur.execute("SELECT COUNT(*) FROM recipes WHERE Titel = ?", (recipe_title,))
            count = cur.fetchone()[0]
            
            if count == 0:
                print(f"Recipe '{recipe_title}' not found in database")
                con.close()
                raise ValueError(f"Recipe '{recipe_title}' not found")
            
            # Delete the recipe
            cur.execute("DELETE FROM recipes WHERE Titel = ?", (recipe_title,))
            con.commit()
            
            # Verify deletion
            rows_affected = cur.rowcount
            print(f"Deleted recipe '{recipe_title}'. Rows affected: {rows_affected}")
            
            return True
        except Exception as e:
            print(f"Error deleting recipe '{recipe_title}': {str(e)}")
            con.rollback()
            raise
        finally:
            con.close()