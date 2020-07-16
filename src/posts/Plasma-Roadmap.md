---
template: post.html
title: 'The Plasma Roadmap'
date: 2019-02-05 10:50:00
emoji: 📜
author:
  name: '@johba'
  twitter: '@johba'
  link: https://github.com/johannbarbie/
description: The Roadmap from More Viable Plasma to Plasma Leap.
tags: [dev, plasma]
---

LeapDAO’s purpose is to deliver layer-2 blockchain scalability as a global public utility.

Specifically, we want layer-2 scaling infrastructure to be as easily and openly usable for developers as the mainnet is today. Developing and using dApps on Plasma, a framework for incentivized and enforced smart contract execution, should be fast and seamless.

Achieving such an ambitious goal with the [tiny development community](https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform) that composes LeapDAO today requires effective coordination and small incremental steps to get there. This post will introduce the milestones that we defined: from launching Plasma on mainnet to a fully-fledged censorship resistant, smart contract executing child chain that is supposed to scale Ethereum and increase its usability.

<img src="/img/blog/roadmaps.png" alt="Plasma Roadmap">

In the diagram above you can see that we are actually developing two independent systems:

- SolEVM Enforcer is the verification engine enforcing the correct execution of smart contracts on the Plasma chain.
- The Plasma chain, built on the More Viable Plasma dialect, will start off with transfer-only abilities and later integrate with SolEVM at the Metaverse/WardKeeper milestones to gain computation abilities.

The single milestones described next shed more light on the features and deliverables.

### 🐟 0.5 Driftwood

The Driftwood milestone simply brings Plasma onto Ethereum mainnet. This deliverable will be very rough around the edges, with a minimal user interface to do deposits, see balances, do transfers and exits from the chain.
At this point the network is run by a single operator. While the Plasma architecture keeps users funds protected from even a single malicious operator, users still face the responsibility to check on the operator and exit their funds if they spot any malicious behaviour.

The special aspect of this version is the upgradeability of the contracts, which is protected by [Minimal Viable Governance](https://leapdao.org/blog/Minimal-Viable-Governance/) - a system to delay security related operations on the chain, so that all users have enough time to exit to the mainnet if in doubt. The upgrade system will allow the chain to transition into the next releases of the software.

### 🚣 1.0 The Raft

To arrive at the Raft milestone, the network has been hardened with the experience from previous releases. Users have the ability to download the node and sync the Plasma chain to assure themselves that the chain is solvent, and the operator has not included any invalid transactions or withheld blocks.

### 🌃 2.0 Metaverse

This milestone brings the integration of SolEVM Enforcer into the exit game of the More Viable Plasma. This will ensure that only transactions containing valid computation results could be used in the challenge game of Plasma exits. While enabling the execution of smart contracts on layer-2 blockchains, the contracts will be limited in their expressiveness to stateless scripts.
Further developments along the SolEVM roadmap will gradually increase the expressiveness of the contracts, adding storage usage and inter-blockchain communication.

### 🤯 3.0 Simoleon Caper

The Simolean Caper milestone signals the launch of the Proof-of-Stake on the chain. While in the single-operator model the security of funds was already guaranteed under the assumptions of Plasma, PoS introduces censorship resistance to the network. A more censorship resistant environment will encourage more dApps to take the leap onto layer-2.

### ☃ 4.0 Snow Crash

Snow Crash introduces economic abstraction to the chain. While - before Plasma - gas could only be paid in the native token of the chain, the introduction of markets allows for gas payments, block rewards and staking to happen in any token.

As an open source software community, Leap thrives from the efforts of its members. Do you see an place for yourself in the above roadmap? Whatever your interests and skills are, there is ample opportunity to [join us](http://leapdao.org) in the quest to ensure blockchain scalability and to bring crypto mass adoption to life.
