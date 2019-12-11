---
template: post.html
title: 'Plasma Mainnet Launched!'
date: 2019-02-13 16:23:00
image: /img/mainnet-og.png
author:
  - name: '@kohola'
    twitter: 'koholaa'
  - name: '@johba'
    twitter: 'johba'
description: LeapDAO took a leap to the Ethereum mainnet. 🎉
---

We’ve been on a roll lately and are super happy to announce that LeapDAO took a leap to the mainnet! Our community is now operating a More Viable Plasma chain on the Ethereum mainnet 🎉.

If you are a project creating digital assets, we invite you to [register your ERC20 or ERC721](https://mainnet.leapdao.org/registerToken), which will be transferable faster and cheaper on the Plasma chain. For developers, we provide a [token faucet](https://mainnet.leapdao.org/faucet) so that you can test transfers, exits and deposits.

<p>
  <a href="https://mainnet.leapdao.org" target="_blank" rel="noopener noreferrer" class="button button-primary">
    Try it out
  </a>
</p>

## The Plasma Ecosystem

The More Viable Plasma design is one of the dialects introduced by the research community organized around the Plasma implementers call, lead by Karl Floersch. It is a non-custodial child chain that offers security of funds - under the assumption that users constantly monitor the chain, and exit their funds within a specific duration if they see irregularities. If you want to learn how MoreVP compares to Plasma Cash and Plasma Prime, please have a look at [learnplasma](https://learnplasma.org).

We sometimes find our Plasma implementation compared to other projects like [OmiseGo](https://github.com/omisego/plasma-mvp), [The Matter](https://github.com/matterinc) and others in a competitive manner. It is crucial to understand that the designs are used for different purposes and stand in no competition to each other.

- OmiseGo is utilizing Plasma in a single dApp setup - they create an environment to operate their own transfer network and a decentralized exchange, and are not targeting independent developers.
- The Matter caters to businesses and creates single specialized solutions for customers that utilizes Plasma in its design.

Both solutions are great for their purpose, but differ from our goal to create [layer-2 execution environment](/blog/Smart-Contracts-on-Plasma/) as a [global public utility](/about). In this setup, users can deploy and operate any contracts they like. We intend to keep this Plasma deployment as open as the Ethereum network itself, and as aligned with the purpose of Ethereum as possible.

## The Deployment

The mainnet deployment is operating [the Driftwood release](/blog/Plasma-Roadmap/) of our software and can be found at [mainnet.leapdao.org](https://mainnet.leapdao.org). Beware that the software has alpha quality, is not audited yet and any use is at your own risk! The chain operates with a set of parameters that are tailored towards production use of Plasma. The table below compares the parameter set to the [testnet launched recently](/blog/Plasma-Testnet-Launched/).

| Parameter          | [Testnet](https://testnet.leapdao.org) | [Mainnet](https://mainnet.leapdao.org) |
| ------------------ | -------------------------------------- | -------------------------------------- |
| EXIT_STAKE         | 0.1 ETH                                | 0.1 ETH                                |
| EXIT_DURATION      | 5 minutes                              | 3.5 days                               |
| CHALLENGE_DURATION | 2.5 minutes                            | 1.75 days                              |
| PROPOSAL_TIME      | 10 minutes                             | 7 days                                 |

- **EXIT_STAKE -** A stake that needs to be paid on the mainnet to register a UTXO (tokens on Plasma) for exit.
- **EXIT_DURATION -** The maximum duration that exits are held for challenge before being paid out.
- **CHALLENGE_DURATION -** The minimum time that an exit held for challenge before being paid out.
- **PROPOSAL_TIME -** The duration of the governance proposals hold off before applying to the network.

In the future, the community will introduce contract upgrades through [Minimal Viable Governance](/blog/Minimal-Viable-Governance). Users not agreeing with governance proposals will have 3.5 days to exit the chain before these proposals become active. Please have a look at [our roadmap](/blog/Plasma-Roadmap) to see where the journey is going.

## The LeapDAO Community

After the recent Plasma testnet launch announcement, we’ve received a lot of attention from you on our Twitter and Reddit. Many of you wonder who is behind LeapDAO and what’s our role within the Ethereum ecosystem.

We’d like to take this opportunity to introduce ourselves. You might have heard of us before via Parsec Labs, where we focused on enabling on-chain scalability for game execution. In 2018 we’ve expanded our mission beyond the gaming industry, and hence the creation of LeapDAO, with a purpose to deliver layer-2 blockchain scalability as a global public utility. Check out some of our project stats below:

[LeapDAO GitHub Organization](https://github.com/leapdao)

- 40+ repositories
- 8 regular contributors
- 10+ additional developers in the extended circle
- 60+ members in #d_for_development channel in [Slack](https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform)

Aspiring to work as a Decentralized Adaptive Organization, we combine the holacracy and decentralized organizations models to build a global, self-managing and purpose-driven community. We reward contribution using bounties. You can find out more about the way we collaborate [here](https://leapdao.org/blog/PARSEC-Labs-Holacracy-Structure/) (slightly outdated). In 2018 we were lucky to receive some external funding to sustain the project, including a \$50,000 grant from the [Ethereum Foundation](/blog/ethereum-foundation-scaling-grant). We also joined [Status Incubate](https://our.status.im/leapdao-to-join-incubate-family-as-our-fourth-incubatee/) as one of the accelerated projects.

We would love 💛to see more of you getting involved in LeapDAO. We are looking for like-minded people (not only developers!). To get started, [join our Slack community](https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform).

<a href="https://docs.google.com/forms/d/e/1FAIpQLSd8_wDGDAi__HvfYEWNK_bvJzIkxwHHRVL6AFEfJewBd2Vn9A/viewform" target="_blank" rel="noopener noreferrer" class="button button-primary button-compact">
  Join our Slack community
</a><br/><br/>
<a href="https://leapdao.org/earn/" target="_blank" rel="noopener noreferrer" class="button button-primary button-compact">
  View open bounties
</a><br/>
