---
template: post.html
title: 'Mainnet postmortem report for incident on 17th June 2019'
date: 2019-07-02 15:00:00
emoji: ⛑
image: /img/blog/XXXX.png
author:
  - name: '@pinkiebell'
    link: 'https://github.com/pinkiebell/'
  - name: '@kosta'
    twitter: '@troggo'

description: What happened on 17th June 2019 with leapDAO-mainnet? Read on...
---

## Quick overview of network setup

```
validator-a (proposing) <-> validator-b (passive)
                         ^
            sentinel-a <-|-> sentinel-b
      both sentinels serving the 'outer' world
```

## What happened on 17th June 2019

We got notifications on Slack that `validator-a` is not producing blocks and therefore no periods anymore.
Checking the logs revealed that `validator-a` had problems with P2P connections to other nodes.

We had to restart `validator-a` and making `validator-b` active, however `validator-b` had the same problems so we
left it as-is in hope it might catch itself.

After nearly ~7 hours, `validator-a` catched up again and producing blocks.
The problem was that `validator-b` also started to catch itself and the nodes still had connections issues to each other,
leading to inconsistencies and a fork. After the fork happened, both nodes stopped working per design and mainnet was really dead.

At this point we decided to let the mainnet to (R)est(I)n(P)eace and move on with our planned mainnet migration.
We still played with the old mainnet nodes to try to recover them, which succeeded and we learned more about tendermint's internal workings.

By the way, the mainnet failure had nothing to do with the migration, it was just a coincidence.

## What we learned

- Valuable insights on tendermint.
- Never ever operate validators with the same keys, even if we can switch them from active to passive.
- Operational tricks to avoid or recover bad nodes faster in the future.

## What happens now

Our planned mainnet migration to a new leap-node version with dozens of bug fixes are almost done!
You can read more about the migration at [this blog post](https://leapdao.org/blog/mainnet-revamp/).
