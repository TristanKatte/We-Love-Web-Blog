---
title: Design Systems 101 Van Styleguide tot Werkende Interface
description: Ontdek hoe design systems, styleguides en herbruikbare componenten helpen bij het creëren van consistente, schaalbare en efficiënte digitale producten.
date: '2025-11-21'
categories:
  - We love web
  - Styleguides
  - Design System
published: true
image: 
---

## Over de spreker

- Afgestudeerd aan CMD in 2014  
- Trystian Offerman, frontend developer bij Decathlon  
- Spreekt over hoe de organisatie producten ontwikkelt  

---

## Design system @ Decathlon

Trystian is staff engineer en heeft overzicht over engineers en bijbehorende werkzaamheden. Hij werkte eerder bij Mediocom en Bol.com en is nu actief bij Decathlon.  

Decathlon is een Frans bedrijf, actief in 79 landen, met kantoren in Lille, Parijs, Nantes en Amsterdam. Ze ontwikkelen e-commerce websites voor de 16 grootste markten.  

In Amsterdam ligt de focus op:  
- **Upper Funnel**: alles tot het moment van betaling  
- **Low Funnel**: mandje, checkout, login, after sales, account & buying  

**Teams Upper Funnel**: navigatie, productpagina, pricing & promo, CMS, recommendations, product API, catalog, search & ranking, SEO etc.  

Het **product page team** bestaat uit: Engineering manager, Productmanager, 2 designers, Content designer, UX designer en 6 frontend engineers.  

**Frontend stack**: Next.js, TypeScript, React, Java en Node.js.  
Alles bevindt zich in één repository, die gedeployed wordt naar alle landen.

---

## Design System

Een design system is een centrale plek waar alle designstandaarden en codeconventies worden bewaard om consistente producten te bouwen.  

Bij Decathlon bevat het design system:  
- Guidelines  
- Componenten  
- Modules en templates  
- Internationalisering  

Kenmerken:  
- Volledig **accessible**  
- **Theming** en verschillende modussen  

**Foundations** bevatten organisatiebrede standaarden: kleur, sizing, responsive grid, etc.  
Deze worden omgezet naar **design tokens**, die zowel in code als in Figma worden gebruikt. Zo kunnen CSS properties consistent toegepast worden.

---

## Design & engineering spreken dezelfde taal

Design tokens vormen de kern van het systeem. Als een designer een token aanmaakt, wordt dit omgezet naar code door engineers.  

Voordelen van het design system:  
- Sneller bouwen met herbruikbare componenten  
- Schaalbaarheid  
- Verbeterde samenwerking tussen designers en developers  
- Verbeterde kwaliteit en **accessibility**  
- Consistentie zonder alles opnieuw uit te vinden  

Het systeem ondersteunt React, SvelteKit en Vue, maar het wordt afgeraden om er volledige design systems in te bouwen per framework, vanwege performance en standaarden.  

De frontend library bevat:  
- Colors  
- Assets (logo’s)  
- Icons  
- Typography  
- Component library (componenten worden benoemd op functie)  

Alle componenten zijn toegankelijk, goed gedocumenteerd en A11y-proof.

---

## Welke componenten horen in een design system?

- UI primitives  
- Form components  
- Composable, flexible, accessible, themed  
- Well documented, consistent, stable & predictable  

> Tip: Gebruik alleen wat handig is voor jouw organisatie en zorg dat componenten **composable** zijn (bijv. zonder vaste title/footer).

---

## Wat hoort **niet** in een design system?

- Page-specific of flow-specific UI  
- Complete pagina’s  
- Highly coupled backend/domain logic  
- One-offs of experimenten  
- Product-specifieke elementen  

Decathlon heeft ook een **developer portal**:  
- Laat zien hoe componenten werken  
- Sandbox voor code en interactie  
- Blokken over accessibility  
- Vision simulator: laat zien hoe anderen het component ervaren  

---

## Organisatie & architectuur

Het design system bestaat uit drie lagen:  

1. **Figma**: alles wordt hier ontworpen en geëxporteerd  
2. **Github**: interne packages worden gebouwd en naar foundations gepushed  
3. **Toepassing**: foundations worden gebruikt in Android/iOS, fysieke winkels, checkout en webshop  

Zo wordt het design system consistent door de hele organisatie toegepast.
