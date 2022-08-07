export type Composition = {
    id: number
    layout: boolean[]
}

export type CompositionPage = {
    totalCount: number
    slice: Composition[]
}

export type FloorOptions = {
    minWindow: number
    minWall: number
    fixedLayout: FeatureOptions[]
}

type FeatureOptions = {
    isWindow: boolean | null
    readonly: boolean
}

export type BuildingOptions = [FloorOptions, ...FloorOptions[]]

const candidates = [false, true];

const cartesian =
    (...a): boolean[][] => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

const floor6Columns =
    cartesian(...new Array(6).fill(candidates));
const floor1 = [false, false, true, true, false, false];

function countItems(floor: boolean[]) {
    return floor.reduce(([windows, walls], isWindow) =>
        isWindow ? [windows + 1, walls] : [windows, walls + 1], [0, 0]);
}

export function getCompositions(
    options: BuildingOptions,
    // page: number = 0,
    // perPage: number = 512,
): Composition[] {
    const floors = options.map(opt => {
        return floor6Columns.filter(composition => {
            const [windows, walls] = countItems(composition);
            const matched = () => opt.fixedLayout.every(({isWindow}, index) =>
                isWindow === null || isWindow === composition[index]);
            return windows >= opt.minWindow && walls >= opt.minWall && matched();
        });
    });
    // const sizes = floors.map(fl => fl.length);
    // const totalSize = sizes.reduce((a, b) => a * b, 1);
    // const r = [];
    // for (let i = page * perPage; i <= (page + 1) * perPage && i <= totalSize; i++) {
    //     const u = floors.map((fl, flIndex) => {
    //
    //     });
    // }
    return cartesian(...floors).map((layout, index) => ({
        id: index,
        layout: layout,
    }));
}

global.getCompositions = getCompositions

const feature =
    (isWindow: null | boolean = null, readonly = false): FeatureOptions => ({
        isWindow, readonly
    });

const configurable = feature();
const alwaysWindow = feature(true, true);
const alwaysWall = feature(false, true);
const defaultWindow = feature(true);
const defaultWall = feature(false);

export function getDefaultBuildingOptions(): BuildingOptions {
    return [
        {
            minWindow: 4,
            minWall: 1,
            fixedLayout: [
                alwaysWindow, configurable, configurable, configurable, configurable, alwaysWindow
            ],
        },
        {
            minWindow: 4,
            minWall: 1,
            fixedLayout: [
                alwaysWindow, configurable, configurable, configurable, configurable, alwaysWindow
            ],
        },
        {
            minWindow: 1,
            minWall: 2,
            fixedLayout: [
                alwaysWall, configurable, configurable, defaultWall, configurable, alwaysWall
            ],
        },
        {
            minWindow: 2,
            minWall: 4,
            fixedLayout: [alwaysWall, alwaysWall, alwaysWindow, alwaysWindow, alwaysWall, alwaysWall],
        },
    ];
}

function parseLayoutString(s: string): FeatureOptions[] {
    return s.split('').map(c => ({
        'O': alwaysWindow,
        'X': alwaysWall,
        'o': defaultWindow,
        'x': defaultWall,
    }[c] ?? configurable))
}
