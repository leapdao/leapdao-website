---
template: post.html
title: 'Planned upgrade for Mainnet contracts'
date: 2019-08-10 10:50:00
emoji: 🍃
author:
 name: '@kosta'
 twitter: '@troggo'
description: Summary of the new Leap Mainnet governance proposals
---

We've started a planned Mainnet upgrade via [Minimum Viable Governance](https://leapdao.org/blog/Minimal-Viable-Governance/). Both Plasma and Governance contracts will be updated.

In accordance with our Minimum Viable Governance, changes will become effective in 7 days. Till that moment you can review proposed changes and exit the network if you object.

## LeapDAO upgradeability governance recap

Leap Network is using upgradeable Plasma contracts, so we can roll out new feature and fix issues. Upgrades made possible with the help of [Zeppelin OS](https://zeppelinos.org/). To make updates safe for the users, we use [Minimum Viable Governance](https://leapdao.org/blog/Minimal-Viable-Governance/) process: all the contracts are owned by Governance contract which delays all the code changes for 7 days. No code can be changed immediately, so users have enough time to react.

Governance proposals may be observed on [Mainnet Bridge UI](https://mainnet.leapdao.org/governance) or by reading from MinGov contract state/events directly.

## What's changed with this upgrade

- Added ability to challenge exits which were double spent by [spending conditions](https://docs.leapdao.org/spending-conditions/).
- Added protection against [front-running](https://twitter.com/troggo/status/1143404964326322176).
- All contracts now expose a public `implementation()` function to get the address of implementation contract (so it can be verified).
- Added preliminary support for Cryptoeconomic Aggregate Signatures. These signatures will be used in a multi-validator setup to prevent validators from submitting dark periods[1] to the root chain.
- The Minimum Viable Governance contract was changed to use a simplified token registration procedure. It will be possible to onboard new tokens without governance delay.

All the code changes: [on Github](https://github.com/leapdao/leap-contracts/compare/v1.1.0...v1.2.0)

Updated Plasma contracts on Etherscan:

- [Bridge](https://etherscan.io/address/0xb567930450B78D0C1Bda82BdE363ABE2FDC3102D)
- [ExitHandler](https://etherscan.io/address/0x208bE5C980e2DC3cCbc6D4fC3c604beb66ede6b2)
- [Operator](https://etherscan.io/address/0xe80757244a15C5Bd45b7FC1a053e135F4D163D94)

## New Governance

As you may notice, we have released a new Governance contract as well. To make it effective we need to transfer Plasma contracts ownership to the new contract. This is done via the same governance procedure, so new governance will be effective in 7 days as well.

Updated governance contract on Etherscan:

- [MinGov](https://etherscan.io/address/0x17Bcf59D273f7C58735ed80Ea001a69f80DF92fc)

----

[1] Period is a unit used for anchoring Leap Plasma to the root chain.
