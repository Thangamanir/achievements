/**
 * @file AddProfileDialog container module
 * @author Theodor Shaytanov <theodor.shaytanov@gmail.com>
 * @created 29.01.18
 */

import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React from "react";

import TextField from "@material-ui/core/TextField";
import { AccountService } from "../../services/account";
import { Typography } from "@material-ui/core";

import CodeCombatLogin from "../../assets/CodeCombatLogin.png";

class AddProfileDialog extends React.PureComponent {
  static propTypes = {
    externalProfile: PropTypes.object.isRequired,
    defaultValue: PropTypes.string,
    keepOnCommit: PropTypes.bool,
    inProgress: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  state = {};

  onProfileChange = e => {
    const { externalProfile } = this.props;

    this.setState({
      login: AccountService.processProfile(externalProfile.id, e.target.value)
    });
  };

  catchReturn = event => {
    if (event.key !== "Enter") {
      return;
    }
    this.onCommit();
  };
  onCommit = () => {
    this.props.onCommit(this.state.login || this.props.defaultValue);
    if (!this.props.keepOnCommit) {
      this.props.onClose();
    }
  };

  render() {
    const { externalProfile, defaultValue, inProgress, onClose } = this.props;
    const login =
      this.state.login === undefined ? defaultValue || "" : this.state.login;
    const url = `${externalProfile.url}/user/${login}`;

    return (
      <Dialog onClose={onClose} open={this.props.open}>
        <DialogTitle>Set Up {externalProfile.name} Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            1. Register or Login with CodeCombat.com
          </Typography>
          <img
            src={CodeCombatLogin}
            alt="CodeCombatLogin"
            style={{ maxHeight: 110 }}
            align="center"
          />
          <Typography variant="subtitle1" gutterBottom>
            <a
              href="https://codecombat.com/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://codecombat.com/home
            </a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            2. Enter your CodeCombat username:
          </Typography>
          <TextField
            autoFocus
            label="Profile Name"
            margin="dense"
            placeholder="e.g. dummyuser3"
            helperText="we only need the URL after /user/"
            onChange={this.onProfileChange}
            onKeyPress={this.catchReturn}
            style={{
              width: 560
            }}
            value={login}
          />
          <Typography variant="subtitle1" gutterBottom>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={inProgress}
            onClick={this.onCommit}
            variant="contained"
          >
            Commit
            {inProgress && (
              <CircularProgress
                style={{
                  position: "absolute",
                  left: 36,
                  width: 20,
                  height: 20
                }}
              />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddProfileDialog;
