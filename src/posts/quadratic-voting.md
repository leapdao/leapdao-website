---
template: post.html
title: "Quadratic Voting: Ending the tyranny."
date: 2020-05-02 18:00:00
image: voting-qv.png
author:
  name: "@KenoBudde"
  twitter: "@KenoBudde"
  link: https://github.com/clearwood/
description: An overview of Quadratic Voting.
---

Providing an overview of the current state of Quadratic Voting at LeapDAO.

## What is Quadratic Voting

The most commonly used form of voting is one where each voter gets one vote per issue. This however relies on one underlying assumption: That every voter cares the same amount for each issue, an assumption which rarely coincidences with reality.
A world where only the views of the majority count may know another problem: the so-called "tyranny of the majority". ([John Stuart Mill: On Liberty](https://socialsciences.mcmaster.ca/econ/ugcm/3ll3/mill/liberty.pdf)) Minorities are better represented in a system where voters may not only express a binary opinion but also how strongly they feel about it.
Quadratic voting (QV) tries to be such a solution. In QV each participant is given an allocation of credits which they can use to cast votes on an issue. The cost for a vote does not scale linearly however but quadratically.
Imagine that a vote generally costs 1 Voice Credit (VC) and you have 10 credits. You could either spend one VC for one vote. Two votes however would already cost you four credits.

The following graphic demonstrates this:

<img src="/img/blog/voice-overview.png" alt="Explanation Quadratic Voting">

Each additional vote will increase the victory chances of an issue but it comes at a high cost. Only those will use this option who care deeply about a topic.

By analyzing what topics made voters use those extra powers it is possible to devise a better ranking of topics than through a completely organic ranking.

## Our experience

### Pop-up Democracy

Together with our partner [Deora](https://deora.earth/) we deployed our Quadratic Voting Solution at two very different events.

In September 2019 [Volt Germany](https://www.volteuropa.org/), a pan-European party, held their second party congress in Germany in the city of Leipzig.

Since the event happened in a closed environment with limited time and physical space, we made use of the [burner wallet](https://github.com/burner-wallet/burner-wallet-2). This simple tool enabled us to on-board people via a QR Code containing the private key that opens - once scanned - a pre-funded wallet and the voting platform. Every Volt member got an introduction and his personal QR code once accredited through the Volt administration on the spot. On the web app the user can see their amount of voice credits on their wallet and a list of all proposals to vote for.

<img src="/img/blog/volt-qv.jpg" alt="Volt Quadratic Voting">

Initially we wanted to provide a very similar solution for the [ETHTurin](https://ethturin.com/) hackathon. But the difficult circumstances which made it necessary for the hackathon to become virtual created the need to innovate. We could not distribute paper wallets which lead us to develop a [faucet](https://github.com/leapdao/token-faucet/tree/ethTurin) distributing voice credits depending on whether the user had the ERC-721 token of the conference in his Web3 Wallet.
<img src="/img/blog/faucet-turin.png" alt="Request tokens @ETHTurin">

After signing an API request to our Faucet, the user would then receive a QR-Code for an account pre-funded with our voting credits.

<img src="/img/blog/qr-turin.png" alt="Pre-funded QR @ETHTurin">

### Results

#### Volt Germany

The vote was announced on Sunday morning on the last day of the congress, and kept open until 18:00 on Tuesday. During this time 134 out of 488 accredited party members used the Dapp to cast at least 1 vote. 1565 votes were cast in total on 19 proposals. Of these 1435 were votes to add voice-credits to a proposal, while 130 were withdrawing voice-credits from a proposal.

The test on our platform was an optional case for the Volt members without a jurisdictional outcome. Thus 27% can be considered a great outcome. In conversations with party members we observed an affinity for online voting in many conversations.

The vote was used to generate a priority list, ranking the importance of topics for the next congress. The simple summary of the vote result is displayed in the figure below.

<img src="/img/blog/results-volt.png" alt="Results at Volt Congress">

The numbers represent the total vote tokens that the topic received in exchange for voice-credits casted by the voters. These results are similar to the results that a traditional vote or budget vote would produce. No insight into the emotional weight attached by the votes available.

Quadratic Voting promises to (1.) protect minorities from the tyranny of the majority that otherwise occurs in 1 person 1 vote setups. In setups where people can buy votes Quadratic Voting can (2.) protect the majority from influential monopolies. At the beginning every-one had the same amount of credits, theoretically our setup allowed voice credits to be transferable, hence both attributes of Quadratic Votings would be interesting to observe.

#### Voter distributions

The topic “2. Education” shows a typical distribution for most high-ranking topics. We see that a majority has decided to cast 4 or 9 voice-credits and place 2 and 3 votes respectively.
A minority of 5 voters have decided to invest 25 to 49 voice-credits and cast 5, 6 or 7 votes. We assume that for these voters the topic has an especially high or emotional value. The fact that almost 10% of the transaction volume were withdrawal transactions indicates that voters were not just lazy and tried to get rid of as many votes as possible in one go, but actually thought about the topics and adjusted their votes later.

<img src="/img/blog/vote-dist-volt.png" alt="Comparison Distribution Votes Volt Congress">

The proposal “14. Renewed Economy” show a typical distribution of a proposal ranked in the middle of the field, with a high number of abstentions and no votes with more than 9 voice-credits invested.
It can be observed that this proposal has no “emotionally invested” voters, but rather has been used to “save” votes by many participants.

A naive notion of a minority can be defined as any-one who used 25 or more of their 62 voice-credits on a single proposal. We can draw the minority distribution in comparison to the ranking as
in the following diagram. While the definition of minorities objectively defined and the numbers lack statistical significance, the graph indicates that minorities exist primarily in the highest and lowest ranking proposals.

<img src="/img/blog/dist-volt.png" alt="Distribution Minorities Volt Congress">

### EthTurin

At EthTurin we recorded 340 transactions from 29 unique voters over the course of 22 hours. This indicates that the hackers did their best to use the power bestowed upon them wisely. The winner project of the hackathon, [MetaBounty](https://github.com/biancasama/ants-review-whitepaper/blob/master/ETHTurin2020_team2_Ants-Review_whitepaper.pdf), received 96 votes coming from 636 voice credits.

<img src="/img/blog/ranking-turin.png" alt="Ranking at ETHTurin">

Looking at the voting distribution for this particular project it becomes visible that a minority of four voters cared exceptionally for this to win the contest.

<img src="/img/blog/metabounty-ethturin.png" alt="Metabounty at ETHTurin">

To gain a more detailed insight about the voting distributions for all projects have a look [over here to our raw data](https://docs.google.com/spreadsheets/d/1DzXUUWvvOCCFycJAutkhXodd-K7ITPYm0r4rEjz5Ex8/edit#gid=695222373).

## Voting and Optimized Sparse Merkle Trees

We implemented our QV solution using our [Plasma testnet](https://testnet.leapdao.org/) and a simple Web App integrating the [burner wallet](https://github.com/burner-wallet/burner-wallet-2).
For our users to be able to vote they need two things: Voice credits, a Plasma token, and a Voting Balance card (a [ERC-1948 token](https://eips.ethereum.org/EIPS/eip-1948)).
The Voting Balance card contains our [Solidity implementation](https://github.com/deora-earth/voting-contracts/blob/20f8cbc9dc84b79e9910b14c9c3ecd99d89c1b2c/contracts/SparseMerkleTree.sol#L16-L52) of Optimized Sparse Merkle Trees. In this user centric data structure we save the votes of the participant. The optimization means that in comparison to a binary Merkle Tree fewer hashes need to be computed for partly filled structures.
To execute a vote the user sends their Voice credits to a booth contract where according to their voice credits Vote tokens are minted. Those are then sent to a ballot box. The votes are recorded on the balance card.

<img src="/img/blog/voting-qv.png" alt="QV Voting Explainer">

If a user wants to withdraw voice tokens from a vote the box contract burns the vote tokens by sending them to a trash box. The Voting Balance card is updated accordingly.

<img src="/img/blog/qv-withdraw.png" alt="QV Withdrawing Explainer">

## Join us

If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). LeapDAO is a small independent team incubated by [Status.im](https://our.status.im/leapdao-to-join-incubate-family-as-our-fourth-incubatee/) and running on the Ethereum Foundation grant. We are looking for active people to join our core research and development.
