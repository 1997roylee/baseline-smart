"use server";

import { ethers } from "ethers";
import { NextResponse } from "next/server";

async function getBorrowPrice(provider: ethers.JsonRpcProvider) {
  const contractAddress = "0xcA11bde05977b3631167028862bE2a173976CA11";
  const data =
    "0x82ad56cb00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000014eb8d9b6e19842b5930030b18c50b0391561f270000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000648a756bb600000000000000000000000097340931f3c6f77061c9ff86cf5dd467d74e7fd600000000000000000000000000000000000000000000d3c21bcecceda1000000000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000";

  // Create a transaction
  const transaction = {
    to: contractAddress,
    data: data,
  };

  // Call the contract
  const result = await provider.call(transaction);
  const hexString = result.slice(2);
  const splitHex = hexString.match(/.{1,64}/g) as string[];
  const weth = parseInt(splitHex[splitHex.length - 3], 16) / Math.pow(10, 18);

  return weth / 1000000;
}

async function getSwapPrice(provider: ethers.JsonRpcProvider) {
  const contractAddress = "0x3b299f65b47c0bfAEFf715Bc73077ba7A0a685bE";
  const data =
    "0xc6a5026a000000000000000000000000430000000000000000000000000000000000000400000000000000000000000020fe91f17ec9080e3cac2d688b4ecb48c5ac3a9c0000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000";

  // Create a transaction
  const transaction = {
    to: contractAddress,
    data: data,
    from: "0x97340931F3C6F77061c9FF86CF5DD467d74e7Fd6",
  };

  // Call the contract
  const result = await provider.call(transaction);
  const hexString = result.slice(2);
  const splitHex = hexString.match(/.{1,64}/g) as string[];
  const weth = parseInt(splitHex[0], 16) / Math.pow(10, 18);

  return 100 / weth;
}

export async function GET() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/blast/6c566b719e46d450ac87294a9ad8d45a88b0f3d9acf2763053333355589f6cf2"
  );

  const borrowPrice = await getBorrowPrice(provider);

  const swapPrice = await getSwapPrice(provider);

  return NextResponse.json({ ok: true, borrowPrice, swapPrice });
}
