---
template: post.html
title: 'June-July Development Update'
date: 2018-07-25 00:23:00
image: RocketLaunch.jpg
author:
  name: Victor
  link: https://github.com/mateleshkavo
description: Status Of PARSEC Labs Plasma-Chain Development
tags: [update, dev]
---

<img src="/img/blog/LatestDevelopmentUpdate.jpg" alt="LatestDevelopmentUpdate">

Hello everyone, it’s Victor!

This post will describe our latest developments!

As some of you may remember, we started our Development Update blog posts in May, and this is our second article in what will hopefully become a long series.

<h2>Our Plasma Chain</h2>

We are glad to share that we released the first Alpha version of our Plasma node. In addition, we have built a prototype application, which communicates with the Plasma node so that everyone can test our chain.

Check it out here - <a href="http://alice.parseclabs.org/">Project Alice</a>.

<img src="/img/blog/ProjectAlice.png" alt="ProjectAlice">

<h2>Montenegro Workshop</h2>

In the middle of June, three of our developers met in Montenegro to attend a workshop and to hang out a bit. It was a very productive meet-up, as it was a rare occasion for our distributed team to meet each other in person.

Here is a short summary of what was accomplished on this trip….

<img src="/img/blog/JohannKostaAlex.jpg" alt="JohannKostaAlex">

<h3>Our Blockchain Node</h3>

We are very happy to announce that our Node is now fully functional. In Montenegro, a couple of things were done:

- Binary Release - We have published our node to an <a href="https://www.npmjs.com/package/parsec-node">npm registry</a>. Anyone can install and run it on the local machine;

- Documentation - This part is usually the most important one, as it simplifies our developers’ lives a lot. We added <a href="https://parseclabs.readthedocs.io/en/latest/">Documentation</a> for our <a href="https://en.wikipedia.org/wiki/JSON-RPC">JSON RPC</a> interface and for the node;

- Activation – We finished all work on the auction mechanism. The future validator should send an activation transaction to become a validator in activationEpoch;

A couple of problems were solved:

- Should we use <a href="https://en.wikipedia.org/wiki/Unspent_transaction_output">UTXO (Unspent transaction output)</a> in merging and UTXO consolidation? Should we automatically add it before each transaction? - We decided to add a new transaction type in parsec-library, which can merge all unspent outputs into one (preventing huge transactions with too many inputs);

- Should we add colors to UTXOs? - This was probably the biggest change during the workshop. We added the support of multiple tokens into our contract, library and node so our customers will be able to deposit, transfer and withdraw not only <a href="https://etherscan.io/token/0x9caa3424cb91900ef7ac41a7b04a246304c02d3a">PSC</a>, but other <a href="https://theethereum.wiki/w/index.php/ERC20_Token_Standard">ERC-20 tokens</a> as well.

<h3>Computation Without Proof</h3>

One of the workshop’s phases was centered on computation without proof; you can find the results below:

- Added Transaction Type – We added a support of computation request/response transactions into the node;

- <a href="https://github.com/ethereumjs/ethereumjs-vm">JS-EVM</a> - We just tried to run some compiled solidity code during the computation request transaction and luckily, it works. For now, it functions as the proof of concept. Here is an unfinished <a href="https://github.com/parsec-labs/parsec-node/pull/21">Pull Request</a> for computation without proof. We will continue with that after testing the new validator’s updates.

<h3>Plasma Development Updates</h3>

Last but not least, the final topic of the workshop was Plasma Contract development. We have made a progress report on that as well:

- Rainbow Release - our Plasma implementation now supports an arbitrary number of ERC20 tokens, which can be deposited and withdrawn from the contract. Each registered contract receives a number, which we refer to as the color of the token;

- Transaction Parser Library - rather than using RLP encoding for transactions, we rely on a more efficient and static structure. A Solidity library has been completed, which allows parse transactions and the exit of any of their outputs to go through a priority queue. With these milestones, we believe we have completed the full Minimal Viable Plasma spec as discussed on <a href="https://ethresear.ch/t/minimal-viable-plasma/426/94">ethresear.ch</a>;

