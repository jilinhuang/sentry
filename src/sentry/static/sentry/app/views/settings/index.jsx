import $ from 'jquery';
import React from 'react';

import SettingsContainer from './components/settingsContainer';
import SettingsWrapper from './components/settingsWrapper';

class Settings extends React.Component {
  componentWillMount() {
    $(document.body).addClass('settings');
  }
  componentWillUnmount() {
    $(document.body).addClass('settings');
  }

  render() {
    return (
      <SettingsWrapper>
        <SettingsContainer>
          {this.props.children}
        </SettingsContainer>
      </SettingsWrapper>
    );
  }
}

export default Settings;
