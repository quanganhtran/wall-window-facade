export type Composition = {
    id: number
    layout: boolean[]
}

type FixedPositions = (boolean | null)[];

export type Settings = {
    minWindows: [number, number, number]
    minWalls: [number, number, number]
    fixedPositions: [FixedPositions, FixedPositions, FixedPositions]
}

const candidates = [false, true];

const cartesian =
    (...a): boolean[][] => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

const floorsOf4 =
    cartesian([true], candidates, candidates, candidates, candidates, [true]);
const floorsOf3 =
    cartesian([false], candidates, candidates, [false], candidates, [false]);
const floorOf0 =
    [false, true, true, true, true, false];

const merged = cartesian(floorsOf4, floorsOf4, floorsOf3);
export const compositions: Composition[] = merged.map((l, index) => ({
    id: index,
    layout: [...l, ...floorOf0],
}));

global.compositions = compositions;

    // layout: [
    //     l.slice(0, 6),
    //     l.slice(6, 12),
    //     l.slice(12),
    //     floorOf0,
    // ],

function countItems(floor: boolean[]) {
    return floor.reduce(([windows, walls], isWindow) =>
        isWindow ? [windows + 1, walls] : [windows, walls + 1], [0, 0]);
}

export const defaultFixedPositions: Settings['fixedPositions'] = [
    [true, null, null, null, null, true],
    [true, null, null, null, null, true],
    [false, null, null, false, null, false],
];

export function getCompositions(
    {minWindows, minWalls, fixedPositions}: Settings
) {
    const [f4, f3, f2] = [floorsOf4, floorsOf4, floorsOf3].map((floor, floorIndex) =>
        floor.filter(composition => {
            const [windows, walls] = countItems(composition);
            const matched = () => fixedPositions[floorIndex].every((pos, index) =>
                pos === null || pos === composition[index]);
            return windows >= minWindows[floorIndex] && walls >= minWalls[floorIndex] && matched();
        })
    );
    return cartesian(f4, f3, f2).map((l, index) => ({
        id: index,
        layout: [...l, ...floorOf0],
    }));
}

// function *floorOf4() {
//     for (let i = 0; i < 16; i++) {
//         const arr = [
//             i >> 3 & 0x1,
//             i >> 2 & 0x1,
//             i >> 1 & 0x1,
//             i >> 0 & 0x1,
//         ].map(v => v === 1);
//         yield arr;
//     }
// }
