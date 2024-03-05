import DisplayBlockNumber from "./components/DisplayBlockNumber";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron`, {
    next: { revalidate: 60 * 60 },
  });
  const data = await response.json();

  const { borrowPrice, swapPrice } = data;

  return (
    <div>
      <div className="flex flex-col gap-6 justify-center items-center h-screen">
        <div className="flex gap-4">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-green-400 text-2xl text-center">
              Borrow Price (WETH)
            </h1>
            <p className="text-3xl">{borrowPrice.toFixed(5)}</p>
          </div>
          <div className=""></div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-yellow-400 text-2xl text-center">
              Swap Price (WETH)
            </h1>
            <p className="text-3xl">{swapPrice.toFixed(5)}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a
            className="text-green-300"
            href="https://app.baseline.markets/"
            target="_blank"
          >
            Baseline
          </a>
          <DisplayBlockNumber />
        </div>
      </div>
    </div>
  );
}
