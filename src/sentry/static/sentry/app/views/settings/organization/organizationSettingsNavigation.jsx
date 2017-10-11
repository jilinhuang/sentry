import {Box} from 'grid-emotion';
import PropTypes from 'prop-types';
import React from 'react';

import SettingsHeading from '../components/settingsHeading';
import SettingsNavItem from '../components/settingsNavItem';
import SettingsNavSection from '../components/settingsNavSection';

import {organization} from '../navigationConfiguration';

export default class OrganizationSettingsNavigation extends React.Component {
  static contextTypes = {
    location: PropTypes.object
  };

  render() {
    let {orgId} = this.props.params;
    return (
      <Box>
        <SettingsNavSection>
          <SettingsHeading>Organization</SettingsHeading>
          {organization.map(({path, title, show}) => {
            return (
              <SettingsNavItem
                key={title}
                to={path.replace(':orgId', orgId)}
                label={title}
              />
            );
          })}
        </SettingsNavSection>
      </Box>
    );
  }
}
