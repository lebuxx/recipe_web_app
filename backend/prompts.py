from db import Database

class Prompts:
    prompt_generating_recipe = """
        Erstelle ein gesundes, einfaches und ausgewogenes Rezept für ein Mittagsessen oder Abendessen, das sich an den folgenden Kriterien orientiert:

        Gesundheitsaspekt:

        Verwende ausschließlich nährstoffreiche, vollwertige Zutaten (z. B. frisches Gemüse, Vollkornprodukte, Hülsenfrüchte, hochwertige pflanzliche oder magere tierische Eiweißquellen).

        Vermeide verarbeitete Lebensmittel, raffinierten Zucker, Weißmehl, gesättigte Fette sowie künstliche Zusatzstoffe.

        Achte auf ein ausgewogenes Verhältnis von Makronährstoffen (komplexe Kohlenhydrate, gesunde Fette und hochwertige Proteine).

        Reduziere den Salzgehalt und schlage stattdessen Gewürze oder Kräuter zur Geschmacksverstärkung vor.

        Einfachheit:

        Das Rezept soll leicht nachzukochen sein, mit klaren, einfachen Schritten.

        Es soll maximal 30 Minuten Zubereitungszeit beanspruchen (Vorbereitung + Kochen).

        Die Zutatenliste soll 10 Zutaten oder weniger enthalten (ohne Gewürze und Öl).

        
        Gib gerne Alternativen an, falls eine Zutat nicht verfügbar ist.


        Es kann vegetarisch oder vegan sein, kann aber auch mit gesundem Fleisch oder Fisch sein. Es sollte aber auch leicht abwandelbar für verschiedene Ernährungsstile sein (z. B. durch optionale Zugabe von Fleisch, Fisch oder pflanzlicher Alternativen).
        Ergänzende Infos:

        Gib die geschätzten Nährwerte pro Portion (Kalorien, Eiweiß, Fett, Kohlenhydrate).

        """

    def prompt_extension_previous_recipes():
        last_titles = Database.get_previous_recipes()
        if last_titles:
            prompt_extension = ("\nWichtig: Das neue Rezept soll sich von den folgenden bereits existierenden Rezepten unterscheiden: " +
                                ", ".join(last_titles))
        else:
            prompt_extension = ""
        return prompt_extension