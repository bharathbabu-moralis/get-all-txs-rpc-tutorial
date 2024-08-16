import React, { useState } from "react";
import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [fromBlock, setFromBlock] = useState("");
  const [toBlock, setToBlock] = useState("");
  const [limit, setLimit] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [cursor, setCursor] = useState("");

  const fetchTransactions = async () => {
    const params = {
      address,
    };

    if (fromBlock) params.fromBlock = parseInt(fromBlock, 10);
    if (toBlock) params.toBlock = parseInt(toBlock, 10);
    if (limit) params.limit = parseInt(limit, 10);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactions",
        params: [params],
      }),
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_MORALIS_NODE_URL,
        options
      );
      const data = await response.json();
      setTransactions(data.result.result);
      setCursor(data.result.cursor);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <img
        src="https://admin.moralis.io/assets/moralisLogo-DnjUHa6D.svg"
        alt="Moralis Logo"
        className="logo"
      />
      <div className="header">
        <h1 className="title">Extended RPC Demo</h1>
        <p className="apiInfo">
          RPC API:{" "}
          <a
            href="https://docs.moralis.io/rpc-nodes/reference/extended-rpc/eth_getTransactions"
            target="_blank"
            rel="noopener noreferrer"
            className="apiLink"
          >
            eth_getTransactions
          </a>
        </p>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Address (required)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="From Block (optional)"
          value={fromBlock}
          onChange={(e) => setFromBlock(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="To Block (optional)"
          value={toBlock}
          onChange={(e) => setToBlock(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Limit (optional)"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="input"
        />
        <button onClick={fetchTransactions} className="button">
          Fetch Transactions
        </button>
      </div>

      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr className="tableRow">
              <th className="tableHeader">From Address</th>
              <th className="tableHeader">To Address</th>
              <th className="tableHeader">Hash</th>
              <th className="tableHeader">Value</th>
              <th className="tableHeader">Gas Used</th>
              <th className="tableHeader">Block Number</th>
              <th className="tableHeader">Block Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="tableRow">
                <td className="tableCell">{tx.from_address}</td>
                <td className="tableCell">{tx.to_address}</td>
                <td className="tableCell">{tx.hash}</td>
                <td className="tableCell">{tx.value}</td>
                <td className="tableCell">{tx.receipt_gas_used}</td>
                <td className="tableCell">{tx.block_number}</td>
                <td className="tableCell">{tx.block_hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cursor && (
        <div className="cursorContainer">
          <p className="cursorText">
            Cursor: <span className="cursorValue">{cursor}</span>
          </p>
          <button
            className="copyButton"
            onClick={() => navigator.clipboard.writeText(cursor)}
          >
            Copy Cursor
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
