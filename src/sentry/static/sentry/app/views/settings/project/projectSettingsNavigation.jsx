import {Box} from 'grid-emotion';
import React from 'react';

import SettingsHeading from '../components/settingsHeading';
import SettingsNavItem from '../components/settingsNavItem';
import SettingsNavSection from '../components/settingsNavSection';

class ProjectSettingsNavigation extends React.Component {
  render() {
    let {orgId, projectId} = this.props.params;
    const pathPrefix = `/settings/organization/${orgId}/project/${projectId}/`;

    return (
      <Box>
        <SettingsNavSection>
          <SettingsHeading>Configuration</SettingsHeading>
          <SettingsNavItem label="General" to={`${pathPrefix}`} />
          <SettingsNavItem label="Alerts" to={`${pathPrefix}alerts/`} />
          <SettingsNavItem label="Rate Limits" to={`${pathPrefix}quotas`} />
          <SettingsNavItem label="Tags" to={`${pathPrefix}tags`} />
          <SettingsNavItem label="Issue Tracking" to={`${pathPrefix}issue-tracking/`} />
          <SettingsNavItem
            label="Release Tracking"
            to={`${pathPrefix}release-tracking`}
          />
          <SettingsNavItem label="Data Forwarding" to={`${pathPrefix}data-forwarding`} />
          <SettingsNavItem label="Saved Searches" to={`${pathPrefix}saved-searches/`} />
          <SettingsNavItem
            label="Debug information files"
            to={`${pathPrefix}debug-symbols/`}
          />
          <SettingsNavItem
            label="Processing issues"
            to={`${pathPrefix}processing-issues/`}
          />
        </SettingsNavSection>

        <SettingsNavSection>
          <SettingsHeading>Data</SettingsHeading>
          <SettingsNavItem label="Basic configuration" to={`${pathPrefix}install/`} />
          <SettingsNavItem label="CSP Reports" to={`${pathPrefix}csp/`} />
          <SettingsNavItem label="User feedback" to={`${pathPrefix}user-feedback/`} />
          <SettingsNavItem label="Inbound Filters" to={`${pathPrefix}filters/`} />
          <SettingsNavItem label="Client Keys (DSN)" to={`${pathPrefix}keys/`} />
        </SettingsNavSection>

        <SettingsNavSection>
          <SettingsHeading>Integrations</SettingsHeading>
          <SettingsNavItem label="All Integrations" to={`${pathPrefix}plugins/`} />
        </SettingsNavSection>
      </Box>
    );
  }
}

export default ProjectSettingsNavigation;
