---
template: post.html
title: 'How we integrated colony reputation with holacracy'
date: 2020-02-09 10:00:00
image: holacracy-glassfrog-circle.jpg
author:
  name: '@KenoBudde'
  twitter: '@KenoBudde'
  link: https://github.com/clearwood/
description: explanation of our integration of holacracy with colony reputation.
---

We will make organizations modern again.

## How we work

As a developer cooperative [LeapDAO](https://leapdao.org "LeapDAO's website") uses the holacracy governance model to structure teams and budgets in alignment with its purpose and roadmap.
Holacracy is an extremely dynamic framework which serves us well, a model which gives responsibility to every single developer. We are structured in circles and regular meetings help us stay aligned to our goals. The structure is constantly evolving, [Glassfrog](https://app.glassfrog.com/organizations/14849/orgnav/roles/10883348) is the software of our choice to keep track of it.

<img src="/img/blog/holacracy-glassfrog-circle.jpg" alt="Current organizational overview of LeapDAO">

The same person might have multiple roles within the organization and be a part of multiple circles, just like someone might juggle multiple responsibilities in a more traditional enterprise. We are truly decentralized and having structures which continually change for the better is crucial for us.
Every circle manages their own multi-sig wallet and is responsible for all tasks in their area of expertise.
All work is done through [bounties](https://app.glassfrog.com/organizations/14849/orgnav/policies/10912780 "Bounty policy") which anyone can propose similarly to colony tasks. Proposed bounties can be objected to through our Slack or the associated Github issue. Similarly, bounties without any progress can be challenged by other developers.

According to the concept proposed by colony each bounty has three roles:

1. The gardener who prepared the specifications.
2. The worker who completed the bounty.
3. The reviewer who checks that the work fulfills the requirements and serves the purpose of assuring the quality of our products.

Bounties are structured into different sizes with increasing payout, all of which are denominated in DAI.

## What colony means to us

Colony is an exciting project promising to deliver solutions for digital companies with a great range of solutions and a plentiful of smart contracts.

For us, maintaining reputation was the most important aspect. Since colony has switched to the mainnet we deployed [our own implementation](https://github.com/leapdao/leap-contracts/blob/master/contracts/misc/IColony.sol).

To use the colony-task feature we created a [bounty payout contract](https://github.com/leapdao/leap-contracts/blob/master/contracts/misc/BountyPayout.sol) utilizing the Colony payment feature. As a user interface we [forked](https://github.com/leapdao/MultiSigWallet) the Gnosis multi-sig. The funds of every circle are managed by a separate Escrow council.

Deployed at wallet.leapdao.org this allows every circle to easily reward and payout contributors. The workflow goes as following:

1. To the multi-sig wallet we added a payout bounty button.

<img src="/img/blog/payout-bounty.png" alt="Payout bounty button">

2. This button launches a modal with a flexible form allowing any member of the Escrow council to add the roles participating in the task.

<img src="/img/blog/payout-bounty-modal.png" alt="Payount modal with flexible form">

3. If worker funds are held outside of the multi-sig (this applies if a Bounty is worked on through Gitcoin or Bounties Network) then we use the `Reputation only` checkbox for the worker, while still paying gardeners and reviewers directly.

<img src="/img/blog/multisig-transaction-prepared.png" alt="prepared multisig transaction">

## How reputation benefits every developer

We automatically reward reputation by distributing funds accumulated through our Plasma-bridge contract. Every month reputation turns into money when Leap tokens are distributed. Additionally it helps us to gather statistics of who contributed how much at a given time.
