---
template: post.html
title: 'Introducing Minimal Viable Governance'
date: 2018-12-25 10:50:00
emoji: 🏛
author:
  name: '@johba'
  twitter: '@johba'
  link: https://github.com/johannbarbie/
description: An explainer of governance requirements for a public utility Plasma chain.
---

## A Plasma network as public utility

Plasma is a layer-2 scaling solution that extends the capacity of a blockchain. It can be used in different setups, either to scale a single decentralized app (Dapp), or as a public utility, open for anyone to use.
Such a public utility is what LeapDAO has set out to deliver to the Ethereum ecosystem. We hope this will enable 2 types of use-cases which are not feasible on main-net today:

- **High transaction volume -** Dapps that require a transaction or user amount in the millions to be economically viable, like credit networks or social networks, are not feasible today.
- **High deposit size on sidechains -** Decentralized exchanges hold considerable value as deposits and in their order books. These deposits would easily exceed the resource allocation of smaller sidechains, and hence a bribing attack would put the funds at risk. On the main-net decentralized exchanges are considerably hindered by the high cost of trade execution.

Helping the Ethereum network to onboard more use-cases and scale is our passion, and that is why we strive to deliver scalability as a public utility.

## Why is governance needed?

No size fits all. The network we are creating will be more suitable for some use-cases and less suitable for others. The smart contracts that comprise the Plasma Bridge, a component that integrates the Plasma chain with the main-net, holds many of the parameters that determine the qualities of the network. These parameters will need adjustment to react to user demand, market changes and security challenges.

In addition to parameters, the contracts will need upgradeability. While mutability of the contracts is mandatory for bug-fixing and feature addition, it opens up a potential security and trust concern for users of the chain.

To optimize the parameters and to deliver updates in a secure and trustworthy fashion, a governance process is needed. Everyone should be able to participate to keep the Plasma chain as open as the Ethereum network itself and as aligned with the purpose of Ethereum as possible.

## Minimal Viable Governance

In public utility networks, the users of the network form a group of stakeholders. They are collectively responsible to sustain the utility and put it to best use. Yet activating users as decision makers is difficult and integrating them into an on-chain governance process is even more difficult. To capture the voice of a user one would need at least a token, better even an unforgeable identity to enable one-person-one-vote or similar schemes.

One simple solution to the problems stated above is inherent in the design of Plasma itself. Plasma users monitor the chain and if they are not happy with its state (censorship or invalid state) they can exit their funds to the main-net securely at any time. We copy from this design and introduce Minimal Viable Governance, an analogous approach where governance proposals are held for 2 weeks before they are applied to the chain. During this time users have enough time to anticipate the effects of the governance change and exit their funds if they don’t agree.

## How to use Minimal Viable Governance?

Minimal Viable Governance assumes an open source development community or similar organization with the authority to make governance proposals for the chain. Users of the Plasma chain then review these proposals and vote with their funds on the presented proposals. If the proposal is acceptable, they keep using the network and benefit from its characteristics. If the proposal poses a security risk or has an economic disadvantage for the users they exit their funds to the main-net.

In the screenshot, you see a page with the possible governance proposals that might be registered. The following governance parameters exist:

<img src="/img/blog/MVG.png" alt="Governance Proposals">

**Upgrade block submission logic -** The logic that governs the submissions of blocks into the Plasma contract is defined here and can be changed, e.g. a single operator Plasma chain could be updated to a set of PoS operators.

**Minimum Transaction Gas -** The Plasma chain has its own fee market where gas is paid in ERC20 tokens instead of in Ether.

**Epoch Length -** The number of blocks that comprise an Epoch. Epochs are relevant for the operator of the Plasma chain.

**Parent Block Interval -** The minimum distance of Plasma blocks in terms of Ethereum blocks.

**Register Token -** The Plasma chain can color its transactions in any ERC20 token that exists on the main-net. The token must be registered before it can be deposited to the chain.

**Upgrade Plasma Bridge -** This function switches out the implementation logic of the Bridge itself. This way new features or bug-fixes can be introduced.

**Change Governance Process -** This function allows to switch to another governance process altogether. E.g. this could be a governance by token vote or holographic consensus.

## Limitations and Outlook

The LeapDAO community strives to launch a network with the governance process described above on the Ethereum main-net in January 2019. Once the network is established updates and feature additions will only be processable through the Minimal Viable Governance contract.

Like any minimal viable product, so is our Minimal Viable Governance implementation limited to an essential features, giving users a choice to accept a change or exit before it is applied. It is lacking in many other ways, for example:

- The proposal page is currently hosted, and hence needs to be trusted by the users. Instructions how to operate your own node and connect it to a local version of the proposals page will be published soon.
- In later milestones, we will extend the only-transfer capabilities of the network to also run smart contracts. While exiting smart contract to the main-net follows the same process as for funds, it carries a higher cost for Dapps and users of the Dapps.

Later versions of the Governance process will give users more choice to affect the proposals or even switch to another organization making proposals altogether. Read more about the roadmap in the upcoming blog posts and don’t hesitate to give feedback.
