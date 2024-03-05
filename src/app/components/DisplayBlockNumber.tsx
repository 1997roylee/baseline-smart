"use client";

import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

export default function DisplayBlockNumber() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/blast/6c566b719e46d450ac87294a9ad8d45a88b0f3d9acf2763053333355589f6cf2"
  );

  useEffect(() => {
    provider.getBlockNumber().then((blockNumber) => {
      setBlockNumber(blockNumber);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Block Number: {blockNumber}</div>;
}
