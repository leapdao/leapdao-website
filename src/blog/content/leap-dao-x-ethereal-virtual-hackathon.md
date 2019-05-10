---
template: post.html
title: 'Best LeapDAO hacks (and games) from the Ethereal Virtual Hackathon'
date: 2019-05-10 14:08:00
image: /img/blog/ethereal-results.png
author:
  - name: '@kohola'
    twitter: 'koholaa'
---

<img src="/img/blog/ethereal-results.png" alt="Ethereal results banner" />

In the last 2 weeks of April a bunch of hackers joined forces at the [Ethereal Virtual Hackathon](https://gitcoin.co/hackathon/ethereal-virtual-hackathon/), working on projects crucial to making decentralized web a reality — including on our proposed bounties. We were very happy with the overall level of submitted projects and the enthusiasm of participants. Read on to find out more about what was being hacked and who are the golden winners.

In the first bounty, we asked people to build some simple but functional Plasma dApps, which demonstrate the advantages of Plasma, using the documentation and resources we provided. We received some great submissions for this challenge.

## Burner Bot

<img src="/img/blog/burner-bot.png" alt="Discord Burner Bot screenshot" width="400" />

John built the [Burner Bot](https://github.com/johngrantuk/burnerbot/tree/leap_plasma) - an easy way to transfer xDai or LEAP (from LeapDAO). This bot was inspired by [Burner Wallet](https://github.com/austintgriffith/burner-wallet) and built using [autom8](https://gitlab.com/autom8.network/docs).

His goal was to create something similar to the Burner Wallet, which provides a quick and easy way to carry and exchange small amounts of crypto using a mobile browser. In this case exchange is done on Discord using autom8 technology. Just like the Burner Wallet, his version uses xDai Chain for 1:1 with Dai, low gas fees and quick block times while also making use of LeapDAOs Plasma chain scaling solution. It even demonstrates an example of using their 'spending conditions' to execute smart contract functionality.

## Dungeon Riches

<img src="/img/blog/dungeon-riches.png" alt="Dungeon Riches screenshot" />

Max built a “Dungeon Riches” - gambling card game, with simple mechanic based on rock-paper-scissors game.

He already had part of the concept running on Bitcoin node, however it was storing private keys on the backend, which presented a lot of challenges with transparency and trust. Using LeapDAO he wanted to present players with an ability to make quick bets, with all their balance always at their disposal. No need for deposits and withdrawals. Provably fair game, where each round is stored in spending condition. Sprinkled with beautiful graphics and animations to make the process more fun.
Play the game here: https://leap.dungeonriches.com/ and check out the code here: https://github.com/MaxStalker/dungeon-riches-react-basic

## Plasma Watchtower

We were also very happy with the submission to the second challenge - the Leap Watchtower bounty. The Leap Network implements the [More Viable Plasma](https://ethresear.ch/t/more-viable-plasma/2160) design with a single operator. If the operator turn malicious and starts submitting invalid or dark blocks, then the users of the Plasma chain have 7 days to exit their funds back to the main net. The task was to build a monitoring solution with a synced node that follows and validates the Plasma chain and notifies registered users of malicious activity occurring on the chain in real time.

Travis created a Leap Watcher - blockchain validation tool for subscribing to notifications and monitoring the validity of the LeapDAO implementation of More Viable Plasma. It should work with slight tweaks for any implementation that follows the MV Plasma standards. Check it out here: https://github.com/travisdmathis/leap-watcher

---

Unfortunately no one decided to tackle the challenge of creating an exit market maker which was the last bounty we prepared. Well, if anyone still wants to tackle that issue, we are open to your creative solutions and happy to help you out along the way. Join our Slack community to get started for more of the good times!

<img src="/img/blog/ethereal-thanks.png" alt="People happy about hackathon" />

Big thanks to all the participants, and congrats to the Gitcoin team for putting together and running smoothly such a cool virtual hackathon, and for all the support and activity on [Discord chat](https://discordapp.com/channels/562828676480237578/565966345145942017)!
