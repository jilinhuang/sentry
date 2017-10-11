import {Box, Flex} from 'grid-emotion';

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
          <Box w={210}>
            {renderNavigation()}
          </Box>

          <Box flex="1">
            {this.props.children}
          </Box>
        </Flex>
      </div>
    );
  }
}
