import React from 'react';

const Result = ({ result, amount, side }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg">
      {result === null ? (
        <p className="text-gray-500">No result yet.</p>
      ) : result ? (
        <div className="text-green-500">
          <h2 className="text-xl font-bold">You Win!</h2>
          <p>You chose {side ? "Heads" : "Tails"}</p>
          <p>Amount won: {amount} ETH</p>
        </div>
      ) : (
        <div className="text-red-500">
          <h2 className="text-xl font-bold">You Lose!</h2>
          <p>You chose {side ? "Heads" : "Tails"}</p>
          <p>Amount lost: {amount} ETH</p>
        </div>
      )}
    </div>
  );
};

export default Result;
