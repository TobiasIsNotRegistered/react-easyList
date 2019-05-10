import React from 'react'
import TobiAppBar from './TobiAppBar';
import ListContainer from './ListContainer';
import 'firebase/firestore';

class DataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            currentListIndex: 0,
            suggestions: ["Agar Agar",
                "Agavensirup",
                "Älplermagronen, zubereitet",
                "Amaranth, Samen, gekocht(ohne Zugabe von Fett und Salz)",
                "Amaranth, Samen, roh",
                "Amaretti(Mandelgebäck)",
                "Ananas, gezuckert(Konserve)",
                "Ananas, roh",
                "Ananas, ungezuckert(Konserve)",
                "Apfel, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Apfel, geschält, getrocknet",
                "Apfelkuchen, gebacken(mit Blätterteig)",
                "Apfelkuchen, gebacken(mit Kuchenteig)",
                "Apfelmus, gezuckert(Konserve)",
                "Apfelmus, ungezuckert(Konserve)",
                "Apfel, roh",
                "Apfelsaft",
                "Apfelwein, 4 vol %",
                "Apfelwein, 6.2 vol %",
                "Appenzeller, viertelfett",
                "Appenzeller, vollfett",
                "Aprikose, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Aprikose, getrocknet",
                "Aprikose, gezuckert(Konserve)",
                "Aprikosenkuchen, gebacken(mit Blätterteig)",
                "Aprikosenkuchen, gebacken(mit Kuchenteig)",
                "Aprikose, roh",
                "Aprikose, ungezuckert(Konserve)",
                "Aubergine, gedünstet(ohne Zugabe von Fett und Salz)",
                "Auberginen - Piccata, zubereitet",
                "Auberginenscheiben, paniert, zubereitet",
                "Aubergine, roh",
                "Aufschnitt(Durchschnitt)",
                "Avocado, roh",
                "Bäckerhefe, gepresst",
                "Bami Goreng, zubereitet",
                "Banane, gedörrt",
                "Banane, getrocknet",
                "Banane, roh",
                "Basilikum, roh",
                "Basler Leckerli",
                "Bauernbratwurst, gebraten(ohne Zusatz von Fett un Salz)",
                "Bauernbratwurst, roh",
                "Bauernbrot",
                "Bauernsalami",
                "Bauernschüblig",
                "Baumnuss",
                "Baumnussbrot",
                "Baumnussöl",
                "Béchamelsauce hausgemacht",
                "Beeren(Durchschnitt), gekocht(ohne Zugabe von Zucker)",
                "Beeren(Durchschnitt), roh",
                "Berliner",
                "Berner Alpkäse",
                "Berner Hobelkäse",
                "Berner Zungenwurst",
                "Biber",
                "Bier, alkoholfrei",
                "Bierhefe, getrocknet",
                "Bier, Lager",
                "Bier Panache(Durchschnitt)",
                "Bierwurst",
                "Birchermüesli, zubereitet(ungezuckert)",
                "Birne, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Birne, getrocknet",
                "Birne, gezuckert(Konserve)",
                "Birnenkuchen, gebacken(mit Blätterteig)",
                "Birnenkuchen, gebacken(mit Kuchenteig)",
                "Birnensaft",
                "Birnenweggen",
                "Birne, roh",
                "Birne, ungezuckert(Konserve)",
                "Blanc battu mit Früchten, mit Süsstoffen",
                "Blanc battu, nature, mager",
                "Blätterteig hausgemacht(Butter), ungebacken",
                "Blätterteig hausgemacht(mit pflanzlichem Fett), ungebacken",
                "Blätterteigstängel",
                "Blattgemüse(Durchschnitt exkl.Salate), gedämpft(ohne Zugabe von Salz)",
                "Blattgemüse(Durchschnitt exkl.Salate), gedünstet(ohne Zugabe von Sal, z und Fett)",
                "Blattgemüse(Durchschnitt exkl.Salate), gekocht(ohne Zugabe von Salz , und Fett)",
                "Blattsalat(Durchschnitt), roh ",
                "Blauschimmelkäse(Durchschnitt)",
                "Blumenkohl, gedämpft(ohne Zugabe von Salz)",
                "Blumenkohl, roh",
                "Blutwurst",
                "Bohne(alle Arten), gekocht(ohne Zugabe von Fett und Salz)",
                "Bohne(alle Arten), getrocknet",
                "Bohne, grün, gedämpft(ohne Zugabe von Salz)",
                "Bohne, grün, getrocknet",
                "Bohne, grün, roh",
                "Bolognaisesauce",
                "Bouillon, Fleisch, zubereitet",
                "Bouillon, Geflügel, zubereitet",
                "Bouillon, Gemüse, zubereitet",
                "Branchli(Milchschokolade mit Haselnusscrèmefüllung)",
                "Branntwein aus Getreide, 40 vol % (z.B.Whisky)",
                "Branntwein aus Wein(z.B.Cognac, Brandy)",
                "Branntwein aus Zuckerrohr(z.B.Rum)",
                "Bratbutter",
                "Bratensauce, gebunden",
                "Bratensauce, klar",
                "Bresaola",
                "Brie, Rahm",
                "Brie, vollfett",
                "Broccoli, gedämpft(ohne Zugabe von Salz)",
                "Broccoli, roh",
                "Brombeere, roh",
                "Brombeerkuchen, gebacken(mit Blätterteig)",
                "Brombeerkuchen, gebacken(mit Kuchenteig)",
                "Brombeerkuchen, gebacken(mit süssem Mürbeteig)",
                "Brot(Durchschnitt)",
                "Brühwürste geräuchert(Durchschnitt)",
                "Brühwürste ungeräuchert(Durchschnitt)",
                "Brunnenkresse, roh",
                "Brunsli",
                "Buchweizen, Korn geschält",
                "Buchweizenmehl",
                "Bündner Gerstensuppe",
                "Bürli(halbweiss)",
                "Buttergipfeli, hell",
                "Buttergipfeli, Vollkorn",
                "Buttermilch",
                "Butterweggli",
                "Butterzopf",
                "Butterzopf, Vollkorn",
                "Café crème, ungezuckert",
                "Cake Financier",
                "Calimocho(Rotwein mit Cola)",
                "Camembert, halbfett",
                "Camembert, Rahm",
                "Camembert, vollfett",
                "Cannelloni mit Fleischfüllung, zubereitet",
                "Cannelloni mit Spinat - Ricotta - Füllung, zubereitet",
                "Cappuccino(ohne Schokoladenpulver), ungezuckert",
                "Capuns, zubereitet",
                "Cashewnuss",
                "Cervelat",
                "Champignon, gedünstet(ohne Zugabe von Fett und Salz)",
                "Champignon(Konserve)",
                "Champignon, roh",
                "Chicorée, gedämpft(ohne Zugabe von Salz)",
                "Chicorée, roh",
                "Chili con carne, zubereitet",
                "Chinakohl, gedünstet(ohne Zugabe von Fett und Salz)",
                "Chinakohl, roh",
                "Chräbeli(Anisgebäck)",
                "Cicorino rot, roh",
                "Cocktailsauce, selbst zubereitet mit Rapsöl - Mayonnaise",
                "Colagetränk, gezuckert",
                "Colagetränk, mit Süssstoffen",
                "Coleslaw Salat, zubereitet",
                "Coppa",
                "Cordon Bleu aus Kalbsplätzli, gebraten",
                "Cordon Bleu aus Schweinsplätzli, gebraten",
                "Cornflakes",
                "Cotechino",
                "Cotto(Fleischerzeugnis)",
                "Cracker, Salzgebäck, Apérogebäck",
                "Crèmeschnitte",
                "Crêpes mit Camembert, zubereitet",
                "Crêpes mit Champignonfüllung, zubereitet",
                "Crêpes mit Gemüsefüllung, zubereitet",
                "Crêpes mit Nutella, zubereitet",
                "Crêpes mit Schinken, zubereitet",
                "Crêpes mit Speck, zubereitet",
                "Crêpes mit Zimt und Zucker, zubereitet",
                "Crêpes nature, zubereitet",
                "Crevettencocktail, zubereitet",
                "Dattel, getrocknet",
                "Dinkelmehl, Ruch, Typ 1100",
                "Dinkelmehl, Vollkorn, Typ 1900",
                "Dinkelmehl, weiss, Typ 550",
                "Distelöl",
                "Doppelrahm, pasteurisiert",
                "Dorsch, Filet, gedämpft(ohne Zusatz von Fett und Salz)",
                "Dorsch, roh",
                "Dulce de Leche",
                "Edelkastanie, roh",
                "Egli, roh",
                "Eierlikör, 16.5 vol %",
                "Eieromeletten mit Käse, zubereitet",
                "Eieromeletten mit Schinken, zubereitet",
                "Eieromeletten mit Speck, zubereitet",
                "Eieromeletten, zubereitet",
                "Eierschwamm, gedünstet(ohne Zugabe von Fett und Salz)",
                "Eierschwamm, roh",
                "Eisbergsalat, roh",
                "Eistee, gezuckert",
                "Emmentaler, vollfett",
                "Endivie, roh",
                "Engadiner Nusstorte",
                "Erbse, grün, gedämpft(ohne Zugabe von Salz)",
                "Erbse, grün, roh",
                "Erbse(Konserve) ",
                "Erbse(Konserve), aufgewärmt(ohne Zugabe von Salz)",
                "Erbsen und Karotten(Konserve)",
                "Erbsen und Karotten(Konserve), aufgewärmt(ohne Zugabe von Salz)",
                "Erbse, reif, getrocknet",
                "Erbse, reif, getrocknet, gekocht(ohne Zusatz von Fett und Salz)",
                "Erdbeere, roh",
                "Erdnuss",
                "Erdnussbutter",
                "Erdnuss - Flips",
                "Erdnuss, geröstet",
                "Erdnussöl",
                "Espresso crème, ungezuckert",
                "Essig",
                "Essig - Öl - Salatsauce(mit Rapsöl)",
                "Federkohl, gedünstet(ohne Zugabe von Salz und Fett)",
                "Federkohl, roh",
                "Feige, getrocknet",
                "Feige, roh",
                "Felche, roh",
                "Fenchel, gedämpft(ohne Zugabe von Salz)",
                "Fenchel, roh",
                "Fisch(Durchschnitt), Filet, gedämpft(ohne Zusatz von Fett und Salz)",
                "Fisch(Durchschnitt), roh ",
                "Fischstäbchen, paniert und vorfritiert",
                "Fischstäbchen(paniert und vorfritiert), gebraten in HOLL - Rapsöl",
                "Fischstäbchen(paniert und vorfritiert), im Ofen gebacken(ohne Zugabe von Fett)",
                "Flammenkuchen, gebacken",
                "Flammenkuchenteig, ungebacken",
                "Fleisch(Durchschnitt exkl.Innereien), roh ",
                "Fleischkäse",
                "Fleischlasagne, zubereitet",
                "Flunder, Filet, gedämpft(ohne Zusatz von Fett und Salz)",
                "Flunder, roh",
                "Fondue alkoholfrei, zubereitet",
                "Fondue klassisch, zubereitet",
                "Fondue moitié - moitié, zubereitet",
                "Forelle, ganz, gekocht(ohne Zusatz von Fett und Salz)",
                "Forelle, roh",
                "Fotzelschnitte ungezuckert",
                "Freiburger Vacherin",
                "Frischkäse, Doppelrahm",
                "Früchte(Durchschnitt), gekocht(ohne Zugabe von Zucker)",
                "Früchte(Durchschnitt), getrocknet",
                "Früchte(Durchschnitt), roh",
                "Fruchtsaft(Durchschnitt), ungezuckert",
                "Fruchtsaft - Schorle(Durchschnitt, 60 % Saft - 40 % Wasser), ungezuckert",
                "Fruchtsalat, gezuckert(Konserve)",
                "Fruchtsalat, ungezuckert(Konserve)",
                "Fruchtwähe / -kuchen(Durchschnitt)",
                "Fruchtwähe / -kuchen mit Blätterteig(Durchschnitt)",
                "Fruchtwähe / -kuchen mit Kuchenteig(Durchschnitt)",
                "Fruchtwähe / -kuchen mit süssem Mürbeteig(Durchschnitt)",
                "Fünfkornbier",
                "Garnele, gekocht",
                "Garnele, roh",
                "Geflügelfleisch(Durchschnitt exkl.Innereien), roh",
                "Geflügelfleisch mit Haut(Durchschnitt), roh",
                "Geflügelfleisch ohne Haut(Durchschnitt exkl.Innereien), roh",
                "Geflügellyoner",
                "Gehacktes(Durchschnitt aus Rind, Kalb, Schwein, Poulet), gebraten(ohne Zusatz von Fett und Salz)",
                "Gehacktes(Durchschnitt aus Rind, Kalb, Schwein, Poulet), roh",
                "Gemüse(Durchschnitt), roh",
                "Gemüsegratin, gebacken",
                "Gemüselasagne, zubereitet",
                "Gerstenflocken",
                "Gerstotto, gekocht",
                "Geschnetzeltes(Durchschnitt aus Rind, Kalb, Schwein, Geflügel), gebraten(ohne Zusatz von Fett und Salz)",
                "Geschnetzeltes(Durchschnitt aus Rind, Kalb, Schwein, Geflügel), roh",
                "Getreideflocken(Durchschnitt)",
                "Gipfeli(Durchschnitt)",
                "Glarner Schabziger",
                "Gorgonzola",
                "Grapefruit(weiss oder rot), roh",
                "Greyerzer, vollfett",
                "Griessbrei, zubereitet(mit teilentrahmter Milch, ohne Zugabe von Zucker)",
                "Griessbrei, zubereitet(mit Vollmilch, ohne Zugabe von Zucker)",
                "Griessschnitte, zubereitet(mit teilentrahmter Milch)",
                "Griessschnitte, zubereitet(mit Vollmilch)",
                "Grittibänz",
                "Gugelhopf Grossmutter Art",
                "Gulaschsuppe",
                "Gummibonbon mit Fruchtessenz",
                "Gurke, in Essig eingelegt",
                "Gurke, roh",
                "Hackbraten, im Ofen gebacken",
                "Hackplätzli(Rind), gebraten in Rapsöl HOLL",
                "Haferbrei, zubereitet(mit teilentrahmter Milch, ohne Zugabe von Zucker)",
                "Haferbrei, zubereitet(mit Vollmilch, ohne Zugabe von Zucker)",
                "Haferflocken",
                "Haferkleie",
                "Halbentrahmte Milch 1.5 % Fett, UHT",
                "Halbfettbutter",
                "Halbrahm, pasteurisiert",
                "Halbrahm, UHT",
                "Halbweissbrot",
                "Hartkaramellen, Hartbonbons",
                "Hart - und Halbhartkäse, vollfett(Durchschnitt)",
                "Hartweizengriess, trocken",
                "Hase(Durchschnitt), roh",
                "Haselnuss",
                "Haselnusskekse",
                "Haselnussmakrone",
                "Haselnuss - Schokolade - Brotaufstrich",
                "Haselnussstängeli",
                "Hecht, roh",
                "Hefeteig(mit Butter), süss, ungebacken",
                "Hefeteig(mit pflanzlichem Fett), süss, ungebacken",
                "Heidelbeere, roh",
                "Heilbutt, roh",
                "Himbeere, roh",
                "Hinterschinken",
                "Hirsch(Durchschnitt), roh",
                "Hirsch, Entrecôte, roh",
                "Hirseflocken, Vollkorn",
                "Hirse, Korn geschält",
                "Hirsotto, gekocht",
                "Hollandaisesauce",
                "Holunderbeere, schwarz, roh",
                "Honig(Blütenhonig)",
                "Honigmelone, roh",
                "Hot Dog in Weissbrot mit Ketchup und Senf",
                "Hühnerei, ganz, festgekocht",
                "Hühnerei, ganz, roh",
                "Hühnereigelb, roh(Eidotter)",
                "Hühnereiweiss, roh(Eiklar)",
                "Hülsenfrüchte(Durchschnitt), gekocht(ohne Zugabe von Fett und Salz)",
                "Hülsenfrüchte(Durchschnitt), getrocknet",
                "Hüttenkäse, nature",
                "Instant - Kartoffelstock, zubereitet(mit Wasser und Butter)",
                "Jägersauce",
                "Joghurt Bifidus, nature",
                "Joghurt, Erdbeer",
                "Joghurt gezuckert(Durchschnitt)",
                "Joghurt, Haselnuss",
                "Joghurt mit Aroma, mager, mit Süssstoffen",
                "Joghurt mit Früchten, mager, mit Süssstoffen",
                "Joghurt, Mokka",
                "Joghurt, Mokka, Bio",
                "Joghurt, nature",
                "Joghurt, nature, mager",
                "Joghurt - Salatsauce(ohne Öl)",
                "Joghurt, Schokolade",
                "Joghurt, Vanille",
                "Johannisbeere, rot, roh",
                "Johannisbeere, schwarz, roh",
                "Johannisbeerkuchen, gebacken(mit Blätterteig)",
                "Johannisbeerkuchen, gebacken(mit Kuchenteig)",
                "Johannisbeerkuchen, gebacken(mit süssem Mürbeteig)",
                "Kaffee löslich, Pulver",
                "Kaffeerahm",
                "Kaffee, schwarz, ungezuckert",
                "Kakaobutter",
                "Kakaopulver",
                "Kaki, roh",
                "Kalb, Brust, gekocht(ohne Zugabe von Fett und Salz)",
                "Kalb, Brust, roh",
                "Kalb, Eckstück, roh",
                "Kalb, Filet, roh",
                "Kalbfleisch(Durchschnitt exkl.Innereien, Kotelett), roh",
                "Kalb, Gehacktes, roh",
                "Kalb, Geschnetzeltes, gebraten(ohne Zugabe von Fett und Salz)",
                "Kalb, Geschnetzeltes, roh",
                "Kalb, Haxe, geschmort(ohne Zugabe von Fett und Salz)",
                "Kalb, Haxe, roh",
                "Kalb, Kotelett, roh",
                "Kalb, Leber, roh",
                "Kalb, Milken, roh",
                "Kalb, Niere, roh",
                "Kalb, Nierstück, Steak, gebraten(ohne Zugabe von Fett und Salz)",
                "Kalb, Nierstück, Steak, roh",
                "Kalb, Runder Mocken, roh",
                "Kalbsbratwurst",
                "Kalb, Schulter, Braten, im Ofen gebraten(ohne Zugabe von Fett und Salz)",
                "Kalb, Schulter, Braten, roh",
                "Kalbspiccata, zubereitet",
                "Kalbsplätzli, gebraten in HOLL - Rapsöl",
                "Kalbsplätzli, gebraten(ohne Zugabe von Fett und Salz)",
                "Kalbsragout mit Sauce, zubereitet",
                "Kalb, Voressen, roh",
                "Kalb, Zunge, roh",
                "Kalmar, roh",
                "Kaninchen(Durchschnitt), gekocht(ohne Zusatz von Fett und Salz)",
                "Kaninchen(Durchschnitt), roh",
                "Kaninchen, Filet, roh",
                "Karotte, gedämpft(ohne Zugabe von Salz)",
                "Karottensaft",
                "Karotte, roh",
                "Kartoffelflocken, mit Milchpulver und Salz(Instant - Kartoffelstock)",
                "Kartoffel, geschält, gedämpft(ohne Zugabe von Salz)",
                "Kartoffel, geschält, roh",
                "Kartoffelgratin dauphinois, zubereitet",
                "Kartoffelgratin Savoyer Art, zubereitet",
                "Kartoffelsalat mit Essig - Öl - Sauce",
                "Kartoffelsalat mit Mayonnaise - Joghurt - Sauce",
                "Kartoffelstärke",
                "Kartoffelstock, zubereitet(mit Rahm und Butter)",
                "Kartoffelstock, zubereitet(mit teilentrahmter Milch und Butter)",
                "Kartoffelstock, zubereitet(mit Vollmilch und Butter)",
                "Käse in Salzlake(Kuhmilch)",
                "Käse in Salzlake(Schaf - und Ziegenmilch)",
                "Käsekuchen, gebacken(mit Blätterteig)",
                "Käsekuchen, gebacken(mit Kuchenteig)",
                "Käsereibutter",
                "Käseschnitte, zubereitet",
                "Kebab im Fladenbrot",
                "Kefe, gedämpft(ohne Zugabe von Salz)",
                "Kefe, roh",
                "Ketchup",
                "Kichererbse, gekocht(ohne Zugabe von Fett und Salz)",
                "Kichererbse, getrocknet",
                "Kirsch",
                "Kirsche, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Kirschenkuchen, gebacken(mit Blätterteig)",
                "Kirschenkuchen, gebacken(mit Kuchenteig)",
                "Kirsche, roh",
                "Kiwi, roh",
                "Knäckebrot, Vollkorn",
                "Knäckebrot, Vollkorn mit Leinsamen",
                "Knäckebrot, Vollkorn mit Sesam",
                "Knoblauch, roh",
                "Knollensellerie, gedämpft(ohne Zugabe von Salz)",
                "Knollensellerie, roh",
                "Knöpflimehl",
                "Kochbutter",
                "Kochpökelware(Durchschnitt)",
                "Kochsalz mit Jod",
                "Kochsalz mit Jod und Fluor",
                "Kochsalz ohne Jod und Fluor",
                "Kochspeck",
                "Kochwürste(Durchschnitt)",
                "Kohlgemüse(Durchschnitt), gekocht(ohne Zugabe von Salz und Fett)",
                "Kohlgemüse(Durchschnitt), roh",
                "Kohlrabi, gedämpft(ohne Zugabe von Salz)",
                "Kohlrabi, roh",
                "Kokosfett",
                "Kokosmakronen",
                "Kokosnuss",
                "Kokosnuss, getrocknet(Kokosrapseln, Kokosflocken)",
                "Kondensmilch, gezuckert",
                "Kondensmilch, ungezuckert",
                "Konfitüre",
                "Konfitüre, energievermindert, mit Süssstoffen",
                "Kopfsalat, roh",
                "Kotelett(Durchschnitt aus Kalb, Schwein, Lamm), gebraten(ohne Zusatz von Fett und Salz)",
                "Kotelett(Durchschnitt aus Kalb, Schwein, Lamm), roh",
                "Krustentiere(Durchschnitt), roh",
                "Kuchenteig(mit Butter), ungebacken",
                "Kuchenteig(mit pflanzlichem Fett), ungebacken",
                "Kuchenteig, Vollkorn(mit Butter), ungebacken",
                "Kuchenteig, Vollkorn(mit pflanzichem Fett), ungebacken",
                "Kürbis, gedämpft(ohne Zugabe von Salz)",
                "Kürbiskerne",
                "Kürbiskernöl",
                "Kürbis - Piccata, zubereitet",
                "Kürbis, roh",
                "Kürbisscheiben, paniert, zubereitet",
                "Lachs, geräuchert",
                "Lachs, wild, roh",
                "Lachs, Zucht, Filet, gedämpft(ohne Zusatz von Fett und Salz)",
                "Lachs, Zucht, roh",
                "Lamm, Filet, medium gebraten(ohne Zusatz von Fett und Salz)",
                "Lamm, Filet, roh",
                "Lamm, Gigot, gebraten(ohne Zusatz von Fett und Salz)",
                "Lamm, Gigot, roh(Schweiz, Neuseeland)",
                "Lamm, Kotelett, roh(Schweiz)",
                "Lamm, Nierstück, roh(Australien, Neuseeland)",
                "Lamm, Racks, roh(Australien, Neuseeland)",
                "Lammragout mit Sauce, zubereitet",
                "Lamm / Schaf(Durchschnitt exkl.Innereien, Kotelett), roh",
                "Lamm, Voressen, roh(Schweiz)",
                "Landjäger",
                "Latte macchiato, ungezuckert",
                "Lattich, roh",
                "Lauch, gedünstet(ohne Zugabe von Fett und Salz)",
                "Lauch, roh",
                "Laugenbrötli",
                "Laugengebäck trocken(Bretzel, Sticks)",
                "Laugengipfeli",
                "Leber(Durchschnitt aus Rind, Kalb, Schwein), gebraten(ohne Zusatz von Fett und Salz)",
                "Leber(Durchschnitt aus Rind, Kalb, Schwein), roh",
                "Leberwurst",
                "Lebkuchen",
                "Lebkuchen mit Schokoladeüberzug",
                "Leinöl, kaltgepresst",
                "Leinsamen",
                "Lemon Curd",
                "Limburger(Münster)",
                "Limonade, mit Aroma, gezuckert",
                "Linse, ganz, gekocht(ohne Zugabe von Fett und Salz)",
                "Linse, ganz, getrocknet",
                "Linse, geschält, gekocht(ohne Zugabe von Fett und Salz)",
                "Linse, geschält, getrocknet",
                "Linzertorte",
                "Löffelbiscuit",
                "Luganighe",
                "Lyoner",
                "Madeleine",
                "Magermilchpulver",
                "Magermilch, UHT",
                "Mailänderli",
                "Mais - Chips(Apérogebäck)",
                "Mais, gedämpft(ohne Zugabe von Salz)",
                "Maisgriess, gekocht",
                "Maisgriess, trocken",
                "Maiskeimöl",
                "Maiskölbchen, in Essig eingelegt",
                "Mais, roh",
                "Maisstärke",
                "Mandarine, roh",
                "Mandel",
                "Mandel, geröstet, gesalzen",
                "Mandel, ohne Fett geröstet, gesalzen",
                "Mangold, gedämpft(ohne Zugabe von Salz)",
                "Mangold, roh",
                "Mango, roh",
                "Margarine",
                "Marmorkuchen",
                "Marzipan",
                "Mascarpone",
                "Mayonnaise",
                "Mayonnaise, kalorienvermindert",
                "Mayonnaise, selbst zubereitet mit Rapsöl",
                "Mehl(Durchschnitt)",
                "Mehl, hell(Durchschnitt)",
                "Mehlomeletten mit Champignonfüllung, zubereitet",
                "Mehlomeletten mit Gemüsefüllung, zubereitet",
                "Mehlomeletten mit Käse, zubereitet",
                "Mehlomeletten mit Nutella, zubereitet",
                "Mehlomeletten mit Schinken, zubereitet",
                "Mehlomeletten mit Speck, zubereitet",
                "Mehlomeletten mit Zimt und Zucker, zubereitet",
                "Mehlomeletten, zubereitet",
                "Melasse, Melassesirup",
                "Meringue",
                "Miesmuschel, roh",
                "Milch(Durchschnitt)",
                "Milchkaffee dunkel, ungezuckert",
                "Milchkaffee hell, ungezuckert",
                "Milchkaffee, ungezuckert",
                "Milchreis, zubereitet(mit teilentrahmter Milch, ohne Zugabe von Zucker)",
                "Milchreis, zubereitet(mit Vollmilch, ohne Zugabe von Zucker)",
                "Milchschokolade",
                "Milchschokolade mit Alkoholfüllung",
                "Milchschokolade mit Crèmefüllung(Gianduja, Nougat)",
                "Milchschokolade mit Mandel - Honig - Nougat",
                "Milchschokolade mit Nüssen",
                "Milchschokolade mit Weinbeeren, Nüssen und Mandeln",
                "Minestrone",
                "Minipic Würstchen",
                "Mirabelle, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Mirabelle, roh",
                "Molke, süss",
                "Morchel, gedünstet(ohne Zugabe von Fett und Salz)",
                "Morchel, roh",
                "Mortadella",
                "Mostbröckli",
                "Mozzarella",
                "Mürbeteig(mit Butter), süss, ungebacken",
                "Mürbeteig(mit pflanzlichem Fett), süss, ungebacken",
                "Mütschli",
                "Nasi Goreng, zubereitet",
                "Nektarine, roh",
                "Nussgipfel aus Blätterteig",
                "Nussgipfel aus Hefeteig",
                "Nüsslisalat, roh",
                "Nussschnecke aus Hefeteig",
                "Ofen - Frites, tiefgekühlt",
                "Olive, gefüllt mit Hackfleisch, frittiert",
                "Olive, grün",
                "Olivenöl",
                "Olive, schwarz",
                "Orangennektar",
                "Orangensaft",
                "Orangensaft, angereichert mit Vitamin C",
                "Orange, roh",
                "Palmöl - Palmfett",
                "Pancetta",
                "Panettone",
                "Paniermehl",
                "Pantli",
                "Paprika(Gewürz)",
                "Paranuss",
                "Pariserbrot",
                "Parmesan",
                "Passionsfrucht, roh",
                "Pâté de campagne",
                "Peperoni, grün, gedünstet(ohne Zugabe von Fett und Salz)",
                "Peperoni, grün, roh",
                "Peperoni, rot, gedünstet(ohne Zugabe von Fett und Salz)",
                "Peperoni, rot, roh",
                "Petersilie, roh",
                "Pfefferminze, roh",
                "Pferderagout mit Sauce, zubereitet",
                "Pferd, Filet, gebraten(ohne Zusatz von Fett und Salz)",
                "Pferd, Filet, roh",
                "Pfirsich, gezuckert(Konserve)",
                "Pfirsich, roh",
                "Pfirsich, ungezuckert(Konserve)",
                "Pflaume, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Pflaume, getrocknet",
                "Pflaumenkuchen, gebacken(mit Blätterteig)",
                "Pflaumenkuchen, gebacken(mit Kuchenteig)",
                "Pflaume, roh",
                "Pilz(Durchschnitt), gedünstet(ohne Zugabe von Fett und Salz)",
                "Pilz(Durchschnitt), roh",
                "Pilzrisotto, gekocht",
                "Pilzsauce, gebunden",
                "Pilzsuppe",
                "Pinienkerne",
                "Pistazie",
                "Pizza al tonno, gebacken",
                "Pizza Calzone, gebacken",
                "Pizza Hawaii, gebacken",
                "Pizza Margherita, gebacken",
                "Pizza mit Gemüse, gebacken",
                "Pizza mit Mascarpone und Rucola, gebacken",
                "Pizza Prosciutto e Funghi, gebacken",
                "Pizza Prosciutto, gebacken",
                "Pizza Quattro Formaggi, gebacken",
                "Pizzateig(mit Olivenöl), ungebacken",
                "Plätzli(Durchschnitt aus Geflügel, Kalb, Rind, Schwein), gebraten(ohne Zusatz von Fett und Salz)",
                "Plätzli(Durchschnitt aus Rind, Kalb, Schwein, Geflügel), roh ",
                "Polenta nera(aus Maisgriess und Buchweizenmehl), gekocht",
                "Pommes Chips",
                "Pommes Chips fettreduziert",
                "Pommes Frites(im Ofen gebacken), ungesalzen",
                "Pommes Frites(in HO Sonnenblumenöl fritiert), ungesalzen",
                "Popcorn",
                "Portwein, 18.5 vol %",
                "Poulet, Brust, mit Haut, roh(Frankreich)",
                "Poulet, Brust, mit Haut, roh(Schweiz)",
                "Poulet, Brust, ohne Haut, roh(Frankreich)",
                "Poulet, Brust, ohne Haut, roh(Schweiz)",
                "Poulet, Brust, Schnitzel oder Geschnetzeltes, gebraten(ohne Zusatz von Fett und Salz)",
                "Poulet, Brust, Schnitzel, roh",
                "Poulet, ganz, mit Haut, gebraten(ohne Zusatz von Fett und Salz)",
                "Poulet, ganz, mit Haut, roh",
                "Poulet, Schenkel, mit Haut, gebraten(ohne Zusatz von Fett und Salz)",
                "Poulet, Schenkel, mit Haut, roh",
                "Poulet, Schenkel, mit Haut, roh(Frankreich)",
                "Poulet, Schenkel, mit Haut, roh(Schweiz)",
                "Poulet, Schenkel, ohne Haut, roh(Frankreich)",
                "Poulet, Schenkel, ohne Haut, roh(Schweiz)",
                "Preiselbeere, roh",
                "Prussien",
                "Pudding, Caramel",
                "Pudding, Schokolade",
                "Pudding, Vanille",
                "Quarkblätterteig(mit Butter), ungebacken",
                "Quarkblätterteig(mit pflanzlichem Fett), ungebacken",
                "Quark, nature, halbfett",
                "Quark, nature, mager",
                "Quark, nature, Rahm",
                "Quiche Lorraine, gebacken(mit Blätterteig)",
                "Quiche Lorraine, gebacken(mit Kuchenteig)",
                "Quinoa, gekocht(ohne Zugabe von Salz und Fett)",
                "Quinoa, roh",
                "Quitte, gekocht, abgetropft(ohne Zugabe von Zucker)",
                "Quitte, roh",
                "Raclettekäse",
                "Radieschen, roh",
                "Rahm(Durchschnitt)",
                "Rahmglace, Frucht",
                "Rahmkaramellen",
                "Rande, gedämpft(ohne Zugabe von Salz)",
                "Rande, roh",
                "Rapsöl",
                "Rapsöl HOLL(high oleic, low linolenic)",
                "Ratatouille, zubereitet",
                "Rauchsalami",
                "Reblochon",
                "Reh(Durchschnitt), roh",
                "Reh, Ragout, roh",
                "Reh, Schnitzel, roh",
                "Reibkäse",
                "Reis parboiled, gekocht in Salzwasser(unjodiert)",
                "Reis parboiled, trocken",
                "Reis poliert, gekocht in Salzwasser(unjodiert)",
                "Reis poliert, trocken",
                "Reis unpoliert, gekocht in Salzwasser(unjodiert)",
                "Reis unpoliert, trocken",
                "Rettich, roh",
                "Rhabarberkuchen, gebacken(mit Blätterteig)",
                "Rhabarberkuchen, gebacken(mit Kuchenteig)",
                "Rhabarber, roh",
                "Rind, Brust, gekocht(ohne Zugabe von Fett und Salz)",
                "Rind, Brust, roh",
                "Rind, Eckstück, roh",
                "Rind, Entrecôte, medium gebraten(ohne Zusatz von Fett und Salz)",
                "Rind, Entrecôte, roh",
                "Rind, Entrecôte, roh(Schweiz)",
                "Rind, Entrecôte, roh(USA)",
                "Rind, Filet, medium gebraten(ohne Zustatz von Fett und Salz)",
                "Rind, Filet, roh",
                "Rindfleisch(Durchschnitt exkl.Innereien, Rippensteak), roh",
                "Rind, Gehacktes, gebraten(ohne Zusatz von Fett und Salz)",
                "Rind, Gehacktes, roh",
                "Rind, Geschnetzeltes, roh",
                "Rind, Hals, roh",
                "Rind, Hohrücken, roh(Schweiz)",
                "Rind, Hohrücken, roh(USA)",
                "Rind, Leber, roh",
                "Rind, Runder Mocken, roh",
                "Rind, Schulter, Braten medium im Ofen gebraten(ohne Zugabe von Fett und Salz)",
                "Rind, Schulter, Braten rare, im Ofen gebraten(ohne Zugabe von Fett, und Salz)",
                "Rind, Schulter, Braten, roh",
                "Rind, Schulter, Braten well done, im Ofen gebraten(ohne Zugabe von Fett und Salz)",
                "Rind, Siedfleisch, durchzogen, gekocht(ohne Zusatz von Fett und Salz",
                "Rind, Siedfleisch, durchzogen, roh",
                "Rind, Siedfleisch, mager, gekocht(ohne Zusatz von Fett and Salz)",
                "Rind, Siedfleisch, mager, roh",
                "Rindsragout mit Sauce, zubereitet",
                "Rind, Voressen, roh",
                "Rind, Zunge, roh",
                "Rippli(Nierstück), roh",
                "Risotto ohne Käse, gekocht",
                "Ristretto crème, ungezuckert",
                "Riz Casimir mit Kalbfleisch, zubereitet",
                "Riz Casimir mit Poulet, zubereitet",
                "Roggenbrot mit Sauerteig",
                "Roggenmehl, halbweiss, Typ 815",
                "Roggenmehl, Ruch, Typ 1050",
                "Roggenmehl, Vollkorn, Schrot, Typ 1800",
                "Roggenschrotbrot",
                "Rohessspeck",
                "Rohpökelwaren(Durchschnitt)",
                "Rohschinken",
                "Rohwürste / Dauerwürste(Durchschnitt)",
                "Rohwürste mit abgebrochener Reifung(Durchschnitt)",
                "Rollgerste",
                "Rollmops",
                "Rollschinken",
                "Rollschinken, gekocht(ohne Zusatz von Fett und Salz)",
                "Roquefort",
                "Rosenkohl, gedämpft(ohne Zugabe von Salz)",
                "Rosenkohl, roh",
                "Rosine, getrocknet",
                "Rosmarin, roh",
                "Rösti, Fertigprodukt",
                "Rotkohl, gedünstet(ohne Zugabe von Fett und Salz)",
                "Rotkohl, roh",
                "Ruchbrot",
                "Rucola, roh",
                "Rüeblitorte",
                "Rührei mit Champignons, zubereitet",
                "Rührei mit Käse, zubereitet",
                "Rührei mit Kräutern, zubereitet",
                "Rührei mit Schinken, zubereitet",
                "Rührei, zubereitet",
                "Rührteigcake Gleichschwer",
                "Russischer Salat, zubereitet",
                "Sablé, Butter",
                "Salametti",
                "Salami(Billiglinie)",
                "Salami Typ Nostrano",
                "Salatsauce französisch(mit Rapsöl)",
                "Salatsauce italienisch(mit Olivenöl)",
                "Salbei, roh",
                "Salsiz",
                "Saltimbocca, gebraten in HOLL - Rapsöl",
                "Samen, Kerne, Nüsse(Durchschnitt), ungesalzen",
                "Samosa, frittiert",
                "Samosa, gebacken",
                "Sandwich(Baguette) mit Aufschnitt",
                "Sandwich(Baguette) mit Fleischkäse",
                "Sandwich(Baguette) mit Halbhartkäse",
                "Sandwich(Baguette) mit Mozzarella",
                "Sandwich(Baguette) mit Rohschinken",
                "Sandwich(Baguette) mit Salami",
                "Sandwich(Baguette) mit Schinken",
                "Sandwich(Baguette) mit Trockenfleisch",
                "Sandwich(Baguette) mit Weichkäse",
                "Sandwich(Ruchbrot) mit Aufschnitt",
                "Sandwich(Ruchbrot) mit Fleischkäse",
                "Sandwich(Ruchbrot) mit Halbhartkäse",
                "Sandwich(Ruchbrot) mit Mozzarella",
                "Sandwich(Ruchbrot) mit Rohschinken",
                "Sandwich(Ruchbrot) mit Salami",
                "Sandwich(Ruchbrot) mit Schinken",
                "Sandwich(Ruchbrot) mit Trockenfleisch",
                "Sandwich(Ruchbrot) mit Weichkäse",
                "Sardelle im Öl, abgetropft",
                "Sardellenpaste",
                "Sardine im Öl, abgetropft",
                "Sardine, roh",
                "Saucisse aux choux",
                "Saucisson",
                "Saucisson, gekocht(ohne Zusatz von Fett und Salz)",
                "Saucisson vaudois",
                "Sauerkraut, in Essig eingelegt",
                "Sauerrahm",
                "Saurer Halbrahm",
                "Sbrinz",
                "Scampi(Kaisergranat), roh",
                "Schafmilch",
                "Schaumwein",
                "Schmelzkäse, Scheibe, Rahm",
                "Schmelzkäse, Scheibe, viertelfett",
                "Schmelzkäse, Scheibe, vollfett",
                "Schmelzkäse, streichfähig, Rahm",
                "Schmelzkäse, streichfähig, viertelfett",
                "Schmelzkäse, streichfähig, vollfett",
                "Schnittlauch, roh",
                "Schnitzelbrot mit Cocktailsauce",
                "Schnitzelbrot mit Tartarsauce",
                "Schokolade, dunkel(bitter)",
                "Schokoladencrème",
                "Schokoladengugelhopf",
                "Schokoladenpulver",
                "Schokolade, weiss",
                "Scholle, roh",
                "Schützenwurst",
                "Schwarzwälder Kirschtorte",
                "Schwarzwurzel, gedämpft(ohne Zugabe von Salz)",
                "Schwarzwurzel, roh",
                "Schwein, Brustspitz, roh",
                "Schwein, Eckstück, Plätzli, gebraten(ohne Zusatz von Fett und Salz)",
                "Schwein, Eckstück, roh",
                "Schweinefleisch(Durchschnitt exkl.Innereien, Kotelett, Haxe), roh",
                "Schweineschmalz",
                "Schwein, Filet, gebraten(ohne Zusatz von Fett und Salz)",
                "Schwein, Filet, roh",
                "Schwein, Gehacktes, roh",
                "Schwein, Geschnetzeltes, gebraten(ohne Zusatz von Fett und Salz)",
                "Schwein, Geschnetzeltes, roh",
                "Schwein, Hals, Steak, gebraten(ohne Zusatz von Fett und Salz)",
                "Schwein, Hals, Steak, roh",
                "Schwein, Haxe, geschmort(ohne zusatz von Fett und Salz)",
                "Schwein, Haxe, roh",
                "Schwein, Kotelett, gebraten(ohne Zusatz von Fett und Salz)",
                "Schwein, Kotelett, roh",
                "Schwein, Leber, roh",
                "Schwein, Nierstück, roh",
                "Schwein, Runder Mocken, roh",
                "Schweinsbratwurst",
                "Schwein, Schulter, Braten medium im Ofen gebraten(ohne Zugabe von Fett und Salz)",
                "Schwein, Schulter, Braten, roh",
                "Schwein, Schulter, Braten well done im Ofen gebraten(ohne Zugabe von Fett und Salz)",
                "Schweinspiccata, zubereitet",
                "Schweinsragout mit Sauce, zubereitet",
                "Schweinswurst",
                "Schwein, Voressen, roh",
                "Schweizer Salami, Schweine - und Rindfleisch",
                "Seehecht, roh",
                "Seelachs, roh",
                "Seezunge, roh",
                "Sellerie - Piccata, zubereitet",
                "Selleriescheiben, paniert, zubereitet",
                "Semmeli",
                "Sesamsamen ungeschält",
                "Sherry, 18.5 vol %",
                "Siedfleischsalat, zubereitet",
                "Silberzwiebel, in Essig eingelegt",
                "Sirup unverdünnt",
                "Sirup zubereitet(verdünnt im Verhältnis 1: 5.5)",
                "Sojabohne, gekocht(ohne Zugabe von Fett und Salz)",
                "Sojabohne, getrocknet",
                "Soja Drink, nature",
                "Sojamehl, entfettet",
                "Sojamehl, vollfett",
                "Sojaöl",
                "Sojasprossen, roh",
                "Sonnenblumenkerne",
                "Sonnenblumenöl",
                "Sonnenblumenöl HO(high oleic), raffiniert",
                "Sorbet, Frucht",
                "Spargel, gedämpft(ohne Zugabe von Salz)",
                "Spargel, roh",
                "Spinat, gedämpft(ohne Zugabe von Salz)",
                "Spinatkuchen, gebacken(mit Blätterteig)",
                "Spinatkuchen, gebacken(mit Kuchenteig)",
                "Spinat, roh",
                "Spirituosen 40 vol % (z.B.Vodka, Gin)",
                "Spitzbube(Mürbeteiggebäck mit Konfitüre)",
                "Stachelbeere, roh",
                "Stangensellerie, gedämpft(ohne Zugabe von Salz)",
                "Stangensellerie, roh",
                "Steinpilz, gedünstet(ohne Zugabe von Fett und Salz)",
                "Steinpilz, roh",
                "St.Galler Bürli(halbweiss)",
                "St.Galler Schüblig",
                "St.Paulin",
                "Strudelteig, ungebacken",
                "Surimi",
                "Süsskartoffel, gedämpft(ohne Zugabe von Salz)",
                "Süsskartoffel, roh",
                "Taboulé, zubereitet(mit Bulgur)",
                "Taboulé, zubereitet(mit Couscous)",
                "Tartarsauce, selbst zubereitet mit Rapsöl - Mayonnaise",
                "Tee, ungezuckert",
                "Teigwarenauflauf mit Schinken, zubereitet",
                "Teigwaren mit Ei, gekocht im Salzwasser(unjodiert)",
                "Teigwaren mit Ei, trocken",
                "Teigwaren ohne Ei, gekocht im Salzwasser(unjodiert)",
                "Teigwaren ohne Ei, trocken",
                "Teigwaren ohne Ei, Vollkorn, gekocht im Salzwasser(unjodiert)",
                "Teigwaren ohne Ei, Vollkorn, trocken",
                "Teigwarensalat mit französischer Sauce",
                "Teigwarensalat mit italienischer Sauce",
                "Teilentrahmte Milch, pasteurisiert",
                "Teilentrahmte Milch, UHT",
                "Tessinerbrot",
                "Tête de Moine",
                "Thon im Öl, abgetropft",
                "Thon im Wasser, abgetropft",
                "Thonsalat an Essig - Öl - Sauce(aus Thon im Wasser)",
                "Thunfisch, roh",
                "Thymian, roh",
                "Tilsiter, pasteurisiert, vollfett",
                "Tilsiter, Rohmilch, vollfett",
                "Tirolercake",
                "Toastbrot mit Butter",
                "Toastbrot mit Pflanzenölen",
                "Tofu",
                "Tomate, gedünstet(ohne Zugabe von Fett und Salz)",
                "Tomate, geschält(Konserve)",
                "Tomatenkuchen, gebacken(mit Blätterteig)",
                "Tomatenkuchen, gebacken(mit Kuchenteig)",
                "Tomatenpüree",
                "Tomatensaft",
                "Tomatensauce",
                "Tomatensuppe",
                "Tomate, roh",
                "Tomme",
                "Traubenkernöl",
                "Traubensaft",
                "Traubenzucker",
                "Traube, roh",
                "Trinkwasser(Mittelwert Schweiz)",
                "Trockenfleisch",
                "Truthahn, Brust, Schnitzel oder Geschnetzeltes, grebraten(ohne Zusatz von Fett und Salz)",
                "Truthahn, Brust, Schnitzel oder Geschnetzeltes, roh",
                "Vacherin Mont d'Or",
                "Vanillecrème, gekocht",
                "Vinaigrette(mit Rapsöl)",
                "Vitello tonnato mit Garnitur",
                "Vitello tonnato ohne Garnitur",
                "Vollkornreiswaffel",
                "Vollmilch, pasteurisiert",
                "Vollmilchpulver",
                "Vollmilch, UHT",
                "Vollrahm, pasteurisiert",
                "Vollrahm, UHT",
                "Vorderschinken",
                "Vorzugsbutter",
                "Walliser Roggenbrot",
                "Wasabi Paste",
                "Wassereis",
                "Wassermelone, roh",
                "Weichkaramellen, Bonbons",
                "Weichkäse, Doppelrahm",
                "Weichkäse(Durchschnitt ohne fettreduzierte Varianten)",
                "Weichkäse, Rahm",
                "Weichkäse, vollfett",
                "Wein rot, 12 vol %",
                "Wein rot, 13.5 vol %",
                "Wein rot, 9 vol %",
                "Wein weiss, 11 vol %",
                "Wein weiss, 12.5 vol %",
                "Wein weiss, gespritzt, sauer",
                "Wein weiss, gespritzt, süss",
                "Weissbrot",
                "Weisskohl, gedämpft(ohne Zugabe von Salz)",
                "Weisskohl, gedünstet(ohne Zugabe von Fett und Salz)",
                "Weisskohl, roh",
                "Weisswurst",
                "Weizenflocken, Vollkorn",
                "Weizenkeime",
                "Weizenkeimöl",
                "Weizenkleie",
                "Weizenmehl(Backmehl), Typ 550",
                "Weizenmehl, halbweiss, Typ 720",
                "Weizenmehl, Ruch, Typ 1100",
                "Weizenmehl, Vollkorn, Typ 1700",
                "Weizenmehl, weiss, Typ 400",
                "Weizenotto, gekocht",
                "Weizenstärke",
                "Weizenvollkornbrot",
                "Weizen(Weichweizen), ganzes Korn",
                "Wermut, 15 vol %",
                "Wienerli",
                "Wienerli, gekocht",
                "Wildfleisch(Durchschnitt), gekocht(ohne Zusatz von Fett und Salz)",
                "Wildfleisch(Durchschnitt), roh",
                "Wildfleischterrine",
                "Wildschwein(Durchschnitt), roh",
                "Wirz, gedämpft(ohne Zugabe von Salz)",
                "Wirz, roh",
                "Wurst - Käse - Salat, zubereitet",
                "Wurstsalat, zubereitet",
                "Wurzel - und Knollengemüse(Durchschnitt), gedämpft(ohne Zugabe von Salz)",
                "Wurzel - und Knollengemüse(Durchschnitt), gedünstet(ohne Zugabe von Fett und Salz)",
                "Wurzel - und Knollengemüse(Durchschnitt), gekocht(ohne Zugabe von Fett und Salz)",
                "Wurzel - und Knollengemüse(Durchschnitt), roh",
                "Zampone",
                "Ziege(Durchschnitt), roh",
                "Ziegenmilch",
                "Ziger weiss",
                "Zimtstern",
                "Zitronensaft",
                "Zitrone, roh",
                "Zitrusfrüchte(Durchschnitt), roh",
                "Zucchetti, gedünstet(ohne Zugabe von Fett und Salz)",
                "Zucchetti - Piccata, zubereitet",
                "Zucchetti, roh",
                "Zucchettischeiben, paniert, zubereitet",
                "Zucker, braun",
                "Zuckerhutsalat, roh",
                "Zuckermais(Konserve)",
                "Zuckermais(Konserve), aufgewärmt(ohne Zugabe von Salz)",
                "Zucker, weiss",
                "Zuger Kirschtorte",
                "Zunge(Durchschnitt aus Kalb und Rind), roh",
                "Zwetschge, gedünstet, abgetropft(ohne Zugabe von Zucker)",
                "Zwetschgenkuchen, gebacken(mit Blätterteig)",
                "Zwetschgenkuchen, gebacken(mit Kuchenteig)",
                "Zwetschge, roh",
                "Zwieback",
                "Zwieback, Vollkorn",
                "Zwiebel, gedünstet(ohne Zugabe von Fett und Salz)",
                "Zwiebel, geröstet(ohne Zugabe von Fett und Salz)",
                "Zwiebelkuchen, gebacken(mit Blätterteig)",
                "Zwiebelkuchen, gebacken(mit Kuchenteig)",
                "Zwiebel, roh"],
            currentUser: null,
            isLoading: false,
            defaultListName: 'TobiList19'
        }

    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
    }

    componentDidMount() {
        let _self = this;
        let _temp = this.state.lists;

        this.props.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _self.setState({ currentUser: user, isLoading: false })

                _self.props.firebase.firestore().collection(user.email.replace('.', ',')).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        let _list = { name: doc.data().name, items: doc.data().items };
                        _temp.push(_list);

                        _self.setState({
                            lists: _temp
                        })
                    })
                })

            } else {
                _self.setState({
                    currentUser: null,
                    isLoading: false
                })
            }
        });
    }

    removeCurrentList() {
        if (this.state.lists.length > 1) {
            let _temp = this.state.lists;
            let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

            //delete from firestore
            if (this.state.currentUser) {
                this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).where('name', '==', currentListName).get().then(
                    querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref.delete().then(console.log("delete list from firestore")).catch(error => console.log(error.message));
                        })
                    }
                )
            }

            _temp.splice(this.state.currentListIndex, 1);
            let newCurrentListIndex = this.state.currentListIndex;
            newCurrentListIndex = 0;

            this.setState({
                lists: _temp,
                currentListIndex: newCurrentListIndex
            })
        }
    }

    addNewList(_name) {
        let newList = { name: _name, items: [] }
        this.setState(prevState => ({
            lists: [...prevState.lists, newList]
        }))

        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).doc(_name).set({
                name: newList.name, items: newList.items
            })
        }

    }

    updateCurrentListIndex(index) {
        this.setState({ currentListIndex: index });
    }

    addNewItemToCurrentList(item) {
        //add locally   
        let _temp = this.state.lists;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        if (_temp[this.state.currentListIndex] && _temp[this.state.currentListIndex].items) {
            _temp[this.state.currentListIndex].items.push(item);
        } else {
            _temp[this.state.currentListIndex] = { name: currentListName, items: [{ name: item.name, checked: 0 }] }
        }

        this.setState({
            lists: _temp
        })

        //add to db
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).where('name', '==', currentListName).get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.get().then(snapshot => {
                            if (snapshot.exists) {
                                doc.ref.update({ items: this.props.firebase.firestore.FieldValue.arrayUnion(item) })
                                    .then(console.log("successfully updated array in doc"))
                                    .catch(e => console.log(e.message))
                            } else {
                                doc.ref.set({ name: currentListName, items: this.props.firebase.firestore.FieldValue.arrayUnion(item) })
                                    .then(console.log("successfully created new array in doc"))
                                    .catch(e => console.log(e.message))
                            }
                        })
                    })
                }
            )
        }
    }

    setItemOfCurrentListAsChecked(index) {
        let _temp = this.state.lists;
        _temp[this.state.currentListIndex].items[index].checked++;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        //set locally
        if (_temp[this.state.currentListIndex].items[index].checked >= 3) {
            _temp[this.state.currentListIndex].items[index].checked = 0;
        }

        this.setState({
            lists: _temp
        })

        //aupdate DB with local list
        let currentList = this.state.lists[this.state.currentListIndex];
        if (this.state.currentUser) {
            let listRef = this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).where('name', '==', currentListName);
            listRef.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        items: currentList.items,
                    }).then(
                        console.log('sucessfully updated checked of item')
                    ).catch(e => {
                        console.log("error updating checked of item: " + e.message)
                    })
                })
            })
        }

    }

    removeItemFromCurrentList(index) {
        let _self = this;
        let _temp = this.state.lists;
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;

        //remove locally
        _temp[this.state.currentListIndex].items.splice(index, 1);
        this.setState({
            lists: _temp
        })

        //update DB with local list
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).where('name', '==', currentListName).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        items: _self.state.lists[_self.state.currentListIndex].items
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                })
            })
        }
    }

    setNewListName(name) {
        //update locally
        let currentListName = this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName;
        let _temp = this.state.lists;
        if (name && name.length > 0) {
            _temp[this.state.currentListIndex].name = name;
        } else {
            _temp[this.state.currentListIndex].name = this.state.defaultListName;
        }

        this.setState({
            lists: _temp
        })

        //update on DB
        if (this.state.currentUser) {
            this.props.firebase.firestore().collection(this.state.currentUser.email.replace('.', ',')).where('name', '==', currentListName).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        name: this.state.lists[this.state.currentListIndex].name
                    }).then(console.log("successfully updated listname")).catch(e => console.log(e.message));
                })
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return <p>loading...</p>
        } else {
            return (
                <div className="DataContainer">
                    <TobiAppBar
                        title={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex].name : this.state.defaultListName}
                        lists={this.state.lists}
                        addNewList={(name) => this.addNewList(name)}
                        currentListIndex={this.state.currentListIndex}
                        updateCurrentListIndex={(index) => this.updateCurrentListIndex(index)}
                        currentUser={this.state.currentUser}
                    />

                    <ListContainer
                        suggestions={this.state.suggestions}
                        list={this.state.lists[this.state.currentListIndex] ? this.state.lists[this.state.currentListIndex] : []}
                        addNewItemToCurrentList={(item) => this.addNewItemToCurrentList(item)}
                        setItemOfCurrentListAsChecked={index => this.setItemOfCurrentListAsChecked(index)}
                        removeItemFromCurrentList={index => this.removeItemFromCurrentList(index)}
                        setNewListName={name => this.setNewListName(name)}
                        removeCurrentList={() => this.removeCurrentList()}
                    />


                    {/**************DEBUG ************ */}
                    {/* <p>{this.state.currentUser ? this.state.currentUser.email : null}</p>
                    {this.state.lists.map((list, index) => {
                        return (
                            <div key={index}>
                                <p>*******{list.name}*******</p>
                                {list.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {item.name}  + checked: {item.checked}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                */}

                </div>
            )
        }
    }
}

export default DataContainer;