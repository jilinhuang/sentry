import React from 'react';
import classnames from 'classnames';

import OrganizationHomeContainer from '../../components/organizations/homeContainer';
import Checkbox from '../../components/checkbox';
import Radio from '../../components/radio';
import LoadingIndicator from '../../components/loadingIndicator';
import TextField from '../../components/forms/textField';

import ConfigStore from '../../stores/configStore';
import ApiMixin from '../../mixins/apiMixin';
import OrganizationState from '../../mixins/organizationState';

import {t} from '../../locale';

const InviteMember = React.createClass({
  mixins: [ApiMixin, OrganizationState],

  getInitialState() {
    let {teams} = this.getOrganization();

    //select team if there's only one
    let initialTeamSelection = teams.length === 1 ? [teams[0].id] : [];

    return {
      selectedTeams: new Set(initialTeamSelection),
      isInvite: undefined,
      roleList: [],
      selectedRole: 'member',
      email: '',
      loading: true,
      error: undefined
    };
  },

  componentDidMount() {
    let {slug} = this.getOrganization();
    let user = ConfigStore.get('user');

    this.api.request(`/organizations/${slug}/members/${user.id}/`, {
      method: 'GET',
      success: ({role_list, is_invite}) => {
        this.setState({roleList: role_list, isInvite: is_invite, loading: false});
        if (role_list.filter(({_, allowed}) => allowed).length === 0) {
          //not allowed to invite, redirect
          this.redirectToMemberPage();
        }
      },
      error: error => {
        Raven.captureMessage('data fetch error ', {
          extra: {error, state: this.state}
        });
      }
    });
  },

  redirectToMemberPage() {
    let {slug} = this.getOrganization();
    window.location.href = `/organizations/${slug}/members/`;
  },

  splitEmails(text) {
    return text.split(',').filter(i => i);
  },

  inviteUser(email) {
    let {slug} = this.getOrganization();
    let {selectedTeams, selectedRole} = this.state;

    return new Promise((resolve, reject) => {
      this.api.request(`/organizations/${slug}/members/`, {
        method: 'POST',
        data: {
          email,
          teams: Array.from(selectedTeams.keys()),
          role: selectedRole
        },
        success: resolve,
        error: err => {
          reject(err.responseJSON);
        }
      });
    });
  },

  submit() {
    let {email} = this.state;
    let emails = this.splitEmails(email);
    if (!emails.length) return;
    this.setState({loading: true});

    //These are requested in series and not parallel becuase django messages don't work on parallel requests
    emails
      .reduce((prev, cur_email) => {
        return prev.then(() => this.inviteUser(cur_email));
      }, Promise.resolve())
      .then(() => this.redirectToMemberPage())
      .catch(error => {
        if (!error.email && !error.role) {
          Raven.captureMessage('unkown error ', {
            extra: {error, state: this.state}
          });
        }

        this.setState({error, loading: false});
      });
  },

  toggleID(id) {
    let {selectedTeams} = this.state;
    if (selectedTeams.has(id)) {
      selectedTeams.delete(id);
    } else {
      selectedTeams.add(id);
    }
    this.setState({selectedTeams});
  },

  renderRoleSelect() {
    let {roleList, selectedRole} = this.state;

    return (
      <div className="new-invite-team box">
        <div className="box-header">
          <h4>{t('Role') + ':'}</h4>
        </div>
        <div className="box-content with-padding">
          <ul className="radio-inputs">
            {roleList.map(({role, allowed}, i) => {
              let {desc, name, id} = role;
              return (
                <li
                  className="radio"
                  key={id}
                  onClick={() => allowed && this.setState({selectedRole: id})}
                  style={allowed ? {} : {color: 'grey', cursor: 'default'}}>
                  <label style={allowed ? {} : {cursor: 'default'}}>
                    <Radio id={id} value={name} checked={id === selectedRole} readOnly />
                    {name}
                    <div className="help-block">{desc}</div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },

  renderTeamSelect() {
    let org = this.getOrganization();
    let {teams} = org;
    let {selectedTeams} = this.state;
    //no need to select a team when there's only one option
    if (teams.length < 2) return null;
    return (
      <div className="new-invite-team box">
        <div className="box-header">
          <h4>{t('Team') + ':'}</h4>
        </div>
        <div className="grouping-controls team-choices row box-content with-padding">
          {teams.map(({slug, name, id}, i) => (
            <div
              key={id}
              onClick={e => {
                e.preventDefault();
                this.toggleID(id);
              }}
              className="col-md-3">
              <label className="checkbox">
                <Checkbox id={id} value={name} checked={selectedTeams.has(id)} />
                {name}
                <span className="team-slug">{slug}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },

  render() {
    let {error, loading, isInvite} = this.state;
    return (
      <OrganizationHomeContainer>
        <h3>{t('Add Member to Organization')}</h3>
        <p>
          {isInvite
            ? t(
                'Invite a member to join this organization via their email address. If they do not already have an account, they will first be asked to create one. Multiple emails delimited by commas.'
              )
            : t(
                'You may add a user by their username if they already have an account. Multiple inputs delimited by commas.'
              )}
        </p>
        <div className={classnames({'has-error': error && error.email})}>
          {loading && <LoadingIndicator mini className="pull-right" />}
          <TextField
            name="email"
            label={isInvite ? 'Email(s)' : 'Username(s)'}
            placeholderlabel={isInvite ? 'e.g. teammate@example.com' : 'Usernames'}
            spellCheck="false"
            onChange={v => this.setState({email: v})}
          />
          {error && error.email && <p className="error">{error.email}</p>}
        </div>
        {error && error.role && <p className="error alert-error">{error.role}</p>}
        {this.renderRoleSelect()}
        {this.renderTeamSelect()}
        <button className="btn btn-primary submit-new-team" onClick={this.submit}>
          {t('Add Member')}
        </button>
      </OrganizationHomeContainer>
    );
  }
});

export default InviteMember;
