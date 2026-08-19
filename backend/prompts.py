from db import Database

class Prompts:
    # Prompt for generating a healthy recipe
    prompt_generating_recipe = """
        Aufgabe:
        Erstelle ein gesundes, einfaches und ausgewogenes Rezept für ein Mittag- oder Abendessen. Es soll den wissenschaftlichen Standards einer vollwertigen Ernährung entsprechen, wie sie von der Deutschen Gesellschaft für Ernährung (DGE), WHO und anderen Gesundheitsorganisationen empfohlen wird.

        Gesundheitskriterien (Pflicht):
        - Verwende ausschließlich nährstoffreiche, vollwertige und unverarbeitete Zutaten.
        - Setze den Fokus auf frisches Gemüse, Vollkornprodukte, Hülsenfrüchte, Nüsse, Samen, pflanzliche Öle sowie hochwertige pflanzliche oder magere tierische Eiweißquellen.
        - Vermeide: raffinierten Zucker, Weißmehl, hochverarbeitete Lebensmittel, Transfette, gesättigte Fettsäuren in großen Mengen sowie künstliche Zusatzstoffe.
        - Achte auf ein ausgewogenes Verhältnis der Makronährstoffe:
            - Komplexe Kohlenhydrate mit hohem Ballaststoffanteil (Verhältnis min. 1:10 Ballaststoffe zu Kohlenhydraten).
            - Ungesättigte Fette (vor allem einfach & mehrfach ungesättigt, z. B. Olivenöl, Leinöl, Avocado, Nüsse).
            - Hochwertige Eiweißquellen (pflanzlich oder mager tierisch, falls pflanzliches Eiweiß verwendet wird, kombiniere verschiedene Quellen (z. B. Hülsenfrüchte + Vollkorn) zur Optimierung des Aminosäurenprofils).
        - Vermeide übermäßigen Salzgebrauch – stattdessen: frische oder getrocknete Kräuter, Gewürze, Zitrus, Knoblauch, Essig oder Senf als Geschmacksverstärker.

        Praktikabilität (Pflicht):
        - Das Rezept muss in maximal 30 Minuten (inkl. Vorbereitung & Kochen) umsetzbar sein.
        - Die Zutatenliste soll maximal 10 Hauptzutaten enthalten (Öl und Gewürze nicht mitgerechnet).
        - Die Zubereitung soll klar und in einfachen Schritten beschrieben sein.

        Flexibilität (Pflicht):
        - Gebe Tipps und Alternativen an (z.B. vegetarische, vegane oder fleisch-/fischhaltige Variationen, oder  Alternativen bei schwer erhältlichen Zutaten).

        Portionsgröße & Mengenformat:
        - Berechne alle Mengen für eine Portion.
        - Gib die Zutaten im Format an:
            float-Wert + deutsche Einheit (g, ml, EL, TL, Stück) + Name der Zutat (z.B. 80.0 g Vollkornreis, 1.0 EL Olivenöl, 0.5 Stück Zucchini)
        """
    
     # Prompt extension for a variation (The new recipe should differ from the seven previous recipes)
    @staticmethod
    def prompt_extension_previous_recipes():
        last_titles = Database.get_previous_generated_recipes()
        if last_titles:
            prompt_extension = ("\nWichtig: Das neue Rezept soll sich von den folgenden bereits existierenden Rezepten unterscheiden: " +
                                ", ".join(last_titles))
        else:
            prompt_extension = ""
        return prompt_extension
    
    # Prompt extension for ingredients (The ingredients that were entered should be used in the recipe suggestion)
    @staticmethod
    def prompt_extension_ingredients_at_home(ingredients: list):
        if ingredients:
            prompt_extension = f"Hier sind Zutaten die gerade Zuhause sind. Diese sollen in dem Rezeptvorschlag verwendet werden: {', '.join(ingredients)}"
        else:
            prompt_extension = ""
        return prompt_extension
    
    # The final prompt for generating a recipe with the extensions
    @staticmethod
    def generating_prompt(ingredients: list = None) -> str:
        prompt = Prompts.prompt_generating_recipe + Prompts.prompt_extension_ingredients_at_home(ingredients) + " " + Prompts.prompt_extension_previous_recipes()
        return prompt
    