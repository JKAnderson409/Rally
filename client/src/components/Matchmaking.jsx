import React from 'react';

import RecommendedOpponents from './RecommendedOpponents.jsx';
import Challenges from './Challenges.jsx';
import { Query, renderToStringWithData } from 'react-apollo';
import { GET_USERS_BY_TIER, GET_USER_CHALLENGES } from '../apollo/queries.js';

class Matchmaking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        tier: 1
      }
    };
  }

  componentDidMount () {
    this.props.mapDBPlayerDataToState( this.props.dbPlayerData );
    console.log('db player data', this.props.dbPlayerData );
  }

  render() {
    return (
      <div>
        <Query query={GET_USERS_BY_TIER}
          variables={this.state.player}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            } else if (error) {
              return <p>Error</p>;
            }
            return (
              <div>
                <RecommendedOpponents
                  users={data.getUsersByTier}
                  playerData={this.props.playerData}
                  courts={this.state.courts}
                />
              </div>
            );
          }}
        </Query>

        <Query query={GET_USER_CHALLENGES}
          variables={{email: 'parker.muir@gmail.com'}}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            } else if (error) {
              return <p>Error</p>;
            }
            console.log('Apollo Query: ', data.getUserChallenges)
            return (
              <div>
                <Challenges
                  challenges = {data.getUserChallenges}
                  playerData= {this.props.playerData}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}


export default Matchmaking;