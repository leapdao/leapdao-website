---
template: post.html
title: 'Smart Contracts on Plasma'
date: 2019-02-09 10:50:00
author:
  name: '@johba'
  twitter: '@johba'
  link: https://github.com/johannbarbie/
description: LeapDAO's Roadmap to enable general computation on Plasma.
tags: [update, 'smart contracts', plasma]
---

Lifting the execution of smart contracts onto a layer-2 blockchain is one of the core goals of the community which holds a huge potential.

This solution will extend the capacity of Ethereum not only for the transfers of funds, but also for the execution of rules. At the heart of this task is the [SolEVM Enforcer](https://github.com/leapdao/solEVM-enforcer), a computation verification game that allows for enforcing the off-chain execution of EVM bytecode. This SolEVM is composed of 3 parts:

- **On-chain stepper** - Enforcer contracts.
- **Off-chain interpreter** - ECMAScript implementation with the same behavior as the Solidity contracts, for performant off-chain usage.
- **Library** with an easy to understand interface for developers.

The SolEVM enforcer, which is in its nature similar to the [Truebit OS](https://github.com/TrueBitFoundation/truebit-os), can be used independently of a Plasma chain to enable a range of use cases:

- Enforcing in-game rules for blockchain games.
- Verifying zero-knowledge proofs that are too large to be verified on-chain.
- Verifying Proof-of-Work in contracts.
- Enforcing correct telling in Voting.
- A side-chain for stateful dApps using NFTs like CryptoKitties.

In contrast to the Truebit OS, the SolEVM enforcer operates not on WASM code, but on EVM bytecode. This is necessary to make judgements about the correct execution of contracts that run on the Ethereum mainnet and on [Plasma Leap](https://docs.google.com/document/d/1vStTjqvqZGyiI5AVtpwCIMlHFnzC_4bbixsCfs27-M8/edit).

The SolEVM enforcer will be integrated into the Plasma chain and will guard the chain against invalid executions of contract codes. In summary, the LeapDAO community is developing two independent systems with the intention to integrate them, as illustrated in the diagram below:

<img src="/img/blog/roadmaps.png" alt="Plasma Roadmap">

The following sections will describe the development steps necessary for the SolEVM enforcer and its integration with a Plasma chain. While the Plasma chain has its [own milestones](/blog/Plasma-Roadmap/), our core contribution is the computation verification game to enable smart contracts to run on Plasma. We want to account for our progress on the basis of the the following milestones.

## Milestone 1 - Song of Dawn

**Scope:** SolEVM Enforcer allows to run computation off-chain and generate proofs for each step of execution. The result of the computation is registered on chain and can be challenged by others using the previously generated proofs. The result is a decentralized computation oracle, where solvers can deliver off-chain computation results together with a bond, and challengers can earn a living by filtering out invalid results.

**Limitations:** In this milestone we are ruling out computation including the following opcodes due to their complexity in proving:
`CALLDATACOPY, CODECOPY, RETURNDATACOPY, EXTCODECOPY`

In addition, these opcodes are not going to be supported in any milestone due to their statefulness:

- `SLOAD` & `STORE`
- `CREATE` & `CREATE2`
- `CALLCODE`

The previously described decentralized computation oracle is lacking game-theoretical soundness and developers have to integrate their own incentive structure for challengers.

**Deliverables:** This milestone will create the ability to integrate the results of simple off-chain computation (EVM bytecode composed of any but the opcodes listed in limitations) into any smart contract. Developers will be able to use the deployed instance and the libraries to integrate the functionality into their dApps.

- On-chain stepper deployed on testnet.
- Package of off-chain interpreter and simple library released on npm. CLI tool to play with Execution registration (Enforcer) and Dispute.
- Blog post and explainer video of how to register computation results and win disputes.

## Milestone 2 - WardKeeper

**Scope:** Integration of SolEVM Enforcer into the exit game of the More Viable Plasma. This will ensure that only transactions containing valid computation results could be used in the challenge game of Plasma Exits. This will enable the execution of Smart contracts on layer-2 blockchains.

**Limitations:** Either compact proofs will be found to seed the opcodes `CALLDATACOPY, CODECOPY, RETURNDATACOPY, EXTCODECOPY` with data, or limits on the size of callData, code, returnData and memory will be introduced. This will determine the limits of computation possible in the SolEVM. As in the previous milestone, only stateless computation is possible.

**Deliverables:**

- On-chain stepper deployed on mainnet.
- On-chain stepper extended with a component that can interpret [Plasma Leap](https://ethresear.ch/t/plasma-leap-a-state-enabled-computing-model-for-plasma/3539) transactions.
- Off-chain interpreted integrated into Plasma node.
- Watch-tower that monitors all exits from the Plasma chain and is able to challenge invalid computation.
- Documentation how to write and run smart contracts on Plasma.
- Formalized Challenge Game ready for audit.

## Milestone 3 - The Kink-Spring

**Scope:** So far only stateless computation has been possible, which severely limits the range of applications for smart contracts on Plasma. In this milestone, storage is re-introduced by the means of a non-fungible token that can be used by contracts instead of `SLOAD`, `SSTORE` opcodes. Storage and contract funds can be exited independently through the exit game of the More Viable Plasma and enable smart contracts to migrate from Layer-2 down to the mainnet.

**Limitations:** The Plasma chain operating in a single-operator setup now allows to securely run a computation, but might still censor transactions. dApps will likely be hesitant to migrate to such an environment before censorship-resistance is introduced through a [PoS setup](https://hackmd.io/gtviMVYsTBK7ULVnuno91g#Proof-of-Stake-Plasma-Leap-Chain).

**Deliverables:**

- Support -/ switch to Constantinople fork. We do not implement the opcode `CREATE2`.
- Documentation about writing stateful Plasma contracts.
- Organize a hackathon to create Plasma Dapps.
- Formalized Exit game ready for audit.

As an open source software community, Leap thrives from the efforts of its members. Do you see an place for yourself in the above roadmap? Whatever your interests and skills are, there is ample opportunity to [join us](http://leapdao.org) in the quest to ensure blockchain scalability and to bring crypto mass adoption to life.
