---
template: post.html
title:    "Plasma 101 with LeapDAO"
date:     2019-10-23 00:00:00
image:    /img/contrubitons.png
author:
  name: DistributedDoge
  link: https://github.com/DistributedDoge/
description: Short introduction to Plasma.
---
In the interest of making our work more accessible, we wrote a short article explaining the concept behind Plasma.

### What is plasma?
Plasma is a proposal to help scale Ethereum network. The main goal of Plasma is to scale Ethereum network so that it can handle a greater number of transactions per second. The core idea is that we could try to relocate some of the transactions that need to be processed by Ethereum to smaller Blockchains called child-chains. That way we would lessen the load Ethereum needs to handle, and since child-chains have less nodes they can process transactions in a faster and cheaper manner.

The [proposal](https://plasma.io/plasma-deprecated.pdf), which was first presented by Joseph Poon and Vitalik Buterin, was since then developed in different directions by many independent teams and researchers. Therefore while Plasma is a central idea, there are a lot of different variants, each of which having its own set of advantages, disadvantages and quirks. There is even a handy [map](https://ethresear.ch/uploads/default/original/2X/f/fe51381218e40a2d6b38ee4de91e94ef280976ec.png) showing how diverse Plasma research has become.

The approach taken by LeapDAO (variant of [More Viable Plasma](https://www.learnplasma.org/en/learn/mvp.html)) allows for straightforward transfers of value (ERC20 tokens) between the Ethereum network and Leap-operated blockchain. Unfortunately passing large quantities of data between blockchains remains quite challenging and we are currently working on ways to make it simpler and more cost-effective.

### Why should we care about Plasma?
Two main benefits that Leap variant of plasma can offer are faster and cheaper transactions. Besides those advantages, from a user perspective, using a dApp that runs on Plasma should not feel different from using a dApp that runs on main Ethereum network.

Games such as our environmentally aware [Planet A](https://leapdao.org/blog/Planet-A-ccc-ethberlin-recap/) or [Dungeon Riches](https://leap.dungeonriches.com/) are a very good use case for Plasma. Many games that use Ethereum suffer from poor user experience caused by long time needed to verify a transaction. Since Leap Network has fewer nodes and uses simpler way of having nodes to agree with each other (reach consensus), our network is capable of processing transactions much faster.

Likewise micro-payments that are not economically feasible on Ethereum network due to transaction fees not only become possible thanks to Plasma, but also allow for better user experience as you don't have to wait more than five seconds to confirm you have just bought a cup of coffee. In similar vein, it is also possible to construct voting applications that register and verify each vote in near-instant and transparent manner as was done by project [Deora](https://www.deora.earth/) during Volt party congress.

From our point of view, interesting feature of Plasma is that it is a solution that works on Layer-2.  In practical terms that means teams working on Plasma don’t need to make changes to main Ethereum network in order for their solutions to work. That makes it much easier to benefit from independent research in this area as you do not need to seek approval from greater Ethereum community before being able to implement your research proposal.

### Want to learn more?
If you are a dApp developer interested in porting your application to Plasma we are currently offering a LEAP token [grants](https://docs.google.com/forms/d/e/1FAIpQLSeN9N96hkwyuKSR_QF7O_CSfG7gUQ_rA57y9DZjIk7XZEybyg/viewform) and mentorship to promising projects interested in joining our small ecosystem of Plasma-enabled dApps.

We are also looking for collaborators willing to help us develop our variant of Plasma. We reward diligent work with [bounties](https://leapdao.org/earn.html) paid out in DAI stablecoin. We strive to be a fair, open and transparent organization and we could use help with a variety of tasks besides programming. Our policies are available on [Glassfrog](https://app.glassfrog.com/organizations/14849/orgnav/roles/10883348).

For more traditional resources, community-maintained [LearnPlasma](https://www.learnplasma.org/en/) is a great place to learn more. If you prefer to look at bleeding-edge proposals there is also [Ethresear.ch](https://ethresear.ch/) forum.
