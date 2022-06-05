import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import { Account } from '../generated/schema';

import { integer } from '@protofire/subgraph-toolkit';

import getCategory from './categories';

export function fetchAccount(address: Address, category: string): Account {
  let account = Account.load(address);
  if (account == null) {
    account = new Account(address);
    account.totalTransactions = integer.ONE;
    if(category === "art"){
      account.totalArtTransactions = integer.ONE
    }
    account.save();
  }
  return account;
}
