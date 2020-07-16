---
template: post.html
title: "Postmortem for the Mainnet incident on 17th June 2019"
date: 2019-07-02 15:00:00
emoji: ⛑
image: mainnet-postmortem.png
author:
  - name: "@pinkiebell"
    link: "https://github.com/pinkiebell/"
  - name: "@kosta"
    twitter: "@KostaKorenkov"

description: Mainnet incident happened on 17 June 2019. Funds are safe.
tags: [update, dev, plasma]
---

LEAP Mainnet has stopped due to double signing and administration issues and had to be restarted. No user funds lost. All the functions are restored now.

## Our validator setup before the incident

LEAP network is still in its [PoA era](https://leapdao.org/blog/Plasma-Roadmap/) and the mainnet validator is operated by LeapDAO. To ensure better validator uptime, we were running two copies of the same validator (sharing the same signing key): one copy is proposing blocks and the other is just passively following the chain. The plan was that in case of the proposing node failure, we should be able to quickly switch over to the backup node making it active. Well, don't try this at home. The setup appeared to be [dangerous](https://twitter.com/zmanian/status/1145072296723275776) — we needed to make sure that at no point both copies are producing blocks at the same time.

<img src="/img/blog/mainnet-topology.png" height="560" width="480" alt="LEAP Mainnet topology before the incident">

## What happened on 17th June 2019

We got notifications on Slack that Validator A is stopped producing blocks and therefore not submitting periods anymore.
The logs revealed that Validator A had problems with P2P connections to other nodes.

We had to restart Validator A and make Validator B active. However, Validator B had the same problems so we left it as-is hoping it might recover.

After nearly 7 hours, Validator A caught up with the network tip and started producing blocks.
The problem was that Validator B also started to produce blocks and the nodes still had issues connecting to each other, leading to inconsistencies and a fork. After the fork happened, both nodes stopped working per design and mainnet was really dead.

## How we resolved the issue

Coincidentally, we were [planning the mainnet migration](https://leapdao.org/blog/mainnet-revamp/) around the same time. So we decided to let the old mainnet rest in peace and move on with the planned migration. The migration went smooth and the mainnet is up and working again.

We still played with the old mainnet nodes trying to recover them. We succeeded with recovery and learned more about Tendermint's internals.

## Lessons learned

- Valuable insights on Tendermint internals.
- Never ever operate validators with the same keys, even if you can switch them from active to passive. It's better to have a proper ring of at least four different validators, so you can afford one of them to be temporarily offline.
- Operational tricks to avoid or recover bad nodes faster in the future.

## What happens now

Our planned mainnet migration was successfully completed. The mainnet is running, all the functions are in place. No funds lost because of the incident. You can read more about the migration in our [blog](https://leapdao.org/blog/mainnet-revamp/).
