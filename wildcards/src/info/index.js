import { createElement as h } from 'react';
import SKETCHES from './sketches.json';
import { Fig } from './Fig.jsx';
import { ZoneClocks, OverlapClock } from './live.jsx';
import { BoardingPass } from '../site/Hero.jsx';
import { RoutesAtlas } from '../site/RoutesMap.jsx';
import { Bridge } from '../site/About.jsx';
import { Timeline } from '../site/Rights.jsx';
import { Explorer } from '../site/Services.jsx';
import { Coastline } from '../site/Coastline.jsx';
import { Letters } from '../site/Stories.jsx';
import { OfficeMap } from '../site/OfficeMap.jsx';

export const INFO_LABELS = {
  hero: 'Hero', routes: 'Routes', about: 'About', rights: 'Why Portugal',
  services: 'Services', places: 'Destinations', stories: 'Stories', contact: 'Contact',
};

const byCode = Object.fromEntries(SKETCHES.map((s) => [s.code, s]));
const LIVE = { R5: ZoneClocks, C3: OverlapClock };

// A sketched infographic from the catalogue, framed with its code and name.
function sketch(code) {
  const s = byCode[code];
  const C = LIVE[code] || (() => h(Fig, { code, tag: s.name, html: s.svg }));
  return { name: s.name, note: s.note, wild: s.wild, C };
}
const approved = (name, note, C) => ({ name, note, wild: 2, C, approved: true });

// Wildcard 01 in each section is the design already approved for the site;
// the other nine come from the infographic catalogue.
export const INFO = {
  hero: [approved('Boarding pass', 'The photo slideshow inside a boarding pass; route and destination change with each photo.', BoardingPass),
    ...['H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'].map(sketch)],
  routes: [approved('Atlantic arc map', 'Origins at real coordinates, arcs into an enlarged Portugal, route list below.', RoutesAtlas),
    ...['R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'].map(sketch)],
  about: [approved('Bridge', 'Three towers: legal, cultural, personal. A chevron crosses from where you are to your new life.', Bridge),
    ...['A1', 'A2', 'A3', 'A4', 'A5', 'A7', 'A8', 'A9', 'A10'].map(sketch)],
  rights: [approved('Rainbow timeline', '2004, 2010, 2016, 2018 on a pride-coloured line.', Timeline),
    ...['L1', 'L2', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10'].map(sketch)],
  services: [approved('Services explorer', 'The six-month swimlane is the menu; pick a lane to see what that service covers.', Explorer),
    ...['S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'].map(sketch)],
  places: [approved('Whole Algarve map', 'The full region with real town coordinates, Alentejo, Spain and the Guadiana.', Coastline),
    ...['P1', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'].map(sketch)],
  stories: [approved('Handwritten letters', 'Each testimonial on ruled paper with a stamp, postmark and signature.', Letters),
    ...['T1', 'T2', 'T3', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'].map(sketch)],
  contact: [approved('Office map', 'Schematic map of Largo de São Luís with a directions link.', OfficeMap),
    ...['C1', 'C2', 'C3', 'C4', 'C5', 'C7', 'C8', 'C9', 'C10'].map(sketch)],
};
