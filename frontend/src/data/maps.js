// Destination maps: the Algarve, Lisbon, Porto, Madeira and the Azores.
// Mainland outlines are approximate, drawn by hand; island outlines are Natural Earth.
// Town positions are real coordinates. `capital` marks a district or regional capital
// (drawn larger). An airport can be nudged off a crowded spot: ndx/ndy on desktop,
// cdx/cdy on phones, with a short leader back to its real position.
// Land polygons run out to far-away points so the land fills the frame edges.
// Label offsets (dx, dy) are in map pixels from the town's dot; `side` is the
// text anchor ('start' = label to the right, 'end' = to the left).
import { algarveCoast, algarveWestCoast, algarveNorthBorder, guadiana } from './site';
import { azoresIslands, madeiraIslands } from './islands';

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
      // Faro airport sits ~3 km west of the office; on phones its marker is nudged (cdx/cdy) with a leader to the real spot.
      { key: 'fao', name: 'FAO', lat: 37.014, lon: -7.966, kind: 'airport', dx: -14, dy: 30, side: 'end', cdx: -12, cdy: 22 },
      { key: 'faro', name: 'Faro', lat: 37.02, lon: -7.93, kind: 'office', capital: true, dx: 0, dy: 58, side: 'middle', link: 'place-faro' },
      { key: 'tavira', name: 'Tavira', lat: 37.13, lon: -7.65, color: C.blue, dx: -44, dy: -66, side: 'middle', link: 'place-tavira' },
      { key: 'vrsa', name: 'Vila Real de Santo António', lat: 37.19, lon: -7.42, color: C.magenta, dx: 10, dy: 92, side: 'middle' },
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
      { key: 'lisboa', name: 'Lisboa', lat: 38.722, lon: -9.139, color: C.red, capital: true, dx: -30, dy: -44, side: 'end' },
      { key: 'sintra', name: 'Sintra', lat: 38.801, lon: -9.381, color: C.green, dx: 22, dy: -30, side: 'start' },
      { key: 'cascais', name: 'Cascais', lat: 38.697, lon: -9.421, color: C.orange, dx: -18, dy: 44, side: 'end' },
      { key: 'setubal', name: 'Setúbal', lat: 38.524, lon: -8.893, color: C.blue, capital: true, dx: 24, dy: 4, side: 'start' },
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
      { key: 'porto', name: 'Porto', lat: 41.149, lon: -8.611, color: C.red, capital: true, dx: 26, dy: -14, side: 'start' },
      { key: 'gaia', name: 'Vila Nova de Gaia', lat: 41.124, lon: -8.61, color: C.orange, dx: 26, dy: 58, side: 'start' },
      { key: 'matosinhos', name: 'Matosinhos', lat: 41.185, lon: -8.69, color: C.green, dx: -24, dy: -16, side: 'end' },
      { key: 'viladoconde', name: 'Vila do Conde', lat: 41.353, lon: -8.746, color: C.blue, dx: -24, dy: 4, side: 'end' },
      { key: 'espinho', name: 'Espinho', lat: 41.007, lon: -8.641, color: C.magenta, dx: -24, dy: -16, side: 'end' },
    ],
  },

  madeira: {
    bounds: { lon0: -17.35, lon1: -16.15, top: 33.2, bottom: 32.35 },
    land: madeiraIslands,
    rivers: [],
    areas: [
      { key: 'madeiraName', name: 'Madeira', at: [-16.98, 32.735], big: true },
      { key: 'portoSanto', name: 'Porto Santo', at: [-16.34, 33.15], island: true },
      { key: 'desertas', name: 'Desertas', at: [-16.39, 32.52], island: true },
    ],
    ocean: [-16.62, 32.42],
    scaleKm: 10,
    towns: [
      { key: 'portomoniz', name: 'Porto Moniz', lat: 32.866, lon: -17.168, kind: 'minor', dx: 0, dy: -12, side: 'middle' },
      { key: 'calheta', name: 'Calheta', lat: 32.718, lon: -17.177, kind: 'minor', dx: 0, dy: 22, side: 'middle' },
      { key: 'funchal', name: 'Funchal', lat: 32.650, lon: -16.908, color: C.red, capital: true, dx: -20, dy: 62, side: 'middle' },
      { key: 'fnc', name: 'FNC', lat: 32.698, lon: -16.775, kind: 'airport', dx: 12, dy: 4, side: 'start' },
      { key: 'pxo', name: 'PXO', lat: 33.073, lon: -16.350, kind: 'airport', dx: 0, dy: 50, side: 'middle' },
    ],
  },

  azores: {
    bounds: { lon0: -31.4, lon1: -24.95, top: 39.85, bottom: 36.8 },
    land: azoresIslands,
    rivers: [],
    areas: [
      { key: 'corvo', name: 'Corvo', at: [-30.85, 39.69], island: true, cat: [-30.55, 39.72] },
      { key: 'flores', name: 'Flores', at: [-30.86, 39.43], island: true, cat: [-30.55, 39.42] },
      { key: 'graciosa', name: 'Graciosa', at: [-28.0, 39.19], island: true, cat: [-28.0, 39.33] },
      { key: 'saojorge', name: 'São Jorge', at: [-28.1, 38.84], island: true, cat: [-27.62, 38.33] },
      { key: 'terceira', name: 'Terceira', at: [-27.2, 38.9], island: true, cat: [-27.35, 39.12] },
      { key: 'faial', name: 'Faial', at: [-29.06, 38.6], island: true, cat: [-29.45, 38.6] },
      { key: 'pico', name: 'Pico', at: [-27.86, 38.4], island: true, cat: [-28.25, 38.2] },
      { key: 'saomiguel', name: 'São Miguel', at: [-25.5, 38.0], island: true, cat: [-25.5, 38.07] },
      { key: 'santamaria', name: 'Santa Maria', at: [-25.11, 37.1], island: true, cat: [-25.95, 36.95] },
    ],
    ocean: [-27.6, 37.3],
    scaleKm: 50,
    compactScaleLeft: true,
    towns: [
      { key: 'pdelgada', name: 'Ponta Delgada', lat: 37.740, lon: -25.669, color: C.red, capital: true, dx: 24, dy: 62, side: 'middle' },
      { key: 'pdl', name: 'PDL', lat: 37.741, lon: -25.698, kind: 'airport', dx: -12, dy: 4, side: 'end', ndx: -26, ndy: 18, cdx: -14, cdy: 16 },
      { key: 'angra', name: 'Angra do Heroísmo', lat: 38.655, lon: -27.221, color: C.orange, capital: true, dx: 0, dy: 60, side: 'middle' },
      { key: 'ter', name: 'TER', lat: 38.762, lon: -27.091, kind: 'airport', dx: 12, dy: 4, side: 'start', cdx: 12, cdy: -12 },
      { key: 'horta', name: 'Horta', lat: 38.536, lon: -28.632, color: C.blue, capital: true, dx: 30, dy: 62, side: 'middle' },
      { key: 'hor', name: 'HOR', lat: 38.520, lon: -28.716, kind: 'airport', dx: -12, dy: 4, side: 'end', ndx: -14, ndy: 16, cdx: -14, cdy: 14 },
      // Inter-island airports: code only on the map (`short`), island named in the phone list.
      { key: 'sma', name: 'SMA', place: 'Santa Maria', lat: 36.971, lon: -25.171, kind: 'airport', short: true, dx: -10, dy: 4, side: 'end' },
      { key: 'pix', name: 'PIX', place: 'Pico', lat: 38.554, lon: -28.441, kind: 'airport', short: true, dx: 10, dy: 4, side: 'start', cdx: 8, cdy: -14 },
      { key: 'sjz', name: 'SJZ', place: 'São Jorge', lat: 38.666, lon: -28.176, kind: 'airport', short: true, dx: -10, dy: 4, side: 'end', cdx: 12, cdy: -2 },
      { key: 'grw', name: 'GRW', place: 'Graciosa', lat: 39.092, lon: -28.030, kind: 'airport', short: true, dx: 0, dy: 26, side: 'middle' },
      { key: 'flw', name: 'FLW', place: 'Flores', lat: 39.455, lon: -31.131, kind: 'airport', short: true, dx: 0, dy: 30, side: 'middle' },
      { key: 'cvu', name: 'CVU', place: 'Corvo', lat: 39.672, lon: -31.114, kind: 'airport', short: true, dx: -10, dy: 4, side: 'end' },
    ],
  },
};

export const REGION_KEYS = ['algarve', 'lisboa', 'porto', 'madeira', 'azores'];
