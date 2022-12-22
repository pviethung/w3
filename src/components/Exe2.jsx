import { useMemo, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3('https://singapore.rpc.blxrbdn.com');

const Todo1 = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const contract = useMemo(
    () =>
      new web3.eth.Contract(
        [
          {
            'inputs': [
              {
                'internalType': 'address',
                'name': 'account',
                'type': 'address',
              },
            ],
            'name': 'balanceOf',
            'outputs': [
              { 'internalType': 'uint256', 'name': '', 'type': 'uint256' },
            ],
            'stateMutability': 'view',
            'type': 'function',
            'constant': true,
          },
          {
            'inputs': [],
            'name': 'decimals',
            'outputs': [
              { 'internalType': 'uint8', 'name': '', 'type': 'uint8' },
            ],
            'stateMutability': 'view',
            'type': 'function',
            'constant': true,
          },
        ],
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      ),
    []
  );

  return (
    <>
      <h3>Interact with Smart Contract to get the USDC balance.</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const rs = await contract.methods
            .balanceOf(address || '0x36b73f545B8ca8E400b0a909D213c34B96cEB5C4')
            .call();
          const decimals = await contract.methods.decimals().call();
          setBalance(rs / 10 ** decimals);
        }}
      >
        <p>
          Default Wallet Address: 0x36b73f545B8ca8E400b0a909D213c34B96cEB5C4
        </p>
        <br />
        Wallet address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button>Get</button>
      </form>
      <p>{balance && 'USDC Balance: ' + balance}</p>
    </>
  );
};
const Todo2 = () => {
  return (
    <>
      <h3>Interact with 0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a</h3>
      <a
        target="_blank"
        href="https://testnet.bscscan.com/tx/0xcc742b4c4024521e94a4b410e7f190437aae4af06e6e5119468a5618b8da1c7d"
        rel="noreferrer"
      >
        Result
      </a>
    </>
  );
};

const Exe2 = () => {
  return (
    <div className="App">
      <h2>Exercise 2</h2>

      <Todo1 />
      <Todo2 />
    </div>
  );
};

export default Exe2;
