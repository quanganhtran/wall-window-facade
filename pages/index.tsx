import type { NextPage } from 'next'
import { CardGroup, Segment } from "semantic-ui-react";
import { defaultFixedPositions, getCompositions, Settings } from "../core/facade";
import HouseFacade from "../components/HouseFacade";
import { useState } from "react";
import SettingsInput from "../components/SettingsInput";

const Home: NextPage = () => {
    const [settings, setSettings] = useState<Settings>({
        minWindows: [4, 4, 1],
        minWalls: [1, 1, 2],
        fixedPositions: defaultFixedPositions,
    });

    return (
        <main>
            <SettingsInput value={settings} onChange={setSettings}/>
            <Segment basic>
                <CardGroup itemsPerRow={4}>
                  {getCompositions(settings).map((l) =>
                    <HouseFacade key={l.id} composition={l}/>
                  )}
                </CardGroup>
            </Segment>
        </main>
    )
}

export default Home
