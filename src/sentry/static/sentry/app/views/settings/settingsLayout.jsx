import {Box, Flex} from 'grid-emotion';
import React from 'react';
import styled from 'react-emotion';

import SettingsActivity from './components/settingsActivity';
import SettingsHeader from './components/settingsHeader';

const Content = styled(Box)`
overflow: hidden;
flex: 1;
`;

class SettingsLayout extends React.Component {
  render() {
    let {renderNavigation} = this.props;

    return (
      <div>
        <SettingsHeader>
          <Box flex="1">Settings &gt; Projects &gt; Freight &gt; General</Box>
          <SettingsActivity>Saving dem changes...</SettingsActivity>
        </SettingsHeader>

        <Flex>
          <Box flex="0 0 210px">
            {renderNavigation()}
          </Box>

          <Content>
            {this.props.children}
          </Content>
        </Flex>
      </div>
    );
  }
}

export default SettingsLayout;
