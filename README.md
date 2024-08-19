# Moralis Extended RPC Demo - Get All Wallet Transactions in 1 RPC Call
This is a simple React application that interacts with the Moralis Extended RPC API. It allows users to fetch transaction data from a given address using the ``eth_getTransactions`` method.

## Features
- Input fields to capture the address, from block, to block, and limit for the query.
- Displays transaction details including from address, to address, hash, value, gas used, block number, and block hash.
- Displays a cursor if returned by the API, allowing the user to copy the cursor for paginated results.
- Responsive design with a Moralis logo at the top and improved UI/UX.

## Prerequisites
Make sure you have the following installed:

- Node.js (v14 or later)
- npm

## Getting Started
1. Clone the repository:
``
git clone https://github.com/bharathbabu-moralis/get-all-txs-rpc-tutorial
``
2. Navigate to the root folder of the react-app
``
cd frontend
``

3. Install Dependencies
``
npm install
``

4. Create a ``.env`` file using ``.env.example`` as a reference

5. Run the development server:
``
npm start
``

The app will run at http://localhost:3000 by default.

## Usage
Enter the Address (required):
This is the Ethereum address for which you want to fetch transactions.

### Optional Fields:

From Block: The starting block number.
To Block: The ending block number.
Limit: The maximum number of transactions to retrieve.
Fetch Transactions:
Click on the "Fetch Transactions" button to send the request to the Moralis Extended RPC API.

### View Transactions:
The transactions will be displayed in a table format. If a cursor is returned, it will be shown below the table with an option to copy it.

### Customization
API Endpoint:
The API endpoint used in this app is currently hardcoded. To change it, update the URL in the fetchTransactions function within App.js.

## Styling:
All the styles are defined in the App.css file. Modify it to customize the look and feel of the app.

## Dependencies
This app uses the following dependencies:
 
- react: JavaScript library for building user interfaces.
- node-fetch: Used to make HTTP requests to the API. 

## Contributing
Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- Moralis for providing the RPC API and tools.
- mReact for making it easy to build user interfaces.
