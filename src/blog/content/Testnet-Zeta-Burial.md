---
template: post.html
title: 'Requiem for Testnet Zeta'
date: 2019-03-26 10:50:00
emoji: ζ
author:
  name: '@kosta'
  twitter: '@troggo'
  link: https://github.com/troggy/
description: It's name is Testnet Zeta, and Testnet Zeta will have 57002 blocks forever.
---
<br>

<img src="/img/blog/zeta.jpg" height="560" width="480" alt="LeapDAO's Testnet Zeta gone for good">

It's name is Testnet Zeta and it is a Plasma chain with 57002 blocks. It's name is Testnet Zeta, and Testnet Zeta will have 57002 blocks forever.

Born on February 1th, Zeta was the first of our testnetworks we challenged invalid plasma exit on, the first testnet we claimed period rewards from. It was the first to operate a fast exit market maker, buying back plasma exits. It was the first we publicly announced. Some folks even registered their tokens on it — sorry guys, you should have really used them.

Zeta survived extortion by Steven's watchtower and Evgenii's performance tests.

One minute, Zeta was the warm center that the life of LeapDAO crowded around, and the next moment, it was a pile of code. After Pinkiebell's spending condition shot, the amazing miracle of consensus failure manifested.

## What had happened before

Few days before Kosta had launched a second validator on the network. One validator was running leap-node 4.1.0 while the other validator was running leap-node 4.1.1 being different in these [few lines](https://github.com/leapdao/leap-node/commit/f38cfa0fd2d552942d0927832c53b50e79d36789) that seemed not consensus critical. 

On the given day Pinkiebell tested [Spending Condition](https://www.youtube.com/watch?v=cB5T0buF8GI) transactions which caused this little error in the second validator:
<br><br>

```
2019-03-14T09:18:17.212Z leap-node:error Cannot read property 'forEach' of undefined
```

Spending conditions use a mapping from colors to addresses to run contracts and the mapping has been different in the two validators. The first validator accepted the spending condition as valid and included it in the block. When the second validator tried to verify the block the mapping was undefined, leading to rejecting the block.
<br><br>

```
2019-03-14T09:18:36.159Z tendermint I[14036-03-14|09:18:36.159] Executed block
module=state height=57001 validTxs=1 invalidTxs=1

2019-03-14T09:18:36.162Z leap-node Height: 57002, epoch: 890, epochLength: 2
2019-03-14T09:18:36.211Z tendermint I[14036-03-14|09:18:36.211] Committed state
module=state height=57001 txs=2 appHash=114D7401A65959935AD6BC46E9B9C6EE0B78BA0558651636E385508FF7524E93
```

Various attempts to revive the network stayed without success. 😭 Don't despair, stay tuned for "testnet Eta".
