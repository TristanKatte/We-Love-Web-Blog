---
title: Accessibility – Toegankelijkheid in Webdesign
description: Wat is digitale toegankelijkheid, waarom is het belangrijk en hoe pas je het toe? Een verslag van de lezing door Fenna de Wilde.
date: '2024-01-19'
categories:
  - we love web
published: true
---

Op **19 januari 2024** woonde ik een **We Love Web**-lezing bij van **Fenna de Wilde**. Ze is oud-student van FDND en werkt als **Creative Frontend Developer bij Bakken & Baeck**. In haar lezing ging ze in op het belang van digitale toegankelijkheid en hoe je dit als developer kunt toepassen.

---

## Waarom is toegankelijkheid belangrijk?

Een website kan er nog zo goed uitzien, maar als gebruikers deze niet kunnen gebruiken, heeft het weinig waarde. Toegankelijkheid betekent dat iedereen – ook mensen met een beperking – een website **kunnen gebruiken, begrijpen en bedienen**.

---

## Praktische toegankelijkheidsprincipes

### 🔍 Focus states voor toetsenbordgebruikers
- Gebruik `:focus-visible` om alleen styles te tonen wanneer een gebruiker met een toetsenbord navigeert.
- Stel duidelijke focusstijlen in met een `.custom-focus` klasse.
- Zorg dat **alle interactieve elementen** (zoals knoppen, links, formuliervelden) bereikbaar zijn met het toetsenbord.

### ♿ ARIA-attributen
ARIA (Accessible Rich Internet Applications) helpt screenreaders met extra informatie:

| Attribuut | Functie |
|----------|---------|
| `aria-label` | Geeft een toegankelijke naam aan elementen die geen zichtbare tekst hebben. _Bijv._: `<a aria-label="To homepage">Logo</a>` |
| `aria-controls` | Verbindt een bedieningselement met het element dat het aanstuurt. |
| `aria-expanded` | Geeft aan of een uitklapbaar element open (`true`) of dicht (`false`) is. |
| `aria-live` | Zorgt dat dynamische content (bijv. updates) worden aangekondigd door een screenreader. Waarden: `off`, `polite`, `assertive`. |
| `aria-atomic` | Bepaalt of de volledige inhoud of alleen het gewijzigde deel wordt voorgelezen (`true` of `false`). |

---

## 🎠 Toegankelijke carousels

Carousels zijn vaak lastig voor screenreaders. Gebruik daarom de juiste structuur en attributen:

### Container
- Gebruik `<section>` of `role="region"`  
- Voeg `aria-roledescription="carousel"` toe  
- Gebruik `aria-label` of `aria-labelledby` voor context  

### Slides
- Elke slide: `role="group"` en `aria-roledescription="slide"`
- Verberg niet-zichtbare slides: `aria-hidden="true"` en `tabindex="-1"`
- **Vermijd `<li>` voor slides**, dit kan leiden tot foutieve telling van items

### Controls
- Gebruik `role="group"` voor de controls
- Zorg voor duidelijke `aria-labels` op de knoppen (zoals "Volgende slide")

---

## 🔒 Focus guards voor modals en overlays

Bij modals is het essentieel dat de focus **binnen het venster blijft**:

- Gebruik het HTML-element `<dialog>`
- Of implementeer een bestaande NPM-package zoals `focus-trap`
- Zorg dat de focus terugkeert naar het trigger-element na sluiten

---

## 📏 Basisprincipes van visuele toegankelijkheid

- **Kleurcontrast**: Zorg voor voldoende contrast tussen tekst en achtergrond
- **Lettergrootte**: Gebruik minimaal `16px` voor hoofdtekst
- **Lijnlengte**: Houd tussen de **50–75 tekens** per regel voor optimale leesbaarheid

---

## 🖼️ Afbeeldingen & media

- Voeg **alt-teksten** toe aan afbeeldingen die informatie overbrengen
- Voor decoratieve afbeeldingen gebruik je `alt=""`
- Autoplay video's en carousels **moeten gepauzeerd kunnen worden**
- Houd rekening met `prefers-reduced-motion`: beperk animaties voor gebruikers die dat ingesteld hebben

---

## 🔤 Semantische HTML

Gebruik HTML zoals het bedoeld is:

- Gebruik `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` correct
- Gebruik geen `<div>` of `<span>` als het semantisch niet klopt
- Dit helpt screenreaders om de pagina-inhoud beter te interpreteren

---

## ⌨️ Wat je zelf kunt doen

- Voeg een **"Skip to content"**-link toe bovenaan je pagina
- Respecteer de instellingen van gebruikers, zoals `prefers-reduced-motion`
- Gebruik zelf eens een **screenreader** zoals VoiceOver (Mac) of NVDA (Windows) om je site te testen
- Gebruik tools zoals:
  - [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
  - [axe DevTools](https://www.deque.com/axe/devtools/)
  - [Wave Accessibility Tool](https://wave.webaim.org/)

---

## Conclusie

Toegankelijkheid is geen extraatje, maar een **fundamenteel onderdeel van goed webdesign**. Door bewust te ontwerpen en ontwikkelen zorg je ervoor dat iedereen je website kan gebruiken – en dat is precies waar het web voor bedoeld is.

> _"Toegankelijkheid is geen beperking, maar een voorwaarde voor inclusieve digitale ervaringen."_ – Fenna de Wilde

---
