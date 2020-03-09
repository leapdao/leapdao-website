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
Holacracy is an extremely dynamic framework which serves us well, a model which gives responsibility to every single developer. We are structured in circles and regular meetings help us stay aligned to our goals. Circles are teams such as the dev circle or independent projects such as [Deora](https://www.deora.earth/). The structure is constantly evolving, [Glassfrog](https://app.glassfrog.com/organizations/14849/orgnav/roles/10883348) is the software of our choice to keep track of it.

<img src="/img/blog/holacracy-glassfrog-circle.jpg" alt="Current organizational overview of LeapDAO">

The same person might have multiple roles within the organization and be a part of multiple circles, just like someone might juggle multiple responsibilities in a more traditional enterprise. We are truly decentralized and having structures which continually change for the better is crucial for us.

Every circle manages their own multi-sig wallet with individual budgets and is responsible for all tasks in their area of expertise.

All work is done through [bounties](https://app.glassfrog.com/organizations/14849/orgnav/policies/10912780 "Bounty policy") which anyone can propose similarly to colony tasks. Proposed bounties can be objected to through our Slack or the associated Github issue. Similarly, bounties without any progress can be challenged by other developers.

According to the concept proposed by colony each bounty has three roles:

1. The gardener who prepared the specifications.
2. The worker who completed the bounty.
3. The reviewer who checks that the work fulfills the requirements and serves the purpose of assuring the quality of our products.

Bounties are structured into different sizes with increasing payout, all of which are denominated in DAI.

## What colony means to us

Colony is an exciting project promising to deliver solutions for digital companies with a great range of solutions and a plentiful of smart contracts.

For us, maintaining reputation was the most important aspect. [Colony reputation](https://blog.colony.io/the-colony-reputation-system-5616293c3949/) is a way to keep track of merit, how much an individual has contributed to the success of an organization by clear metrics. Reputation is added by serving a role or contributing in the form of working on a bounty and slowly decays over time. Since colony has switched to the mainnet we deployed [our own implementation](https://github.com/leapdao/leap-contracts/blob/master/contracts/misc/IColony.sol).

To use the colony-task feature we created a [bounty payout contract](https://github.com/leapdao/leap-contracts/blob/master/contracts/misc/BountyPayout.sol) utilizing Colony payment. As a user interface we [forked](https://github.com/leapdao/MultiSigWallet) the Gnosis multi-sig. The funds of every circle are managed by a separate Escrow council.

Deployed at [wallet.leapdao.org](https://wallet.leapdao.org/) this allows every circle to easily reward and payout contributors. The workflow goes as following:

1. To the multi-sig wallet we added a payout bounty button.

<img src="/img/blog/payout-bounty.png" alt="Payout bounty button">

2. This button launches a modal with a flexible form allowing any member of the Escrow council to add the roles participating in the task.

<img src="/img/blog/payout-bounty-modal.png" alt="Payount modal with flexible form">

3. If worker funds are held outside of the multi-sig (this applies if a Bounty is worked on through Gitcoin or Bounties Network) then we use the `Reputation only` checkbox for the worker, while still paying gardeners and reviewers directly.

<img src="/img/blog/multisig-transaction-prepared.png" alt="prepared multisig transaction">

## How reputation benefits every developer

We reward reputation by distributing funds accumulated through our Plasma-bridge contract. Every month reputation turns into money when Leap tokens are distributed. To achieve this we query our [Colony contract](https://etherscan.io/address/0x24f861f8356fa8d18b6adea07ac59719f42012b1) for the reputation root hash:  

<br>

```javascript
const { getNetworkClient } = require('@colony/colony-js-client');
const { open } = require('@colony/purser-software');
(async () => {
  const wallet = await open({
    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });
  const networkClient = await getNetworkClient('mainnet', wallet);
  const repHash = await networkClient.getReputationRootHash.call();
  console.log('repHash:', repHash);
})().then(() => process.exit()).catch(error => console.error(error));
```

Using the root hash a simple GET request to the colony API  is sufficient to receive the individual reputation for each developer. For example to query the reputation amount for the ethereum address `0x8db6B632D743aef641146DC943acb64957155388` at root hash `0xdf32626d1f933a177f6a9431ff085b96561cc5da7240baccc4ef3897646f5553` we would place [this  GET request](https://colony.io/reputation/mainnet/0xdf32626d1f933a177f6a9431ff085b96561cc5da7240baccc4ef3897646f5553/0x24f861f8356fa8d18b6adea07ac59719f42012b1/88/0x8db6B632D743aef641146DC943acb64957155388). At the point of writing we manually query reputation, calculate the individual reward share for each contributor and create a cute pie chart:

<img src="/img/blog/cute-pie.png" alt="reputation pie chart">

If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). LeapDAO is a very small independent team incubated by [Status.im](https://incubate.status.im/projects/) and running on the Ethereum Foundation grant. We are looking for active people to join our core research and development.
