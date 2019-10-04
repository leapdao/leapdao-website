---
template: post.html
title: 'Introducing the Prime Casino'
date: 2019-10-04 16:40:00
emoji: ℧
image: /img/blog/primality.png
author:
 name: '@johba'
 twitter: '@johba'
description: The Prime Casino demonstrates the ability of the EVM Enforcer to exceed Ethereum limits.
---

The Prime Casino demonstrates the ability of the EVM Enforcer to exceed Ethereum limits.

Large prime numbers play an important role in cryptography. Specifically the difficulty of factorization of large numbers enables RSA and other algorithms. Some contract in the Ethereum ecosystem also depend on primality tests like RSA accumulators and [special Plasma Cash proofs](https://ethresear.ch/t/log-coins-sized-proofs-of-inclusion-and-exclusion-for-rsa-accumulators/3839).

How can you verify that a large number is prime on chain? Known algorithms can be converted to Solidity code. The following have already been realized:
- [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
- [Miller Rabin Test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)

Yet, the block gas limit of Ethereum hinders one to check primes that exceed a few dozen digits, like the 6th Bell prime or the 4th Repunit prime. In the light of these limitations large primes can not be verified on chain, and algorithms relying on verified primes remain infeasible.

## EVM-Enforcer to the rescue

The EVM Enforcer is a computation verification engine that allows on-chain enforcement of off-chain EVM execution. That means, whatever result you can compute in an EVM off-chain, you can prove to be correct to an on-chain contract. This setup allows to build computation markets that incentivise participants to rent out their computation power and check on each other through stakes. In addition it allows to exceed the known levels of gasLimit, contract size, and msg Data, as the next diagram indicates:

<img src="/img/blog/enforcer.png" alt="EVM Enforcer roadmap in 3 steps">

## The Prime Casino

The Prime Casino demonstrates the ability of the Enforcer to exceed the limits imposed on execution length by the Ethereum mainnet. Numbers so large that their primality test would exceed block gas limit under the Miller Rabbin algorithm can be computed.

The Prime Casino user can bet on whether a number is probably prime or not under the Miller-Rabin test. A bet takes 0.1 ETH. The user can either propose a new probably prime or stake yes/no on an existing one.

Note that the Prime Casino is simply a demonstration of the EVM Enforcer’s ability, and not a real casino. The input is limited to numbers smaller than 2^256, and hence it can only be a geek pastime to bet on properties of numbers which your could look up in a book.

## The Real Thing!

<img src="/img/blog/primality.png" alt="Prime Casino">

To show you this idea in action, we’ve deployed all the necessary contracts to Görli Testnet. We also running 2 Solvers on Amazon servers, which will wait for computation request and check whether number you provided is prime. You can try it here:

**[https://primality.leapdao.org/](https://primality.leapdao.org/)**

The presented solution is open source and it's code can be found [here](https://github.com/leapdao/prime-casino-contracts) and [here](https://github.com/leapdao/prime-casino-frontend).


If you are interested in what we are doing, join the conversation on our [Slack](http://join.leapdao.org) or follow us on [Twitter](https://twitter.com/leapdao). LeapDAO is a very small independent team incubated by [Status.im](https://incubate.status.im/projects/) and running on the Ethereum Foundation grant. We are looking for active people to join our core research and development.
