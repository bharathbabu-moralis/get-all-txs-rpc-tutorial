import React, { useState } from "react";
import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [fromBlock, setFromBlock] = useState("");
  const [toBlock, setToBlock] = useState("");
  const [cursor, setCursor] = useState("");
  const [limit, setLimit] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [responseCursor, setResponseCursor] = useState("");

  const fetchTransactions = async () => {
    const params = {
      address,
      ...(fromBlock && { fromBlock: parseInt(fromBlock) }),
      ...(toBlock && { toBlock: parseInt(toBlock) }),
      ...(cursor && { cursor }),
      ...(limit && { limit: parseInt(limit) }),
    };

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
      setResponseCursor(data.result.cursor || "");
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseCursor);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Moralis Extended RPC Demo</h1>
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

        <div className="inputContainer">
          <input
            type="text"
            placeholder="Address (Required)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input"
          />
          <input
            type="number"
            placeholder="From Block (Optional)"
            value={fromBlock}
            onChange={(e) => setFromBlock(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="To Block (Optional)"
            value={toBlock}
            onChange={(e) => setToBlock(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Limit (Optional)"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Cursor (Optional)"
            value={cursor}
            onChange={(e) => setCursor(e.target.value)}
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
                <th className="tableHeader">Value (ETH)</th>
                <th className="tableHeader">Gas Used</th>
                <th className="tableHeader">Block Number</th>
                <th className="tableHeader">Block Hash</th>
                <th className="tableHeader">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.hash} className="tableRow">
                  <td className="tableCell">{tx.from_address}</td>
                  <td className="tableCell">{tx.to_address}</td>
                  <td className="tableCell">{tx.hash}</td>
                  <td className="tableCell">
                    {(parseFloat(tx.value) / 1e18).toFixed(4)}
                  </td>
                  <td className="tableCell">{tx.receipt_gas_used}</td>
                  <td className="tableCell">{tx.block_number}</td>
                  <td className="tableCell">{tx.block_hash}</td>
                  <td className="tableCell">
                    {new Date(tx.block_timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {responseCursor && (
          <div className="cursorContainer">
            <p className="cursorText">
              Next cursor:{" "}
              <span className="cursorValue">{responseCursor}</span>
            </p>
            <button onClick={copyToClipboard} className="copyButton">
              Copy Cursor
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
