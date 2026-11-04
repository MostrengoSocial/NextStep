// Destination maps: the Algarve, Lisbon and Porto.
// Outlines are approximate, drawn by hand. Town positions are real coordinates.
// Land polygons run out to far-away points so the land fills the frame edges.
// Label offsets (dx, dy) are in map pixels from the town's dot; `side` is the
// text anchor ('start' = label to the right, 'end' = to the left).
import { algarveCoast, algarveWestCoast, algarveNorthBorder, guadiana } from './site';

const C = { red: 'var(--red)', orange: 'var(--orange)', yellow: 'var(--yellow)', green: 'var(--green)', blue: 'var(--blue)', magenta: 'var(--magenta)' };

const algarveShore = [...algarveWestCoast, ...algarveCoast.slice(1)];

export const REGIONS = {
  algarve: {
    bounds: { lon0: -9.12, lon1: -7.26, top: 37.6, bottom: 36.86 },
    land: [[[algarveWestCoast[0][0], 39.5], ...algarveShore, [-7.33, 37.2], [-6.5, 37.22], [-6.5, 39.5]]],
    shore: algarveShore,
    region: [...algarveShore.slice(1), ...guadiana.slice(1, 5), ...algarveNorthBorder.slice(1)],
    rivers: [{ points: guadiana, name: 'Guadiana', at: [-7.43, 37.33], dx: 10 }],
    areas: [
      { key: 'north', at: [-8.25, 37.5] },
      { key: 'spain', at: [-7.33, 37.42] },
      { key: 'region', at: [-8.2, 37.25], big: true },
    ],
    ocean: [-8.55, 36.93],
    scaleKm: 10,
    towns: [
      { key: 'sagres', name: 'Sagres', lat: 37.01, lon: -8.94, kind: 'minor', dx: 0, dy: -12, side: 'middle' },
      { key: 'monchique', name: 'Monchique', lat: 37.32, lon: -8.56, kind: 'minor', dx: 0, dy: -12, side: 'middle' },
      { key: 'albufeira', name: 'Albufeira', lat: 37.09, lon: -8.25, kind: 'minor', dx: 0, dy: 22, side: 'middle' },
      { key: 'lagos', name: 'Lagos', lat: 37.10, lon: -8.67, color: C.orange, dx: -34, dy: -70, side: 'middle', link: 'place-lagos' },
      { key: 'portimao', name: 'Portimão', lat: 37.14, lon: -8.54, color: C.yellow, dx: 52, dy: -70, side: 'middle' },
      { key: 'qdl', name: 'Quinta do Lago', lat: 37.04, lon: -8.02, color: C.green, dx: -56, dy: -66, side: 'middle', link: 'place-qdl' },
      { key: 'faro', name: 'Faro', lat: 37.02, lon: -7.93, kind: 'office', dx: 0, dy: 58, side: 'middle', link: 'place-faro' },
      { key: 'tavira', name: 'Tavira', lat: 37.13, lon: -7.65, color: C.blue, dx: -44, dy: -66, side: 'middle', link: 'place-tavira' },
      { key: 'vrsa', name: 'Vila Real de Santo António', lat: 37.19, lon: -7.42, color: C.magenta, dx: 84, dy: 112, side: 'end' },
    ],
  },

  lisboa: {
    bounds: { lon0: -9.55, lon1: -8.80, top: 39.0, bottom: 38.40 },
    land: [
      // North bank: Ericeira down the coast to Cabo da Roca and Cascais, then up the Tagus.
      [[-9.40, 41], [-9.42, 38.97], [-9.43, 38.90], [-9.48, 38.82], [-9.50, 38.78], [-9.47, 38.735], [-9.42, 38.695], [-9.39, 38.70],
        [-9.31, 38.68], [-9.21, 38.69], [-9.14, 38.705], [-9.10, 38.73], [-9.09, 38.77], [-9.08, 38.81], [-9.02, 38.87], [-8.99, 38.94],
        [-8.92, 39.01], [-8.80, 39.10], [-8.60, 39.22], [-6, 39.8], [-6, 41]],
      // South bank: Almada and the Setúbal peninsula.
      [[-9.23, 38.67], [-9.15, 38.685], [-9.10, 38.645], [-9.07, 38.665], [-8.98, 38.70], [-8.96, 38.755], [-8.93, 38.82], [-8.96, 38.90],
        [-8.97, 38.95], [-8.89, 38.995], [-8.77, 39.08], [-8.57, 39.20], [-6, 39.75], [-6, 37.5], [-8.78, 38.30], [-8.84, 38.47], [-8.89, 38.52], [-8.92, 38.49], [-8.98, 38.475],
        [-9.10, 38.44], [-9.215, 38.415], [-9.19, 38.47], [-9.21, 38.55], [-9.24, 38.63]],
    ],
    rivers: [],
    riverLabels: [{ name: 'Rio Tejo', at: [-8.99, 38.83] }],
    areas: [],
    ocean: [-9.45, 38.52],
    scaleKm: 10,
    towns: [
      { key: 'ericeira', name: 'Ericeira', lat: 38.963, lon: -9.416, kind: 'minor', dx: -10, dy: 4, side: 'end' },
      { key: 'caparica', name: 'Costa da Caparica', lat: 38.637, lon: -9.235, kind: 'minor', dx: -10, dy: 4, side: 'end' },
      { key: 'almada', name: 'Almada', lat: 38.679, lon: -9.157, kind: 'minor', dx: 0, dy: 22, side: 'middle' },
      { key: 'lis', name: 'LIS', lat: 38.774, lon: -9.134, kind: 'airport', dx: 12, dy: 4, side: 'start' },
      { key: 'lisboa', name: 'Lisboa', lat: 38.722, lon: -9.139, color: C.red, dx: -30, dy: -44, side: 'end' },
      { key: 'sintra', name: 'Sintra', lat: 38.801, lon: -9.381, color: C.green, dx: 22, dy: -30, side: 'start' },
      { key: 'cascais', name: 'Cascais', lat: 38.697, lon: -9.421, color: C.orange, dx: -18, dy: 44, side: 'end' },
      { key: 'setubal', name: 'Setúbal', lat: 38.524, lon: -8.893, color: C.blue, dx: 24, dy: 4, side: 'start' },
    ],
  },

  porto: {
    bounds: { lon0: -8.85, lon1: -8.40, top: 41.40, bottom: 41.00 },
    land: [
      // North bank: the coast from Vila do Conde down to the Douro, then up the river.
      [[-8.77, 41.45], [-8.755, 41.36], [-8.73, 41.31], [-8.715, 41.26], [-8.705, 41.22], [-8.695, 41.185], [-8.68, 41.165], [-8.675, 41.148],
        [-8.65, 41.146], [-8.62, 41.141], [-8.60, 41.140], [-8.57, 41.142], [-8.54, 41.14], [-8.50, 41.13], [-8.45, 41.095], [-8.40, 41.08], [-8.36, 41.093], [-8.32, 41.108], [-8.27, 41.10], [-8.22, 41.082],
        [-8.15, 41.098], [-8.08, 41.118], [-7.6, 41.12], [-7.6, 41.6], [-8.77, 41.6]],
      // South bank: Vila Nova de Gaia down to Espinho.
      [[-8.672, 41.142], [-8.65, 41.138], [-8.62, 41.134], [-8.60, 41.133], [-8.57, 41.135], [-8.54, 41.132], [-8.50, 41.122], [-8.45, 41.087],
        [-8.40, 41.072], [-8.36, 41.085], [-8.32, 41.100], [-8.27, 41.092], [-8.22, 41.074],
        [-8.15, 41.090], [-8.08, 41.110], [-7.6, 41.112], [-7.6, 40.8], [-8.66, 40.8], [-8.645, 41.0], [-8.65, 41.03], [-8.655, 41.06], [-8.66, 41.09], [-8.665, 41.12]],
    ],
    rivers: [],
    riverLabels: [{ name: 'Rio Douro', at: [-8.26, 41.072] }],
    areas: [],
    ocean: [-8.80, 41.27],
    scaleKm: 5,
    towns: [
      { key: 'foz', name: 'Foz do Douro', lat: 41.152, lon: -8.676, kind: 'minor', dx: -10, dy: 4, side: 'end' },
      { key: 'opo', name: 'OPO', lat: 41.242, lon: -8.678, kind: 'airport', dx: 12, dy: 4, side: 'start' },
      { key: 'porto', name: 'Porto', lat: 41.149, lon: -8.611, color: C.red, dx: 26, dy: -14, side: 'start' },
      { key: 'gaia', name: 'Vila Nova de Gaia', lat: 41.124, lon: -8.61, color: C.orange, dx: 26, dy: 58, side: 'start' },
      { key: 'matosinhos', name: 'Matosinhos', lat: 41.185, lon: -8.69, color: C.green, dx: -24, dy: -16, side: 'end' },
      { key: 'viladoconde', name: 'Vila do Conde', lat: 41.353, lon: -8.746, color: C.blue, dx: -24, dy: 4, side: 'end' },
      { key: 'espinho', name: 'Espinho', lat: 41.007, lon: -8.641, color: C.magenta, dx: -24, dy: -16, side: 'end' },
    ],
  },
};

export const REGION_KEYS = ['algarve', 'lisboa', 'porto'];
