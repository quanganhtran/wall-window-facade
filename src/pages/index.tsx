import type { NextPage } from 'next'
import type { BuildingOptions } from 'src/core/facade';
import { CardGroup, Segment } from 'semantic-ui-react';
import {
    getCompositions,
    getDefaultBuildingOptions,
} from 'src/core/facade';
import HouseFacade from 'src/components/HouseFacade';
import { useState } from 'react';
import SettingsInput from 'src/components/SettingsInput';

const Home: NextPage = () => {
    const [options, setOptions] = useState<BuildingOptions>(getDefaultBuildingOptions());

    return (
        <main>
            <SettingsInput value={options} onChange={setOptions}/>
            <Segment basic>
                <CardGroup itemsPerRow={4}>
                  {getCompositions(options).map((l) =>
                    <HouseFacade key={l.id} composition={l}/>
                  )}
                </CardGroup>
            </Segment>
        </main>
    )
}

export default Home
