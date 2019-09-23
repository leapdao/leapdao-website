---
template: post.html
title: 'Cryptoeconomic Aggregate Signatures in Leap Network'
date: 2019-09-23 12:20:00
emoji: 🐲
author:
 name: '@kosta'
 twitter: '@troggo'
description: How CAS will enable a multi-validator setup of the Leap Network.
---

We've implemented a simple construct for validators to vote on each other's <abbr title="A unit used for anchoring Leap Plasma to the root chain">period</abbr> proposal. We think this should increase the liveness of the network.

## Status Quo

In a regular Plasma setup, network validators are submitting checkpoints of the chain data (we call them periods) to the root chain. It may happen that a validator submits a period without exposing data for it (a "dark period"). It may happen on purpose, if an operator is malicious, or may happen due to a technical failure on a validator side. In both cases, users are supposed to periodically monitor the chain and exit in case they witness data withholding. In general it is safe for users, however, it greatly affects the liveness of the network — a single technical failure of an otherwise honest operator may lead to a dark period and thus to a mass exit and network halt. Moreover, we want to avoid a mass exit situation as the root network may become congested.

## Enter CAS

Justin Drake [suggested](https://ethresear.ch/t/cryptoeconomic-signature-aggregation/1659) a signature aggregation scheme for committee-based notarization which can be called cryptoeconomic aggregated signature (CAS). Being applied to Leap network setup it works as follows.

Once it is time for a new period to be submitted, a committee of all the validators notarise the period submission by creating and broadcasting a special PeriodVote transaction. This transaction contains a period root and is signed by the validator key. Essentially, this tx may be seen as a validator's commitment "I've seen the data for this period". The validator whose turn is to propose the period collects these notarization transactions and once there are enough (the quorum is 2/3+) submits the period along with a signature bitmap. The bitmap has a bit set for each validator who cast a vote on the period.

Plasma contract enforces only the periods with 2/3+ validator votes can get into to the root chain. However, the root contract has no way of checking the signatures itself. And here comes a "cryptoeconomic" part. If proposer lies about any of the votes, anyone with the data can challenge one of the signatures in a bitmap and delete the contentious period in the end. The network will continue operating once the dark period is deleted.

We think that most likely the challenger in a CAS game will be another validator as it is aware of what he signed and is the most incentivized to keep the network alive.

## What's next

CAS notarization is one of the first steps towards switching Leap Network to Proof-of-Stake. While it is implemented already, it is not yet rolled out on the testnet, so it is very new and yet to be proven working and useful in a wild.

<img src="https://media.giphy.com/media/26vUM2gHokQWVwZMs/giphy.gif"/>

If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). LeapDAO is a very small independent team incubated by [Status.im](https://incubate.status.im/projects/) and running on the Ethereum Foundation grant. We are looking for active people to join our core research and development.
