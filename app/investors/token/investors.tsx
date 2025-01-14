"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { getBigNumberCurrencyLabel } from "@/utils/bigNumber";
import poxmeToken from "@/contracts/abi/poxmeToken.json";
import addresses from "@/contracts/addresses";
import { Button } from "@/components/ui/button";
import { getTokenPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Investors() {
  const {data: poxmeSupply} = useReadContract({
    address: addresses(56)["PoxmeToken"],
    abi: poxmeToken.abi,
    functionName: "totalSupply",
    args: [],
  });

  const CC = dynamic(
    () =>
      import("@/components/copy-clipboard").then((mod) => mod.CopyClipboard),
    {ssr: false}
  );

  const [data, setData] = useState<number>(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getTokenPrice().then((price) => {
      setData(price || 0);
      setLoading(false);
    });
  }, []);

  const marketCap = "Currently unavailable";

  return (
    <div>
      <>
        <section className="w-full py-12 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Proof of X
                  </h1>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We built an identity system combining the best of blockchain
                    and email. As decentralized and secured as you want, as easy
                    to use as you need.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <dl className="grid lg:grid-cols-2 gap-1 text-sm font-medium">
                  <dt>BNB Chain contract:</dt>
                  <dd className="flex gap-2">
                    {addresses(56)["PoxmeToken"]}
                    <CC content="0xb469783b6b3615180da05571beec716b639cbe85"/>
                  </dd>

                  <dt>Current Supply</dt>
                  <dd>
                    {getBigNumberCurrencyLabel(
                      poxmeSupply as unknown as string,
                      true,
                      2,
                      true
                    )}{" "}
                    POXME
                  </dd>
                  <dt>Current Price</dt>
                  <dd>{isLoading ? "Loading..." : data} USDT</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full border-t">
          <div
            className="container grid max-w-5xl items-start gap-12 px-4 py-12 md:grid-cols-2 md:px-6 md:gap-24 lg:py-24">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About Proof of X
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                We built an identity system combining the best of blockchain and
                email. As decentralized and secured as you want, as easy to use
                as you need.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Tokenomics
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                For now we are migrating $EULER tokens as 1:1 with $POXME. More
                information coming soon.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Invest on Proof of X
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Actually you can invest buying $POXME on our liquidity pools.
              </p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto grid gap-8 my-12 lg:grid-cols-2">
            <div className="space-y-2">
              <Link
                href="https://app.1inch.io/#/56/simple/swap/USDT/POXME"
                target="_blank"
              >
                <Image
                  className="hover:scale-110"
                  src="/images/1inch_color_black.png"
                  width={500}
                  height={500}
                  alt="1INCH logo"
                />
              </Link>
            </div>
            <div className="space-y-2 items-center justify-center flex">
              <Link
                target="_blank"
                href="https://bscscan.com/token/0xb469783b6b3615180da05571beec716b639cbe85"
              >
                <Image
                  className="hover:scale-110"
                  width={368}
                  height={65}
                  src="/images/bnb-chain-full-binance-smart-chain-logo.png"
                  alt="BNB Chain logo"
                />
              </Link>
            </div>
          </div>
        </section>
        <section className="flex-2 justify-center items-center">
          <div className="space-y-4 text-center ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Latest news
            </h2>
            <p className=" max-w-[700px] mx-auto text-gray-500 md:text-base/relaxed dark:text-gray-400">
              Follow @proofxme on X or join our Telegram group for the latest
              news.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-2 justify-center items-center p-1">
            <Button
              className="bg-gradient-to-r from-blue-900 via-white-500 to-blue-500 hover:from-blue-400 hover:via-white-500 hover:to-blue-500"
              onClick={() => window.open("https://t.me/proofxme", "_blank")}
            >
              <svg
                className="h-5 w-5 mr-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="telegram-1"
                  d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
                />
              </svg>
              Join our telegram{" "}
            </Button>
            <a
              className=" twitter-timeline"
              data-width="500"
              data-height="400"
              href="https://twitter.com/proofxme?ref_src=twsrc%5Etfw"
            >
              Tweets by proofxme
            </a>
          </div>
        </section>
        <section className="w-full py-12 lg:py-15">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Have a question about Proof of X or the POXME token? Check out
                our FAQs below.
              </p>
            </div>
            <div className="max-w-3xl mx-auto grid gap-8 my-12 lg:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  What is the Proof of X token?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The Proof of X token represents investment in the project. Its
                  primary purpose is to provide liquidity to the project and
                  serve as a medium for lending and borrowing memberships.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  What is the POXME token migration?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The POXME token migration is a transition from our old token
                  to a new one that complies with ERC/BEP-20 standards. This
                  migration is to enhance security, utility, and overall user
                  experience within the POXME ecosystem.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  What is the NFT membership?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The NFT membership signifies affiliation with the Proof of X
                  project. It is a unique token used to access the
                  project&apos;s features and benefits. Each account holder in
                  the project requires a membership as they are distinct. Given
                  the nature of memberships, an infinite number can exist, with
                  each representing a different account name.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  What is the NFT affiliation?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The NFT affiliation denotes a connection to the Proof of X
                  project. It is a unique token used to claim rewards from the
                  protocol. Each account holder in the project requires an
                  affiliation as they are unique. Affiliate NFTs are limited to
                  2,500 units and are distributed on a first-come, first-served
                  basis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
