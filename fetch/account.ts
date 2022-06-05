import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import { Account } from '../generated/schema';

import { integer } from '@protofire/subgraph-toolkit';

export function fetchAccount(address: Address): Account {
  let account = Account.load(address);
  if (account == null) {
    account = new Account(address);
    account.totalArtTransactions = integer.ZERO;
    account.save();
  }
  return account;
}
