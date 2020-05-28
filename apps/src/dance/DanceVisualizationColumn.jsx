import React from 'react';
import GameButtons from '../templates/GameButtons';
import ArrowButtons from '../templates/ArrowButtons';
import BelowVisualization from '../templates/BelowVisualization';
import * as gameLabConstants from './constants';
import ProtectedVisualizationDiv from '../templates/ProtectedVisualizationDiv';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {connect} from 'react-redux';
import i18n from '@cdo/locale';
import AgeDialog, {signedOutOver13} from '../templates/AgeDialog';

const GAME_WIDTH = gameLabConstants.GAME_WIDTH;
const GAME_HEIGHT = gameLabConstants.GAME_HEIGHT;

const styles = {
  selectStyle: {
    width: '100%'
  },
  poweredBy: {
    fontSize: '10px',
    display: 'inline-block',
    textAlign: 'right',
    width: '300px'
  }
};

const SongSelector = Radium(
  class extends React.Component {
    static propTypes = {
      enableSongSelection: PropTypes.bool,
      setSong: PropTypes.func.isRequired,
      selectedSong: PropTypes.string,
      songData: PropTypes.objectOf(PropTypes.object).isRequired,
      filterOff: PropTypes.bool.isRequired
    };

    changeSong = event => {
      const songId = event.target.value;
      this.props.setSong(songId);
    };

    render() {
      return (
        <div id="song-selector-wrapper">
          <label>
            <b>&#160;{i18n.selectSong()}</b>
            <span style={ styles.poweredBy }>Powered by SoundCloud</span>
          </label>
          <select
            id="song_selector"
            style={styles.selectStyle}
            onChange={this.changeSong}
            value={this.props.selectedSong}
            disabled={!this.props.enableSongSelection}
          >
            {Object.keys(this.props.songData).map(
              (option, i) =>
                (this.props.filterOff || !this.props.songData[option].pg13) && (
                  <option key={i} value={option}>
                    {this.props.songData[option].title}
                  </option>
                )
            )}
          </select>
        </div>
      );
    }
  }
);

class DanceVisualizationColumn extends React.Component {
  static propTypes = {
    showFinishButton: PropTypes.bool.isRequired,
    setSong: PropTypes.func.isRequired,
    selectedSong: PropTypes.string,
    levelIsRunning: PropTypes.bool,
    levelRunIsStarting: PropTypes.bool,
    isShareView: PropTypes.bool.isRequired,
    songData: PropTypes.objectOf(PropTypes.object).isRequired,
    userType: PropTypes.string.isRequired
  };

  state = {
    filterOff: this.setFilterStatus()
  };

  /*
    Turn the song filter off
  */
  turnFilterOff = () => {
    this.setState({filterOff: true});
  };

  /*
    The filter defaults to on. If the user is over 13 (identified via account or anon dialog), filter turns off
   */
  setFilterStatus() {
    // userType - 'teacher', assumed age > 13. 'student', age > 13.
    //            'student_y', age < 13. 'unknown', signed out users
    const signedInOver13 =
      this.props.userType === 'teacher' || this.props.userType === 'student';
    const signedOutAge = signedOutOver13();
    return signedInOver13 || signedOutAge;
  }

  render() {
    const divDanceStyle = {
      touchAction: 'none',
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    };

    const p5LoadingStyle = {
      width: 400,
      height: 400,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const p5LoadingGifStyle = {
      width: 100,
      height: 100
    };

    const filenameToImgUrl = {
      'click-to-run': require('@cdo/static/dance/click-to-run.png')
    };

    const imgSrc = filenameToImgUrl['click-to-run'];

    const enableSongSelection =
      !this.props.levelIsRunning && !this.props.levelRunIsStarting;

    const track_id = this.props.songData[this.props.selectedSong]?.track_id;
    const track_start = this.props.songData[this.props.selectedSong]?.track_start;

    return (
      <div>
        {/*!this.props.isShareView && (
          <AgeDialog turnOffFilter={this.turnFilterOff} />
        )*/}
        <span>
          {!this.props.isShareView && (
            <SongSelector
              enableSongSelection={enableSongSelection}
              setSong={this.props.setSong}
              selectedSong={this.props.selectedSong}
              songData={this.props.songData}
              filterOff={this.state.filterOff}
            />
          )}
          <ProtectedVisualizationDiv>
            <div id="divDance" style={divDanceStyle}>
              <div id="divDanceLoading" style={p5LoadingStyle}>
                <img
                  src="//curriculum.code.org/images/DancePartyLoading.gif"
                  style={p5LoadingGifStyle}
                />
              </div>
              {this.props.isShareView && (
                <img src={imgSrc} id="danceClickToRun" />
              )}
            </div>
          </ProtectedVisualizationDiv>
          <GameButtons showFinishButton={this.props.showFinishButton}>
            <ArrowButtons />
          </GameButtons>
          <BelowVisualization />
          { track_id && <iframe 
            width="100%" 
            height="100" 
            style={{ opacity: 0, pointerEvents: "none" }}
            scrolling="no" 
            id="soundcloud-frame"
            data-trackstart={ track_start }
            frameBorder="0" 
            allow="autoplay" 
            src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + track_id + "&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true"}>
            </iframe> }
        </span>
      </div>
    );
  }
}

export default connect(state => ({
  isShareView: state.pageConstants.isShareView,
  songData: state.songs.songData,
  selectedSong: state.songs.selectedSong,
  userType: state.currentUser.userType,
  levelIsRunning: state.runState.isRunning,
  levelRunIsStarting: state.songs.runIsStarting
}))(DanceVisualizationColumn);
