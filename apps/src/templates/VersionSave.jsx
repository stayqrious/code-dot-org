import React from 'react';
import project from '@cdo/apps/code-studio/initApp/project';
import PropTypes from 'prop-types';

/**
 * A component for for saving project with a particular name
 */
export default class VersionSave extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  state = {
    saving: false,
    versionName: ''
  }

  onForceSave = () => {
    this.setState({ saving: true });
    project.save(true).then(() => {
      const name = this.state.versionName;
      project.tagCurrentVersion(name).then(() => {
        this.setState({ saving: false, versionName: '' });
        this.props.onSave();
      });
    });
  };

  onVersionNameChange = (e) => {
    this.setState({versionName: e.target.value});
  }

  render() {
    return <div>
      <h2>Save current version as</h2>
      <table style={{width: '100%'}}>
        <tbody>
          <tr>
            <td><p>Version Name</p></td>
            <td><input type="text" onChange={this.onVersionNameChange} disabled={this.state.saving}/></td>
            <td><button className="btn-info" onClick={this.onForceSave} disabled={this.state.saving}>Save</button></td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}