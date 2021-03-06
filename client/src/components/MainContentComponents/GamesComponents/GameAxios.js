import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Paper from '@material-ui/core/Paper';
import Spinner from "../../../src_images/Spinner.gif"
import GameLarge from "./GameLarge";

class GameAxios extends Component {
  state = {
    gamesList: []
  };

  componentDidMount() {
    this.axiosCall(this.props.data);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.axiosCall(this.props.data);
    }
  }

  axiosCall(data) {
    if (data === "Sony") data = "Sony Interactive Entertainment";
    axios({
      url:
        "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/companies",
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key":  process.env.REACT_APP_GAMES_KEY 
      },
      data:
        'fields name,published.name,published.first_release_date; sort popularity desc; where name = "' +
        data +
        '";'
    })
      .then(response => {
        let obj = response.data[0]["published"];
        let firstList = [];
        for (var property in obj) {
          let x = obj[property]["name"];
          let y = obj[property]["first_release_date"];
          firstList.push([moment.unix(y).format("MMM DD YYYY"), x]);
        }

        const result = firstList.filter(title => title[0] !== "Invalid date");
        const result2 = result.filter(title => title[1] !== undefined);
        let gamesList = result2.sort(
          (a, b) =>
            new moment(b[0], "MMM DD YYYY") - new moment(a[0], "MMM DD YYYY")
        );
        this.setState({ gamesList });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.gamesList.length < 1) {
      return (
        <div>
          <Paper>
            <img src={Spinner}></img>
          </Paper>
        </div>
      );
    } else{
      return (
      <div>
        <GameLarge data={this.state.gamesList} />
      </div>
    );
    }
  }
}
export default GameAxios;
