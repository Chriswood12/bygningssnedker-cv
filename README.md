# Christopher Wood — Bygningssnedker CV

En hurtig, ren og mobilvenlig CV-hjemmeside til ansøgning om læreplads som **bygningssnedker**, bygget i ren HTML, CSS og JavaScript — klar til direkte deployment på **Vercel** uden build-trin.

## Funktioner

- Tydelig profilering som **bygningssnedker** (værksted, tilpasning, døre, paneler og montage)
- Direkte **Ring op**, **Send e-mail** og **Kopiér**-knapper på både mobil og desktop
- Indbygget **Udskriv / Gem som PDF** med særskilt A4-printlayout
- Galleri fra værksteds- og montagearbejde med forstørrelse (lightbox)

## Deploy på Vercel

1. Gå til [vercel.com/new](https://vercel.com/new) og log ind med din GitHub-konto.
2. Vælg dette repository (`bygningssnedker-cv`).
3. Lad indstillingerne stå som standard (**Framework Preset: Other**, **Root Directory: `./`**) og klik **Deploy**.
4. Hver gang du opdaterer filer i GitHub, opdaterer Vercel siden automatisk.

## Billeder i `images/`

Værksteds- og montagebillederne ligger i fuld web-opløsning i `images/` (uden EXIF/GPS-data):

- `images/vaerksted-doer.jpg` — Opbygning & tilpasning på værkstedet (sortmalet lamel- og dørkonstruktion)
- `images/reoler-trae.jpg` — Reoler i træ med korkbagplade under samling
- `images/reol-faerdig.jpg` — Færdig egetræsreol monteret på væg
- `images/lamel-opspaending.jpg` — Lamelarbejde & opspænding ved høvlebænken
- `images/montage-fuge.jpg` — Montage- & fugearbejde ved trægulv, fodpaneler og fransk glasdør
- `images/portrait.jpg` — Portrætbillede (kan udskiftes med original i højere opløsning med samme filnavn)

## Tilpas tekst, adresse eller datoer

Alle tekster og kontaktoplysninger ligger direkte i `index.html`, så de hurtigt kan rettes — også direkte i GitHubs web-editor.
