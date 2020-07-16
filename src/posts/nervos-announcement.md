---
template: post.html
title: "Got Scaling? Building layer-2 for Nervos CKB"
date: 2020-07-09 17:00:00
image: ckb.png
author:
  name: "@KenoBudde"
  twitter: "@KenoBudde"
  link: https://github.com/clearwood/
description: Announcement, building layer-2 for Nervos CKB
---

We are proud to announce to have entered a [grantee relationship with the Nervos Foundation](https://talk.nervos.org/t/ckb-sidechain-framework/4722) to work on second layer scaling, a method to increase throughput by bundling transactions on a different network, for CKB. Transferring the advancements made in the Ethereum ecosystem will bring Nervos CKB to the next level of their scalability roadmap.

## A new kind of challenge

The focus of Ethereum has been application development in the past, not necessarily scalability. The first turing-complete chain was a breakthrough but the high costs associated with operating on the main-net at the moment mean that some ideas are not viable to be realized on it. Ethereum only catering to non-scalable dApps seems like the biggest challenge standing in the way of further decentralization and development of meaningful dApps.

We are actively working on roll-up based solutions for Ethereum and will apply the same tactic towards Nervos. We find the transaction model interesting and want to apply our expertise to a new ecosystem. We have been in contact with the part of the Nervos' team for years and are excited to work together with them.

Nervos has been created with its primary focus on scalability, it is a layer 1 that is intended to be used by layer 2 networks, similarly to the beacon chain of ETH 2.0.

We became interested in contributing our knowledge of layer 2 scalability to a network that has been setup to accomodate layer 2 solutions from the get-go.

Interesting for us are especially the [UTXO model employed by Nervos](https://xuejie.space/2020_03_20_what_do_we_mean_when_we_say_account_model/)

- it puts less logic in the chain.
- it allows parallel execution.
- Generators can fill in the needed features to enable smart contracts.

The Nervos Cell model is fascinating, as it implements a state rent through inflation of CKBytes.

We want to provide a simple entry point for applications to run on Nervos, therefore we will spend our time on developing a second layer for Nervos. A majority of today's smart contract developers are knowledgeable with Ethereum and its dev tools. We have set out to create a sidechain where these skills can be applied and eventually existing decentralized applications can easily be migrated.

## Nervos design philosophy that we jive with

We really nerd out about the following Nervos features.

1. We love that the UTXO-model borrows itself to functional programming and is scalable through [parallel processing](https://medium.com/@sunflora98/utxo-vs-account-balance-model-5e6470f4e0cf).
2. Nervos was built with layer-2 in mind, it lends flexibility to off-chain constructions.

## What will the world get from this Grant?

We believe that it should be easy to work with great technology. Therefore using this grant we will not only work on an EVM compatible side-chain but also provide tools Ethereum developers are already comfortable with. These include the following:

1. A WebUI to define UDT or ERC20 tokens. [UDT](https://talk.nervos.org/t/approach-to-designing-a-user-defined-token-standard-on-ckb-part-1/3855), short for User Defined Token, is a standard developed by the Nervos CKB team suited best for their chain.
   This WebUI will also provide the functionality to deploy smart contracts to the child chain.
   Additionally different token economy blueprints will be available to be deployed per mouseclick which allows teams to launch products with short time to market.
2. SDK tools to interact with the sidechain.

We believe that our tools will feel very familiar to everyone already working with dApps, as well as being intuitive enough to provide an entry-point into decentralized application development.

We have chosen an agile approach on delivering this grant. After 2-4 months the first teams can start using the product. In the remaining time we will convert the product to tightly integrate with [Nervos Consensus](https://docs.nervos.org/docs/basics/concepts/consensus) which will extend the security to the dApps created.

For everyone who is interested on what kind of incentive model we considered for our roll-up network, our current state of research is summarized [here](https://hackmd.io/mx52xPZuQyejWFItbmQmTg).

If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). We are looking for active people to join our core research and development.
