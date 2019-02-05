---
template: post.html
title: 'The Plasma Roadmap'
date: 2019-02-05 10:50:00
author:
  name: '@johba'
  twitter: '@johba'
  link: https://github.com/johannbarbie/
description: The Roadmap from More Viable Plasma to Plasma Leap.
---

LeapDAO’s purpose is to deliver scalability as a global public utility. Specifically we want layer-2 scaling infrastructure to be as easily and openly usable for developers as the main-net is today. Developing and using Dapps on Plasma should be fast and seamless.

Achieving such an ambitious goal with the tiny development community that composes LeapDAO today requires effective coordination and small incremental steps to get there. This post will introduce the milestones that we defined from launching Plasma on main-net to a fully-fledged censorship resistant, smart-contract executing sidechain that is supposed to scale Ethereum and increase its usability. 

<img src="/img/blog/roadmaps.png" alt="Plasma Roadmap">

In the diagram you see that we actually develop 2 independent systems:

- SolEVM Enforcer is the verification engine enforcing the correct execution of smart-contracts on the Plasma chain.
- The Plasma chain, built on the More Viable Plasma dialect will start off with transfer-only abilities and later integrate with SolEVM at the Metaverse/WardKeeper milestones to gain computation abilities. 

The single milestones describe next shed more light on the features and deliverables.

### 🐟 0.5 Driftwood 

The Driftwood milestone simply brings Plasma onto Ethereum main-net. This will be very rough around the edges with a minimal user interface to do deposits, see balances, do transfers and exits from the chain. 
At this point the network is run by a single operator. While the Plasma architecture keeps users funds protected from even a single malicious operator, users still face the responsibility to check on the operator and exit their funds if they spot any malicious behaviour. 

The special thing about this version is the upgradeability of the contracts which is protected by Minimal Viable Governance (link), a system to delay security related operations on the chain so that all users have enough time to exit to the main-net if in doubt. The upgrade system will allow to chain to transition into the next releases of the software.

### 🚣 1.0 The Raft
To arrive at the raft milestone the network has been hardened with the experience from previous releases. Users have to ability to download the node and sync the Plasma chain to assure themselves that the chain is solvent and the operator has not included any invalid transactions or withheld blocks.

### 🌃 2.0 Metaverse
This milestone brings the integration of SolEVM Enforcer into the exit game of More Viable Plasma. This will ensure that only transactions containing valid computation results could be used in the challenge game of Plasma exits. While enabling the execution of smart-contracts on layer-2 blockchains, the contracts will be limited in their expressiveness to stateless scripts.
Further developments along the SolEVM roadmap will gradually increase the expressiveness of the contracts adding storage usage and inter-blockchain communication.

### 🤯 3.0 Simoleon Caper
The Simolean Caper milestone signals the launch of the Proof-of-Stake on the chain. While in the single-operator model the security of funds was already guaranteed under the assumptions of Plasma, with PoS censorship resistance is introduced to the network. A more censorship resistant environment will encourage more Dapps to take the leap onto layer-2.

### ☃ 4.0 Snow Crash
Snow Crash introduces economic abstraction to the chain. While before Plasma gas could only be paid in the native token of the chain, now markets are introduced that allow gas payments, block rewards and staking to happen in any token.

As an open-source software community, Leap thrives from the efforts of its members. Do you see an place for yourself in the above roadmap? Whatever your interests and skills are, there is ample opportunity to [join us](http://leapdao.org) in the quest to blockchain scalability and crypto mass adoption. 
