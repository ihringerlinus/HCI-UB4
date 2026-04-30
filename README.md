# AR Feuerwehrmuseum St. Gallen

Web-AR-Prototyp für das HCI-Projekt FS2026, Gruppe 1.
Der Prototyp zeigt drei historische Feuerwehrelemente als 3D-Modelle und lässt
Nutzende per AR Quick Look (iOS) oder Scene Viewer (Android) das Objekt
in den eigenen Raum projizieren.

## Plattform
Optimiert und getestet für **Android** via Scene Viewer.


## Lokal testen
1. Repo klonen
2. Die drei Modelldateien (`loescher1.glb`, `loescher2.glb`, `helm.glb`) in den Ordner `models/` legen
3. Mit einem lokalen Server starten, z. B.:
   `python3 -m http.server 8000`
4. Im Browser `http://localhost:8000` öffnen

> AR funktioniert nur auf einem echten Gerät und über HTTPS bzw. localhost.

## Live
GitHub Pages: _<URL hier eintragen, sobald aktiviert>_

## Struktur
- `index.html` – Startbildschirm
- `objekte.html` – Auswahl der drei Feuerlöscher
- `loescher1.html` … `loescher3.html` – Detailseite + AR + Quiz
- `style.css` – Stylesheet
- `script.js` – Quiz-Logik
- `models/` – 3D-Modelle (.glb für Android, .usdz für iOS)
