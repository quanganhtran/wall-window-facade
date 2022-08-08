import * as React from 'react';
import type { BuildingOptions } from 'src/core/facade';
import {
    Button,
    Form,
    FormInput,
    Grid,
    GridColumn, GridRow,
    Segment
} from 'semantic-ui-react';
import immer from 'immer';

type Props = { value: BuildingOptions, onChange: (value: BuildingOptions) => void }

const positionCodeToColor = new Map<boolean | null, 'teal' | 'pink'>([
    // [null, 'black'],
    [true, 'teal'],
    [false, 'pink'],
] as const)

const cyclePositionCode = new Map([
    [null, true],
    [true, false],
    [false, null],
]);

export default function SettingsInput({value: options, onChange}: Props) {
    return <Segment>
        <Form>
            <Grid columns={8}>
                {options.floors.map((floorOpt, floorIndex) =>
                    <GridRow key={floorIndex}>
                        <GridColumn>
                            <FormInput
                                type="number" min={0} max={floorOpt.fixedLayout.length}
                                icon="table"
                                value={floorOpt.minWindow}
                                onChange={
                                    (e, {value}) =>
                                        onChange(immer(options, draft => {
                                            draft.floors[floorIndex].minWindow = parseInt(value, 10) || 0;
                                        }))
                                }
                            />
                        </GridColumn>
                        {floorOpt.fixedLayout.slice(0, 6).map((feature, featureIndex) =>
                            <GridColumn key={featureIndex} textAlign="center">
                                <Button
                                    color={positionCodeToColor.get(feature.isWindow)}
                                    readOnly={feature.readonly}
                                    icon={
                                        feature.readonly ? 'lock' :
                                            feature.isWindow ? 'table' :
                                                feature.isWindow === false ? 'th' : 'question'
                                    }
                                    onClick={() => {
                                        let nextValueMaybe =
                                            cyclePositionCode.get(feature.isWindow);
                                        if (nextValueMaybe === undefined) {
                                            if (feature.readonly) {
                                                nextValueMaybe = false;
                                            } else {
                                                nextValueMaybe = null;
                                            }
                                        }
                                        const nextValue = nextValueMaybe;
                                        // console.log(options[floorIndex].fixedLayout[featureIndex].isWindow, nextValue);
                                        onChange(immer(options, draft => {
                                            draft.floors[floorIndex].fixedLayout[featureIndex].isWindow = nextValue;
                                        }));
                                    }}
                                />
                            </GridColumn>
                        )}
                        <GridColumn>
                            <FormInput
                                type="number" min={0} max={floorOpt.fixedLayout.length}
                                icon="th"
                                value={floorOpt.minWall}
                                onChange={
                                    (e, {value}) =>
                                        onChange(immer(options, draft => {
                                            draft.floors[floorIndex].minWall = parseInt(value, 10) || 0;
                                        }))
                                }
                            />
                        </GridColumn>
                    </GridRow>
                )}
                <GridRow>
                    <GridColumn>
                        <FormInput
                            label="Minimum total"
                            type="number" min={0}
                            icon="table"
                            value={options.minWindow}
                            onChange={
                                (e, {value}) =>
                                    onChange(immer(options, draft => {
                                        draft.minWindow = parseInt(value, 10) || 0;
                                    }))
                            }
                        />
                    </GridColumn>
                </GridRow>
            </Grid>
        </Form>
    </Segment>
}
