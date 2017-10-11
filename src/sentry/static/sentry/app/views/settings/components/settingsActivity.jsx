import {Box} from 'grid-emotion';
import {withTheme} from 'emotion-theming';
import styled from 'react-emotion';

const SettingsActivity = withTheme(
  styled(Box)`
    font-size: 14px;
    color: ${p => p.theme.gray2};
  `
);

export default SettingsActivity;