- More Viable Plasma - while the Minimal Viable Plasma spec required confirmation signatures to protect funds from the mischief of a malicious operator, the 'More Viable Plasma' proposal introduces a protocol by which participants can safely withdraw their funds without confirmation signatures. This spec addresses any included transactions as well as in-flight transactions when the chain becomes byzantine. We have an in-progress implementation of MoreVP <a href="https://github.com/parsec-labs/parsec-contracts/pull/35">here</a>;

- Crypto-Economy Aggregate Signatures - the CAS scheme allows us to go beyond the subjective data-availability assumptions of Plasma, while continuing our research into exit games of smart contracts from Plasma chains. You can find the latest code <a href="https://github.com/parsec-labs/parsec-contracts/pull/34">here</a>.

<h2>Finished bounties</h2>

<img src="/img/blog/SpaceBounty.jpg" alt="SpaceBounty">

In the meantime, we have delivered a group of bounties that move us closer to finishing our milestones from the <a href="https://parseclabs.org/blog/ethereum-foundation-scaling-grant/">Ethereum Foundation Grant</a>.

<h3>Bounty 005 - Plasma Consensus Rules</h3>

<b><a href="https://github.com/johannbarbie">Johann</a></b> and <b><a href="https://github.com/sunify">Alex</a></b> have extended the node developed in Bounty 1 into the Plasma consensus rules in order to enable block submission in our node.
You can find the full bounty description <a href="https://github.com/parsec-labs/parsec-node/issues/9">here</a>.

<h3>Bounty 006 - Plasma Consensus Rules</h3>

<b><a href="https://github.com/troggy">Kosta</a></b> created a JSON RPC server that is compatible with the Ethereum specification.
You can find the full bounty description <a href="https://github.com/parsec-labs/parsec-node/issues/10">here</a>.

<h3>Bounty 010 - Project Alice</h3>

<b><a href="https://github.com/maxkudla">Max</a></b> created a Basic demo app using the Ethereum testnet. Also he connected it to the Ethereum testnet through the back end and added a few hardcoded accounts that are preloaded with testnet Ether.
Keep in mind that Project Alice was already switched to our PARSEC testnet. The design for Project Alice was created by <a href="https://github.com/a5kold">Sergey</a>.
You can find the full bounty description <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_011">here</a>.

<h3>Bounty 011 - Project Alice - Parsec Testnet</h3>

<b><a href="https://github.com/sunify">Alex</a></b> switched over <a href="http://alice.parseclabs.org/">Project Alice</a> from the Ethereum Testnet to the Parsec Testnet using <a href="https://github.com/parsec-labs/parsec-node/issues/10">JSON RPC Server</a> implementation with Web3.
You can find the full bounty description <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_011">here</a>.

Feel free to join our <a href="http://join.leapdao.org">Slack</a> and start working on our open <a href="https://github.com/parsec-labs/PIPs/wiki/Bounties">Bounties</a>. We are an open community, which means that anyone can try to deliver a bounty and if you will pass a validation, just send your wallet address to receive ETH.

<h2>Parsec Faucet</h2>

<b><a href="https://github.com/johannbarbie">Johann</a></b> built <a href="https://github.com/parsec-labs/parsec-faucet">faucet</a> service for our chain. It allows you to receive PSC tokens for testing purposes. <b><a href="https://github.com/sunify">Alex</a></b> added a smooth, minimalistic design to it, which you can check out <a href="http://stake-dev.parseclabs.org/faucet">here</a>. Stay tuned for the opportunity to receive free PSC tokens in the future.

<h2>Stacking UI</h2>

<b><a href="https://github.com/sunify">Alex</a></b> built <a href="http://stake-dev.parseclabs.org/">stacking UI</a> which you will be able to use in the future to buy a validators slot, <a href="http://stake-dev.parseclabs.org/deposit">make a deposit</a> to a chain and also to claim some free PSC from the faucet service. For now it is just a nice extra tool that simplifies node development and testing. In the future it will be used to help our validators.

That is it for our updates!
