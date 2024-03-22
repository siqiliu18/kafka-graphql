import { useState } from "react";
import axios from "axios";
// import Box from "@material-ui/core/Box";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSubscription,
  gql,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { TableCell, TableRow } from "@material-ui/core";
import requiredNotStartedIcon from "./img/updatedStatus-requiredNotStarted.svg";
import partiallyCompleteIcon from "./img/updatedStatus-partiallyComplete.svg";
import fullyCompleteIcon from "./img/updatedStatus-fullyComplete.svg";
import notApplicableIcon from "./img/updatedStatus-notApplicable.svg";
import "./App.css";

const httpLink = new HttpLink({
  uri: "http://localhost:4981/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4981/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const COMMENTS_SUBSCRIPTION = gql`
  subscription Subscription($cbeDna: String, $oppDna: String) {
    statusUpdated(cbeDna: $cbeDna, oppDna: $oppDna) {
      cbeDna
      oppDna
      scenario
      statuses {
        status
        key
      }
    }
  }
`;

function LatestComment({ cbeDNA, oppDNA }) {
  const { data } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { cbeDna: cbeDNA, oppDna: oppDNA },
  });
  let status = 2;
  if (!!data) {
    // status = data.getStatus.status;
    const txTypeCdApplet = data.statusUpdated.statuses.find(
      (item) => item.key === "COACHINGCLIENTBEDESC"
    );
    status = txTypeCdApplet.status;
  }

  if (status === 2) {
    return (
      <img
        src={requiredNotStartedIcon}
        alt="requiredNotStartedIcon"
        style={{ width: "15px", marginLeft: "5px" }}
      />
    );
  } else if (status === 3) {
    return (
      <img
        src={partiallyCompleteIcon}
        alt="partiallyCompleteIcon"
        style={{ width: "15px", marginLeft: "5px" }}
      />
    );
  } else if (status === 4) {
    return (
      <img
        src={fullyCompleteIcon}
        alt="fullyCompleteIcon"
        style={{ width: "15px", marginLeft: "5px" }}
      />
    );
  }

  return (
    <TableCell>
      <img
        src={notApplicableIcon}
        alt="notApplicableIcon"
        style={{ width: "15px" }}
      />
    </TableCell>
  );
}

function Applet() {
  const [state, stateSet] = useState({
    OverallOpp: "",
    DelServTimeline: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:4982/status",
      headers: { "Content-Type": "application/json" },
      data: {
        id: 5,
        OverallOpp: state.OverallOpp,
        DelServTimeline: state.DelServTimeline,
      },
    });

    stateSet({
      OverallOpp: state.OverallOpp,
      DelServTimeline: state.DelServTimeline,
    });
  };

  return (
    <div className="container">
      <LatestComment oppDNA="23020321Pct2PuB" cbeDNA="G210212Aydi" />
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>BOX-1:</label>
          <input
            type="text"
            value={state.OverallOpp}
            onChange={(e) => stateSet({ ...state, OverallOpp: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label>BOX-2:</label>
          <input
            type="text"
            value={state.DelServTimeline}
            onChange={(e) =>
              stateSet({ ...state, DelServTimeline: e.target.value })
            }
          />
        </div>
        <input
          className="form-control-check btn"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Applet />
    </ApolloProvider>
  );
}

export default App;
