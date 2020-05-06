---
template: post.html
title: "Upcoming mainnet revamp"
date: 2019-06-21 10:50:00
emoji: 🛄
image: mainnet-revamp.png
author:
  name: "@kosta"
  twitter: "@KostaKorenkov"
description: We plan to revamp the mainnet preserving the balances. Funds are SAFU.
---

We are going to stop the mainnet chain and start a new one preserving all the onchain balances. There won't be any value loss for user. In case of any objections, you can exit the chain.

**What will change:**

- block data, like: block height, transaction hashes, periods, UTXOs, etc.
- plasma bridge and governance contract addresses

**What won't change:**

- your balance on plasma chain. If you held funds on Leap network, you will hold the exact same amount.
- token addresses

## Why we need to touch the mainnet

We have included a number of fixes into our node software which makes it incompatible with the existing chain and therefore requires a hard fork.

Most notably, we are upgrading to the latest Tendermint version which includes breaking changes (including changes in a database structure) and thus requires a network reset. Sadly, it also makes a hard fork not possible.

Before we go further, it may be useful to recap how the LeapDAO plasma chain is governed. Feel free to skip the next section if you are well aware of our [Minimal Viable Governance](https://leapdao.org/blog/Minimal-Viable-Governance/).

## Recap on how LeapDAO plasma chain is governed

Apart from the ability to do transfers and invoke contracts, Plasma chains have an additional functionality to deposit and exit funds from it's parent chain. An on-chain contract called Plasma Bridge is used to execute these functions.

The Leap Network uses [Zeppelin OS](https://zeppelinos.org/) to allow upgrades of its Plasma Bridge. To avoid endangering the security of funds on the chain through upgrades, the Leap Network implements a [Minimal Viable Governance](https://leapdao.org/blog/Minimal-Viable-Governance/) protocol. It grants all the users enough time to review and react to governance proposals before they are applied.

## What we are planning to do

First, we need to stop the old network safely. To do that we’ve submitted a [governance proposal](https://leapdao.org/blog/Minimal-Viable-Governance/) to upgrade Plasma Bridge disabling exits and deposits on the chain.

Once exits and deposits are disabled and all pending exits are finalized, we make a snapshot of UTXOs on the plasma chain.

Next, we deploy a new set of [plasma contracts](https://github.com/leapdao/leap-contracts) and bootstrap a new network of [validators](https://github.com/leapdao/leap-node). The network will be using the same configuration as the previous one including governance parameters and registered root chain tokens.

To replicate account balances on the new chain, we deposit a required number of tokens on plasma and distribute them according to the snapshot. This way, everyone retains their plasma balance.

We switch over all the infrastructure (like [Bridge UI](https://mainnet.leapdao.org)) to use the new network which effectively becomes a mainnet from that moment.

Meanwhile, we recover tokens from the old bridge contracts to compensate the deposit made into a new network.
