---
template: post.html
title: 'Best hacks from the Ethereal Virtual Hackathon'
date: 2019-05-10 14:08:00
image: /img/blog/ethereal-results.png
author:
  - name: '@kohola'
    twitter: 'koholaa'
description: Best LeapDAO dApps and game submitted during the Ethereal Virtual Hackathon.
---

<p></p>

In the last 2 weeks of April a bunch of hackers joined forces at the [Ethereal Virtual Hackathon](https://gitcoin.co/hackathon/ethereal-virtual-hackathon/), working on projects crucial to making decentralized web a reality.

LeapDAO sponsored the hackathon along with Gitcoin, Microsoft and others. We were very happy with the level of submitted projects targeting our challenges and the enthusiasm of participants. Read on to find out more about what was being hacked and who are the golden winners.

In the first challenge, we asked people to build some simple but functional Plasma dApps. Submissions had to include smart contracts operating at layer-2 and demonstrate the advantages of scalability. We received some great submissions.

## Dungeon Riches

<img src="/img/blog/dungeon-riches.png" alt="Dungeon Riches screenshot" />

[Max](https://github.com/MaxStalker) built [Dungeon Riches](https://leap.dungeonriches.com/), a dungeon runner game featuring battles with simple mechanics based on rock-paper-scissors.

In mini-games players are presented with an ability to make quick bets, with all their balance always at their disposal. Utilizing spending conditions, the Leap Network's inherent way to run smart contracts, he was able to realize a provably fair game, where each round is escrowed on-chain. Dungeon Riches' beautiful graphics and animations make it fun to play.

Dive into the dungeons and find your riches here: https://leap.dungeonriches.com/

## Burner Bot

<img src="/img/blog/burner-bot.png" alt="Discord Burner Bot screenshot" width="400" />

[John](https://github.com/johngrantuk) built the [Burner Bot](https://github.com/johngrantuk/burnerbot/tree/leap_plasma) - an easy way to transfer ERC20 token on plasma. This bot was inspired by [Burner Wallet](https://github.com/austintgriffith/burner-wallet) and built using [autom8](https://gitlab.com/autom8.network/docs).

His goal was to create something similar to the Burner Wallet, which provides a quick and easy way to carry and exchange small amounts of crypto. In this case exchange is done on Discord using autom8 technology. His version uses the Leap Network for 1:1 with Dai and quick block times.

## Plasma Watchtower

We were also very happy with the submission to the second challenge - the Leap Watchtower bounty. The Leap Network implements the [More Viable Plasma](https://ethresear.ch/t/more-viable-plasma/2160) design. In this design the users' funds are protected from the operator of the chain through an exit game. If that operator turns malicious and starts submitting invalid or dark blocks, then the users have 7 days to exit their funds back to the mainnet. The task was to build a monitoring solution with a synced node that follows and validates the Plasma chain and notifies registered users of malicious activity occurring on the chain in real time.

<img src="/img/blog/watchtower.png" alt="Watchtower screenshot" />

[Travis](https://github.com/travisdmathis) created a Leap Watcher - a blockchain validation service allowing users to subscribe to notifications and monitor the validity of the Leap Network. It should work with slight tweaks for any implementation that follows the MV Plasma standards. Check out the submission here: https://github.com/travisdmathis/leap-watcher

---

Unfortunately no one decided to tackle the challenge of creating an exit market maker which was the last bounty we prepared. Well, if anyone still wants to tackle that issue, we are open to your creative solutions and happy to help you out along the way. Join our Slack community to get started for more of the good times!

<img src="/img/blog/ethereal-thanks.png" alt="People happy about hackathon" width="600"/>

Big thanks to all the participants, and congrats to the Gitcoin team for putting together and running smoothly such a cool virtual hackathon, and for all the support and activity on [Discord chat](https://discordapp.com/channels/562828676480237578/565966345145942017)!
