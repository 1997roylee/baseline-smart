"use client";

import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { refresh } from "./actions";

export default function DisplayBlockNumber() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const oldBlockNumber = useRef<number>(0);

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(
      "https://rpc.ankr.com/blast/6c566b719e46d450ac87294a9ad8d45a88b0f3d9acf2763053333355589f6cf2"
    );

    const interval = setInterval(async () => {
      const number = await provider.getBlockNumber();

      if (oldBlockNumber.current === 0) {
        oldBlockNumber.current = number;
      }

      if (number !== oldBlockNumber.current) {
        oldBlockNumber.current = number;

        refresh();
      }
      setBlockNumber(number);
    }, 60 * 60);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div>Block Number: {blockNumber}</div>;
}
