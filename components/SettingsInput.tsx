import * as React from 'react';
import { Settings } from "../core/facade";
import {
    Card,
    Form,
    FormField,
    FormGroup,
    FormInput,
    Grid,
    GridColumn,
    GridRow,
    Label,
    Segment
} from "semantic-ui-react";
import immer from "immer";

type Props = { value: Settings, onChange: (value: Settings) => void }

const positionCodeToColor = new Map<boolean | null, 'teal' | 'pink'>([
    // [null, 'grey'],
    [true, 'teal'],
    [false, 'pink'],
] as const)

const cyclePositionCode = new Map([
    [null, true],
    [true, false],
    [false, null],
]);

export default function SettingsInput({value: settings, onChange}: Props) {
    return <Segment>
        <Grid columns={2}>
            <GridColumn>
                <Form>
                    <FormField><label>Min windows</label></FormField>
                    <FormGroup>
                        {settings.minWindows.map((v, i) =>
                            <FormInput
                                key={i}
                                type="number"
                                value={v}
                                onChange={
                                    (e, {value}) =>
                                        onChange(immer(settings, draft => {
                                            draft.minWindows[i] = parseInt(value, 10) || 0;
                                        }))
                                }
                            />
                        )}
                    </FormGroup>
                    <FormField><label>Min walls</label></FormField>
                    <FormGroup>
                        {settings.minWalls.map((v, i) =>
                            <FormInput
                                key={i}
                                type="number"
                                value={v}
                                onChange={
                                    (e, {value}) =>
                                        onChange(immer(settings, draft => {
                                            draft.minWalls[i] = parseInt(value, 10) || 0;
                                        }))
                                }
                            />
                        )}
                    </FormGroup>
                </Form>
            </GridColumn>
            <GridColumn>
                <Segment basic compact>
                    <Grid columns={6}>
                        {settings.fixedPositions.flatMap((row, rowIndex) => (
                            // <GridRow key={rowIndex}>{
                                row.map((col, colIndex) =>
                                    <GridColumn
                                        key={rowIndex * 100 + colIndex}
                                    >
                                        <Segment
                                            inverted
                                            color={positionCodeToColor.get(col)}
                                            onClick={() => {
                                                const newValue = cyclePositionCode.get(col);
                                                onChange(immer(settings, draft => {
                                                    draft.fixedPositions[rowIndex][colIndex] = newValue ?? null;
                                                }));
                                            }}
                                        />
                                    </GridColumn>
                                )
                            // }</GridRow>
                        ))}
                    </Grid>
                </Segment>
            </GridColumn>
        </Grid>
    </Segment>
}
