---
title: NL Design System
description: Wat is een design system, hoe werkt het NL Design System en hoe wordt dit toegepast binnen de overheid. Een verslag van de We Love Web-lezing door Yolijn van der Kolk.
date: '2023-11-24'
categories:
  - we love web
published: true
image: "design-system.webp"
---

Op 24 november 2023 woonde ik een **We Love Web**-lezing bij waarin **Yolijn van der Kolk** een inspirerende presentatie gaf over het **NL Design System**. In dit artikel lees je wat een design system is, hoe het NL Design System werkt en hoe het in de praktijk wordt toegepast binnen de overheid.

---

## Wat is een design system?

Een **design system** is veel meer dan alleen een stijlgids. Het is een uitgebreide set afspraken, componenten en richtlijnen die teams helpt om consistent en efficiënt digitale producten te ontwerpen en ontwikkelen. Denk aan:

- 🎨 **Stijlgids** voor een consistente huisstijl
- 🧰 **Designkit** voor UX-ontwerpers
- 🧱 **Componentenbibliotheek** voor ontwikkelaars
- 📝 Richtlijnen voor tekst en microcopy
- 🔍 Gedeelde inzichten uit gebruikersonderzoek
- ✅ Goed geteste patronen en herbruikbare voorbeelden

### Voorbeelden van bestaande design systems:
- **[Sanoma Learning](https://sanomalearning.design/)**
- **[ING](https://lion-web.netlify.app)**
- **[NL Design system](https://nldesignsystem.nl)**

---

## Wat is het NL Design System?

Het **NL Design System** is een gezamenlijk initiatief van verschillende overheidsorganisaties en hun leveranciers, met als doel om **samen** een overheidsbreed design system op te bouwen. Hierbij staat de gedeelde ambitie centraal: _niet telkens het wiel opnieuw uitvinden_.

### Belangrijke kenmerken:

- 🤝 **Samenwerking** tussen overheden en leveranciers
- 🧭 **Kernteam** dat faciliteert en ondersteunt
- 🔁 **Estafette-model**: samenwerken in fases
- 🆘 Open oproep: _Help Wanted_ en _Candidate_-status
- 🏅 **Hall of Fame** voor bijdragen uit de community

---

## Uitgangspunten & uitdagingen

Bij het ontwerpen van het NL Design System wordt rekening gehouden met de unieke situatie van elke organisatie:

- Iedere organisatie heeft een **eigen huisstijl**
- Digitale producten worden vaak **extern ontwikkeld**
- Belangrijk: **design en code moeten synchroon lopen**
- Alles is **open source** en vrij te gebruiken

---

## Technische architectuur

De technische basis van het NL Design System is bewust gekozen om flexibel én voorspelbaar te zijn:

### 🧩 Componentstructuur
- CSS-componenten met voorspelbare namen (BEM)
- Webcomponenten waar mogelijk
- Frameworkcomponenten waar handig
- Documentatie in **Markdown**
- Visuele regressietests met **Storybook**

### 💎 Design Tokens
- Beschreven in **JSON**
- Gebruik van **Custom Properties** in CSS
- Onderverdeeld in:
  - **Algemene tokens**
  - **Component tokens**
  - **Huisstijl tokens**
- Tokens vormen de “**bron van waarheid**” tussen design en code

#### ✨ Van Figma naar code:
1. Figma →  
2. GitHub →  
3. Style Dictionary →  
4. CSS (met custom properties)

---

## Toegankelijkheid & inclusie

Toegankelijkheid is een vaste pijler binnen het design system:

- ✅ Testen met **Testing Library**
- 🎨 Ondersteuning voor **High-contrast** en **Forced colors mode**
- 🌐 Lokalisatie door ondersteuning van **browservertalingen**
- ↔️ Gebruik van **logische richtingen**:
  - `inline-start`, `inline-end`
  - `block-start`, `block-end`

---

## Conclusie

Het **NL Design System** is een indrukwekkend voorbeeld van hoe samenwerking, open source en herbruikbaarheid kunnen bijdragen aan betere, toegankelijke en consistente overheidswebsites. Door gedeelde kennis en tooling centraal te stellen, wordt het mogelijk om sneller, efficiënter én inclusiever te ontwerpen en ontwikkelen.

> _"Samen bouwen we aan de digitale overheid van morgen – transparant, toegankelijk en herbruikbaar voor iedereen."_

---

