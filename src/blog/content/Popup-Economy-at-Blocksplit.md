---
template: post.html
title: 'Burner wallet driving Blocksplit'
date: 2019-05-02 10:50:00
author:
  - name: '@johba'
    twitter: 'johba'
description: The first pop-up economy powered by Plasma!
---

The first pop-up economy powered by Plasma!

<img src="/img/blog/blocksplit.jpg" alt="Blocksplit Croatia">

## Burner Wallet on Leap Network
The Burner wallet works in any mobile web browser so no app download or wallet setup are required. It was first used on during ETHDenver conference and had big success. What is new for the [SunDAI instance](https://sundai.io) instance created for BlockSplit conference is Plasma support. It is running on the [Leap Network](https://mainnet.leapdao.org), a Plasma chain created by the [LeapDAO community](https://leapdao.org) and providing block times of 2-4 seconds. SunDAI is pegged to the dollar so there is low cognitive overhead. The best part is on-boarding is as easy as opening your camera.

## User Flow 

The Blocksplit conference ran over 2 days on April 25 to 26 and hosted ~150 participants in the beautiful town of Split, Croatia. Attendees received a paper wallet at registration with an amount of SunDAI according to their ticket type. 

<img src="/img/blog/bsUser1.jpg" alt="Paper Wallets">

This Paper Wallet had an Ethereum private key in the form of a QR code inside. An attendee could pull out their phone’s camera and point it at the QR to spawn a wallet.

<img src="/img/blog/bsUser3.jpg" alt="Paper Wallets">

The scan does both, load the wallet website and import the key that is pre-loaded with some amount of tokens. For the user this means that hurdles like app download and securing seed phrases are not needed and the on-boarding into crypto is instant.

<img src="/img/blog/bsUser5.jpg" alt="On and Offboarding">

From there the attendees could approach the different vendors, scan a QR code and pay. The payment arrived seconds later and could be verified by the vendors on the tablets. 

<img src="/img/blog/bsMerchant.jpg" alt=" Merchant flow">

In case of running or of SunDAI, attendees could also recharge their wallets with DAI or Ether by using the exchange view. The SunDAI contract was set up in a way that it would pull DAI in as a collateral to mint new SunDAI, and users that had topped up with DAI where also whitelisted to offboard SunDAI into DAI.
<br>
<br>

```
     +------+         +--------+       +--------+
     |  DAI |         | sunDAI |       | Bridge |
     +---+--+         +----+---+       +----+---+
         |                 |                |
         |                 | transferFrom   |
         |  transferFrom   | <------------- |
         | <-------------  |                |
         |                 | mint           |
         | ------------->  | ---+           |
         |                 |    |           |
         |                 | <--+           |
         |                 |                |
         |                 |  transfer      |
         |                 | ------------>  |
         |                 |                |
  ```

If attendees did not bring any of their own crypto then [Bitcoin Store](https://www.bitcoin-store.hr/) provided a fiat exchange right at the event. 

## Merchant Stats

There were 3 types of merchants at the event achieving the following results:

- Coffee and Bites merchants have been serving conference visitors in a buffet style on both days of the conference. They did 192 transactions collecting 466 SunDAI.
- On the first day there was a beach party where drinks have been sold. The merchants collected 697 SunDAI in 268 transactions.
- The beach party also featured food and the food merchant cached in 511 SunDAI in 93 transactions.

<img src="/img/blog/bsParty.jpg" alt=" Merchant flow">

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Using <a href="https://twitter.com/leapdao?ref_src=twsrc%5Etfw">@leapdao</a> <a href="https://twitter.com/hashtag/plasma?src=hash&amp;ref_src=twsrc%5Etfw">#plasma</a> on <a href="https://twitter.com/ethereum?ref_src=twsrc%5Etfw">@ethereum</a> to buy booze at <a href="https://twitter.com/blocksplit?ref_src=twsrc%5Etfw">@blocksplit</a> right now. Works like a charm. Thanks for the inspiration <a href="https://twitter.com/austingriffith?ref_src=twsrc%5Etfw">@austingriffith</a> ❤️ <a href="https://t.co/mFJOQw0G3W">pic.twitter.com/mFJOQw0G3W</a></p>&mdash; Bruno Skvorc (@bitfalls) <a href="https://twitter.com/bitfalls/status/1121489973193134080?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Off-boarding in the Plasma design takes inconvenient 3,5 to 7 days. To keep merchants and users happy we operated a [Fast Exit Market Maker](https://github.com/leapdao/exit-market-maker) throughout the event. This marker maker would buy pending exits from users and pay them out immediately.

## Issues

Transaction flow on the Leap Network side during the event went smoothly still some issues were identified where improvements can be done:
 - Network (Internet connection) requirements are pretty high. A lot of user paying for goods at the same time on the same WiFi network generate quite high load resulting in bad connection and delays sending transactions and getting response and sometimes the need to reload the wallet.
 - Also active wallet usage generates quite high traffic as the wallet reloads a lot of its parts. To improve it, wallets needs to be lighten up and reload only necessary minimum of it's elements during and after sending the transaction.
 - Browser support should be improved as some browser/OS combinations didn't work as well as others. The biggest issue here was QR code scanning and camera access issues within browser.

## Summary

In **total 1135 SunDAI transfers** have been made during the 2 days of the conference. In this time the Plasma chain has submitted 106 anchors to the Ethereum mainnet paying a **total of USD 7.23 in transaction fees**. The fees per transaction should go even lower with higher load as more transactions will be included in each block.


We want to thank Antea, Lorena and Luka, our enthusiastic volunteers helping with the burner Wallet as well as to Tomo and Bruno for inviting us to the event and giving us the opportunity demo the tech.

<img src="/img/blog/bsVolunteers.jpg" alt="Volunteers">
