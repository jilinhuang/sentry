export const organization = [
  {
    path: '/settings/organization/:orgId/members/',
    title: 'Members',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/auth/',
    title: 'Auth',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/api-keys/',
    title: 'API Keys',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/audit-log/',
    title: 'Audit Log',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/rate-limits/',
    title: 'Rate Limits',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/repos/',
    title: 'Repositories',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/integrations/',
    title: 'Integrations',
    show: ({access, features}) => {}
  },
  {
    path: '/settings/organization/:orgId/settings/',
    title: 'Settings',
    show: ({access, features}) => {}
  }
];
