---
template: post.html
title: 'Upcoming mainnet revamp'
date: 2019-06-21 10:50:00
emoji: 🛄
image: /img/blog/mainnet-revamp.png
author:
  name: '@kosta'
  twitter: '@troggo'
description: We plan to to revamp the mainnet preserving the balances. Funds are safu.
---

## TLDR

We are going to reset the mainnet chain and start a new one preserving all the onchain balances. There won't be any value loss. If you object, you can exit the chain.

What will change:
- block data like block height, transaction hashes, periods, UTXOs etc
- plasma bridge and governance contract addresses

What won't change:
- your plasma balance. If you held funds on Leap network, you will hold the same amount.
- token addresses

## Why we need to touch the mainnet

We have included a number of fixes to our node software which makes it incompatible with the existing chain and therefore requiring a hard fork.

Most notably, we are upgrading to the latest tendermint version which includes breaking changes (including changes in a database structure) and thus require a network reset. Sadly, it also makes a hard fork not possible.

## But aren't blockchains meant to be immutable?

Well, for Layer-1 chains it might be true. We are arguing though, that for Layer-2 chains and Plasma chain in particular, immutability may not be that important. Here is why.

Blockchain is a source of truth for the apps build on top of it. Thus it should stay immutable otherwise it cannot be trusted anymore<sup>[1](#s1)</sup>. However, for Plasma chain the supreme source of truth is always the root chain plus data witness. Even if the plasma chain ceases to exist, user still can safely exit his funds using the bridge contract on the root chain<sup>[2](#s2)</sup>. So non-immutability of plasma chain is not leading to undesired value changes.

## What exactly we are planning to do

First, we submit a [governance proposal](https://leapdao.org/blog/Minimal-Viable-Governance/) to disable exits and deposits on the chain. You will have a week to exit your funds if you disagree with what we are doing.

Once, exits and deposits are disabled and all pending exits are finalized, we make a snapshot of UTXOs on the mainnet.

Then, we deploy a new set of [plasma contracts](https://github.com/leapdao/leap-contracts) and bootstrap a new network of [validators](https://github.com/leapdao/leap-node). The network will be using the same tokens as the previous one.

We deposit a required number of LEAP tokens on the new network and distribute them according to the snapshot. All other tokens are exited from plasma already, so nothing needs to be done. This way, everyone will retain their plasma balance.

We switch over all the infrastructure (like [Bridge UI](https://github.com/leapdao/bridge-ui)) to use the new network which effectively becomes a mainnet from that moment.

Meanwhile, we recover the tokens from the old bridge contracts to compensate the deposit made into a new network.

--- 

<a name="s1"></a><sup>1</sup> — This is an arguable as well. There are valid reasons from both the immutability maximalists (e.g. Ethereum Classic supporters) and "anti-immutabilism" adepts (Zamfirians?). However, it is not that important for our topic today.

<a name="s2"></a><sup>2</sup> — Provided the user has a copy of block data and bridge contract implementation is correct and safe from bad governance (no last minute updates possible).