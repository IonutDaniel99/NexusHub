import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import React from 'react';
import { ExpandButton, Mosaic, MosaicWindow, MosaicZeroState, RemoveButton, ReplaceButton, SplitButton } from 'react-mosaic-component';
import "./dashboard.less"

export type ViewId = 'a' | 'b' | 'c' | 'd' | 'new';
export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
  <ReplaceButton />,
  <SplitButton />,
  <ExpandButton />,
  <RemoveButton />,
]);
const TITLE_MAP: Record<ViewId, string> = {
  a: 'Left Window',
  b: 'Top Right Window',
  c: 'Bottom Right Window',
  d: 'Ceva',
  new: 'New Window',
};

const DashboardMain = () => {
  return (
    <div id="app">
      <Mosaic<ViewId>
        blueprintNamespace="bp5"
        renderTile={(id, path) => (
          <MosaicWindow<ViewId>
            path={path}
            createNode={() => 'new'}
            title={TITLE_MAP[id]}
            additionalControls={<div>test</div>}
            toolbarControls={DEFAULT_CONTROLS_WITH_CREATION}>
            <h1>{TITLE_MAP[id]}</h1>
          </MosaicWindow>
        )}
        initialValue={{
          direction: 'row',
          first: 'a',
          second: {
            direction: 'column',
            first: 'b',
            second: {
              direction: 'row',
              first: 'd',
              second: 'c',
            },
          },
        }}
      />
    </div >)
};

export default DashboardMain;
