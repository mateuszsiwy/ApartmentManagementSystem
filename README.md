# System Management Application

## Opis projektu

System Management Application to aplikacja webowa, która umożliwia zarządzanie danymi za pomocą interfejsu API. Aplikacja została stworzona z wykorzystaniem architektury klient-serwer, gdzie frontend komunikuje się z backendem poprzez API REST. System zarządza danymi przechowywanymi w bazie danych SQL Server, zbudowanej na pięciu tabelach połączonych relacjami.

## Technologie

### Backend:
- **Język programowania**: C# (ASP.NET Core)
- **Framework**: .NET
- **API**: REST API oparte na wzorcu Model-View
- **Baza danych**: Microsoft SQL Server (relacyjna baza danych z 5 tabelami)

### Frontend:
- **HTML**: Statyczne strony internetowe
- **JavaScript**: Dynamiczna interakcja za pomocą Fetch API
- **Bootstrap**: Style dla interfejsu użytkownika
- **Fetch API**: Komunikacja z backendem w celu dynamicznego pobierania danych

## Instalacja i uruchomienie projektu

### Wymagania:
- .NET SDK
- SQL Server
- Przeglądarka obsługująca JavaScript

### Krok 1: Klonowanie repozytorium

Skopiuj repozytorium do lokalnego środowiska:
```bash
git clone https://github.com/mateuszsiwy/ApartmentManagementSystem
cd twoje-repozytorium
