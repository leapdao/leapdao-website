---
template: post.html
title: 'Scalability: Roll-ups are no cure-all.'
date: 2020-02-09 10:00:00
image: plasma-rollup-chart.png
author:
  name: '@KenoBudde'
  twitter: '@KenoBudde'
  link: https://github.com/clearwood/
description: A comparison of Layer 2 scaling solutions.
---

Providing an overview of the current state of Layer 2 solutions.

## Current state of the discussion

LeapDAO has developed a Plasma chain and launched a Mainnet during the last year. With this background at the turn of this year we went back to the drawing board to analyze what options we should explore to encapsulate all developments in the area of Layer 2 research.
The following article will especially focus on the pros and cons of Plasma and Roll-Ups.

## Technical Analysis

The overarching goal of all Layer 2 solutions are to increase scalability, by reducing the size of transactions and the cost of submitting these. Plasma only submits the merkle root hash of the included transactions to the mainnet, the gas costs per transaction scale linearly, with a growing number of included transactions per block these converge to zero. It is like riding a bus, the more people join, the cheaper each passenger is moving forward... 

Differently the costs for simple and contract transactions as Roll-Ups scale not as well, as contract data or a zk-proof is still submitted on-chain. With a higher number of included transactions per block through the Roll-Up, the individual costs per transaction will decrease but converge to a still substantial gas fee (exact amount).

We considered two cases: Simple transactions of ERC20 tokens as well as transactions with a higher data payload (e.g zk-proof).  The following graphic illustrates this problem:

<img src="/img/blog/plasma-rollup-chart.png" alt="Comparison chart between cost of transactions on Plasma and with Roll-Ups">

Our raw test results can be found [here](https://docs.google.com/spreadsheets/d/1ywhXffNw3sNzngvblu4hxE6d2ZbSQ_GjN2JFfl3vYFc/edit#gid=1760753624), the implementation of our method [here](https://github.com/leapdao/leap-contracts/pull/284/files).

Problematic is additionally that roll-up blocks have to be submitted as one transaction to the mainnet. Around 200 larger transactions would be enough to fill half of the block gas limit, making it more difficult/expensive for the Roll-up block to be included on the mainnet.

The following table shows submission costs for big msg.data transactions in a comparison to the cost of a Tornado cash transaction at a Gas cost of 8 Gwei at an ETH price of 250 USD.

| #tx in 1 block | rollup with big msg.data txns in block | submission cost | rollup with contract tx(eg zk proof - 408 bytes) | savings in % |
|:--------------:|----------------------------------------|-----------------|--------------------------------------------------|--------------|
| 1              | 120430                                 | $0.24           | 120430                                           | 63.51%       |
| 2              | 144126                                 | $0.29           | 72063                                            | 78.16%       |
| 5              | 215081                                 | $0.43           | 43016                                            | 86.96%       |
| 10             | 333577                                 | $0.67           | 33358                                            | 89.89%       |
| 25             | 688894                                 | $1.38           | 27556                                            | 91.65%       |
| 50             | 1281457                                | $2.56           | 25629                                            | 92.23%       |
| 100            | 2467659                                | $4.94           | 24677                                            | 92.52%       |
| 200            | 4845260                                | $9.69           | 24226                                            | 92.66%       |

This table illustrates that the total cost that validators have to pay for the inclusion of a block on the mainnet is considerable and will require them to take transaction fees on the Rollup network whereas Plasma chains may be operated at a significantly lower cost due to the constant block submission fee. Validators will need to hold significant amounts of Ether on the mainnet to cover the fees of submission. Due to the delayed nature of exits it will require a significant initial investment to become a validator. Additionally in times of network congestion it might be difficult to collect appropiate fees in advance from participants of the Rollup network.

What this table illustrates as well is that Rollup networks can scale but will not achieve an improvement in efficiency of much more than 10x. An advantage of a Rollup based network is that it allows for smart contracts to be deployed very similarly to the mainnet. As the mainnet is used as a data availability layer, there is no reasonable attack vector under the assumption that at least one validator does not censor transactions.

Plasma chains on the other hand will always have [one of the two following tradeoffs](https://eprint.iacr.org/2020/175): a mass exit vulnerability or the problem of dealing with non-fungible coins and a therefore complicated exit. It is not possible to have a perfect plasma chain. Users will always have to watch out for the shutdown of the network as it will require them to quickly redeem their coins or they will be lost. Smart contracts are additionally

## Conclusions

Where do our findings leave us?

Plasma chains enable dirt-cheap transactions while always struggling with significant downsides: non-fungibility or a mass-exit dilemma.

The usage of the mainnet as a data availability layer limits the scalability of the Optimistic Rollups to a factor of slightly above 10x.

Both solutions offer significant pros and cons, the requirements of an intended applications should facilitate the choice of a solution. If a high throughput of low value micropayments is to be achieved, a Plasma chain might make more sense, while if smart contracts should run on the network, a Rollup network would be the better choice. 

##

If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). LeapDAO is a small independent team incubated by [Status.im](https://our.status.im/leapdao-to-join-incubate-family-as-our-fourth-incubatee/) and running on the Ethereum Foundation grant. We are looking for active people to join our core research and development.
