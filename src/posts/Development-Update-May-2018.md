---
template: post.html
title: 'Development Update: May 2018'
date: 2018-06-15 00:23:00
image: PARSECRocket.jpg
description: Monthly development update for Pasec Plasma Chain
---

<img src="/img/blog/DevelopmentUpdateMay.jpg" alt="DevelopmentUpdate">

Heylo, community! This is the first in a series of monthly posts to update you on our work in the R&D and Dapp Development circles. This specific blog post is devoted to May 2018. Let's start!

<h3>Transaction and Proof Library</h3>
<b><a href="https://github.com/troggy">Kosta</a></b>: First of all we have incepted a <a href="https://github.com/parsec-labs/parsec-lib">client library</a> to work with the PARSEC network. Initially we have implemented primitives like transactions, blocks and periods. The Parsec library is used in all aspects of the implementation, being it contracts, node, CLI or frontend. The library was created in the scope of <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_007">Bounty_007</a>.

<h3>Plasma Node</h3>
<b><a href="https://github.com/sunify">Alex</a></b>: Probably the main achievement of the month is the first version of our <a href="https://github.com/parsec-labs/parsec-node">node</a>, which can check transactions using <a href="https://lotionjs.com/">LotionJS</a>.  The implementation was preceded by an evaluation of different implementation options:
- Developing everything by ourselves - this would include components like p2p messaging, transaction storage, and more;
- Forking the <a href="http://bcoin.io/">bcoin project</a>.  As Plasma exit proofs lend itself to UTXO-model blockchains like Bitcoin, we expected to be able to reuse big parts of the code base and put our Plasma code on top. Later we figured out that this is not the best option;
- Our final choice fell on <a href="https://tendermint.com/">Tendermint</a>. We chose it together with the Lotion library, which wraps it.  In this case implementing the Plasma chain became much simpler, as almost everything is ready made. We adopted the selection of technologies provided by the Lotion examples and created a first stage realization including submission of block headers to the Plasma contract, among other things.

<h3>Proof Of Stake</h3>
<b><a href="https://github.com/johannbarbie">Johann</a></b>: This month we have extended our Plasma contract with PoS magic.  One part of this magic are slot auctions.  Slot auctions allow validators to purchase the rights to validate blocks and submit their results to earn rewards.  Check the screenshot below for the final state machine that defines all transitions in the slot model!

<img src="/img/blog/SlotModel.png" alt="SlotModel">

We have also implemented a reflexive block reward function that is based on the percentage of total supply staked. This will ensure a healthy competition between the validators without ever binding all tokens into the staking contract. This way the token economy on chain will stay unaffected by validator staking. We have found a neat little formula that can be implemented in Solidity:

<img src="/img/blog/Formula.jpg" alt="Formula">

Where <b>&alpha;</b> is <i>% of total supply staked</i>, <b>&beta;</b> is <i>block reward</i>, and <b>&omega;</b> represents <i>total supply</i>. The function looks like this:

<img src="/img/blog/BlockRewardsGraph.png" alt="FoBlockRewards" class="narrow">

<h3>EVM Computation Verification</h3>
On top of that we have started to collaborate with <a href="https://matic.network/">matic.network</a> and <a href="https://decentraland.org/">decentraland.org</a> to implement EVM fraud proof verification. These fraud proofs will allow to challenge invalid computation on the Plasma chain through the Plasma contracts.  You can check out a first design document <a href="https://docs.google.com/document/d/1UsC3RbGNQuOla8EPwPDjXnsRKrpJt3IlUQTKnlrjHTg">here</a>.  Stay tuned for bounties and code that will come out of this collaboration.

<h3>Gas Oracle</h3>
And finally, <b><a href="https://github.com/Koroqe">Alex Core</a></b> made a gas oracle! Alex proposed two variants of the gas oracle.
- Store <i>gasPrice</i> amount in block struct.  The function getAverageGasPrice() calculates and returns the average gas price of 20 last blocks.
- Store <i>gasPrice</i> in variable and modify it with every block submission. The pseudocode for this approach is as follows: <br><br><i>avgGasPrice = avgGasPrice - avgGasPrice/15 + tx.gasprice/15</i><br>

In first approach the transaction to query average gas price costs approximately 28864 gas. Every block submission costs 21500 gas more. In the second approach the getter is simply reading the storage, and every block submission costs approximately 6500 gas (21500 at first block). You can find more about it <a href="https://github.com/parsec-labs/parsec-contracts/pull/18">here</a>. This feature was developed in the scope of <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_015">Bounty_15</a>.

These are all the updates for May 2018!
