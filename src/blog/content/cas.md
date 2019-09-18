---
template: post.html
title: 'Cryptoeconomic Aggregate Signatures in Leap Network'
date: 2019-09-18 12:20:00
emoji: 🐲
author:
 name: '@kosta'
 twitter: '@troggo'
description: How Leap Network plans to strengthen multi-validator setup with CAS
---

We've implemented a simple construct for validators to vote on each other's <abbr title="A unit used for anchoring Leap Plasma to the root chain">period</abbr> proposal. We think this could even more disincentivise validators from being bad actors and thus increase livability of the network.

...
Plasma contract enforces only the periods with 2/3+ validator votes can get into to the root chain. If proposer lies about the votes, anyone with the data can challenge him and delete the contentious period.
