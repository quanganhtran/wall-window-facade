import * as React from 'react';
import { Composition } from 'src/core/facade';
import { Card, Grid } from 'semantic-ui-react';

type Props = { composition: Composition }

export default function HouseFacade(props: Props) {
    return <Card>
        <Grid columns={6} celled padded>
            {props.composition.layout.map((l, index) => (
                <Grid.Column key={index} color={l ? 'teal' : 'pink'}>
                    &nbsp;
                </Grid.Column>
            ))}
        </Grid>
    </Card>;
}
