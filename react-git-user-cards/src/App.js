import "./App.css";
import React from "react";
import axios from "axios";
import styled from "styled-components";

class App extends React.Component {
    state = {
        userData: [],
        user: [],
        followerData: [],
    };

    componentDidMount() {
        axios
            .get("https://api.github.com/users/apfeif12")
            .then((res) => {
                this.setState({ userData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("https://api.github.com/users/apfeif12/followers")
            .then((res) => {
                this.setState({ followerData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        this.setState({ user: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(`https://api.github.com/users/${this.state.user}`)
            .then((res) => {
                this.setState({ userData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`https://api.github.com/users/${this.state.user}/followers`)
            .then((res) => {
                this.setState({ followerData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });


    };

    flowChart = (user) => {
      return <img src={`http://ghchart.rshah.org/${user}`} alt={`http://ghchart.rshah.org/${user}`} />
    }
    render() {
        return (
            <div>
                <FormDiv>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Git Hub User Info</h1>
                        <input
                            onChange={this.handleChange}
                            placeholder="Enter a Github Username"
                        />
                        <button>FETCH USER</button>
                    </form>
                    <div>
                        <h2>{this.state.userData.login}</h2>
                        <img
                            alt="profilePic"
                            src={this.state.userData.avatar_url}
                            width="200"
                        />
                        {
                          this.flowChart(this.state.userData.login)
                        }
                        
                        <h3>Name: {this.state.userData.name}</h3>
                        <h3>Company: {this.state.userData.company}</h3>
                        <h3>Location: {this.state.userData.location}</h3>
                        <h3>Email: {this.state.userData.email}</h3>
                        <h3>Twitter: {this.state.userData.twitter_username}</h3>
                        <h3>
                            Public Repos: {this.state.userData.public_repos}
                        </h3>
                        <h3>Followers: {this.state.userData.followers}</h3>
                        <h3>Following: {this.state.userData.following}</h3>
                        <div>
                            List of Followers:
                            {this.state.followerData.map((follower) => {
                                return <li>{follower.login}</li>;
                            })}
                        </div>
                    </div>
                </FormDiv>
            </div>
        );
    }
}

export default App;

const FormDiv = styled.div`
    background-color: #aeafbf;
    width: 40%;
    border-radius: 4px;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 5%;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid black;

    h1 {
        font-size: 40px;
        text-align: center;
        color: white;
        opacity: 0.4;
        font-weight: bold;
        text-shadow: 3px 3px black;
    }

    input {
        width: 100%;
        height: 2.5rem;
        border-radius: 4px;
    }

    button {
        width: 50%;
        height: 3rem;
        border-radius: 100px;
        outline: none;
        margin: auto;
        background-color: white;
        color: grey;
        font-size: 1rem;
        border: 0.5px solid white;
        display: block;
        margin-top: 1rem;
    }

    h3 {
        font-size: 20px;
        color: white;
        opacity: 0.4;
    }

    h2 {
        font-size: 40px;
        text-align: center;
        color: white;
        font-weight: bold;
    }

    li {
        font-size: 20px;
        color: white;
        opacity: 0.4;
    }

    div {
        font-size: 20px;
        color: white;
    }
    img {
        margin: auto;
        display: block;
        padding-bottom: 2rem;
    }
`;
