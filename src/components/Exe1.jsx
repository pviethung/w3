import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

const Todo1 = () => {
  const [input, setIn] = useState('');
  const [output, setOut] = useState('');

  return (
    <>
      <h3>Get Wallet Balance</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await web3.eth.getBalance(input);
          setOut(web3.utils.fromWei(response, 'ether'));
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setIn(e.target.value)}
        />
        <button>Get</button>
        {output && <p>{output}</p>}
      </form>
    </>
  );
};
const Todo2 = () => {
  const [privateKey, setPrivate] = useState('');
  const [value, setValue] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [checkUrl, setCheckUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h3>Transfer using Web3.js and Wallet Private Key </h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const rawTx = await web3.eth.accounts.signTransaction(
            {
              to: toAddress,
              value: web3.utils.toWei(value, 'ether'),
              gas: 2100000,
            },
            privateKey
          );
          web3.eth
            .sendSignedTransaction(rawTx.rawTransaction)
            .on('confirmation', () => {
              console.log('confirmation');
            })
            .on('receipt', (receipt) => {
              setLoading(false);
              setCheckUrl(
                `https://testnet.bscscan.com/tx/${receipt.transactionHash}`
              );
            });
        }}
      >
        Your private key{' '}
        <input
          value={privateKey}
          onChange={(e) => setPrivate(e.target.value)}
          type="text"
        />
        <br />
        Value{' '}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <br />
        To{' '}
        <input
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          type="text"
        />
        <br />
        <button>Send</button>
        {loading && <p>Loading...</p>}
        <br />
        {!loading && checkUrl && (
          <a target="_blank" href={checkUrl} rel="noreferrer">
            Result
          </a>
        )}
      </form>
    </>
  );
};

export const Exe1 = () => {
  return (
    <div className="App">
      <h2>Exercise 1</h2>
      <p>Provider: https://data-seed-prebsc-1-s1.binance.org:8545</p>

      <Todo1 />
      <Todo2 />
    </div>
  );
};
