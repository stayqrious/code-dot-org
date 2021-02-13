/**
SQ added file for waiting
**/

import React from 'react';
import {connect} from 'react-redux';

class CodeWorkspaceWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeLeft: props.waitingTime || 0};
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    this.iid && clearTimeout(this.iid);
  }

  tick() {
    if (this.state.timeLeft > 0) {
      this.iid = setTimeout(() => {
        this.setState({timeLeft: this.state.timeLeft - 1}, this.tick);
      }, 1000);
    }
  }

  render() {
    const {
      waitingTime,
      waitingTimeText = "try thinking about how you're going to crack this puzzle."
    } = this.props;
    const {timeLeft} = this.state;

    if (this.state.timeLeft === 0) {
      return null;
    }

    return (
      <div id="codeWorkspaceGrayout" style={styles.codeWorkspaceGrayout}>
        <div id="codeWaitingMessage" style={styles.codeWaitingMessage}>
          <img
            src="/blockly/media/brain_weight.png"
            alt=""
            style={styles.brainWeight}
          />
          It's thinking time! Before moving the blocks, {waitingTimeText}
          <div style={styles.timerContainer}>
            <i
              style={{marginLeft: 8, fontSize: 32}}
              className="fa fa-clock-o"
            />
            <br />
            {timeLeft} Sec
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    waitingTimeText: state.pageConstants.waitingTimeText,
    waitingTime: state.pageConstants.waitingTime
  }),
  undefined,
  null,
  {withRef: true}
)(CodeWorkspaceWaiting);

const styles = {
  codeWorkspaceGrayout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 32,
    backdropFilter: 'grayscale(1)'
  },
  codeWaitingMessage: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundImage: 'linear-gradient(to right, #f46b45ff 0%, #eea7497c 100%)',
    borderRadius: 8,
    color: '#0a3f6e',
    fontSize: 16,
    padding: 12,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  brainWeight: {
    marginTop: -40,
    marginBottom: -20,
    marginLeft: -50,
    marginRight: 20
  },
  timerContainer: {
    width: 120,
    textAlign: 'center',
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    backgroundImage: 'linear-gradient(to right, #f411a8 -102%, #ff1717 297%)',
    color: 'transparent'
  }
};
