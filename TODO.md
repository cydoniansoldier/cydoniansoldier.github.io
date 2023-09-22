* Wysyłać do JSON (innego) wybraną opcję (ma mieć czas, ID, wybraną i drugą opcję)
* Serwer powinien mieć dostęp do tych danych czasowych, i
    * jeśli użytkownik zrobi rollback, usunąć daną czasową z JSON - rollback można przetrzymać u klienta a także mu wysłać zablokowanie rollback jak minie czas
    * jeśli użytkownik nie zrobi rollback, to daną czasową z JSON wziąć, obliczyć Elo na podstawie obecnych danych, usunąć daną czasową i wysłać informację klientowi, że rollback jest niedostępny
* Zmodyfikować wysyłanie z klienta - teraz ma wysyłać do innego JSON
* (opcjonalnie) Zmodyfikować losowanie w taki sposób, aby brało przeciwnika z maks. +-200 putów różnicy
* (opcjonalnie) Zmienić wartość K zależnie od statystyk i rozegranych partii
    *   K = 40; nowy gracz; mniej niż 30 partii; Elo mniejsze niż 2300
    *   K = 20; Elo mniejsze niż 2400
    *   K = 10; Elo co najmniej 2400, co najmniej 30 partii; wynik zostaje na zawsze
* Startowy Elo
    *   1200 points
    *   20 partii w celu wyznaczenia startowej pozycji:
        * suma: (ranking_przeciwnika + modyfikator) / 20 partii
        * modyfikatory: +/-200 dla startowego gracza, +/-400 dla gracza oficjalnego, 0 dla remisu