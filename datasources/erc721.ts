import { ERC721Transfer } from '../generated/schema';

import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
} from '../generated/erc721/IERC721';

import { events, transactions } from '@amxx/graphprotocol-utils';

import { fetchAccount } from '../fetch/account';

import {
  fetchERC721,
  fetchERC721Token,
  fetchERC721Operator,
} from '../fetch/erc721';

import { integer } from '@protofire/subgraph-toolkit';

import { Address, BigInt, log } from '@graphprotocol/graph-ts';

export function handleTransfer(event: TransferEvent): void {
  let contract = fetchERC721(event.address);
  if (contract != null) {
    let token = fetchERC721Token(contract, event.params.tokenId);
    let from = fetchAccount(event.params.from);
    let to = fetchAccount(event.params.to);

    let artContracts = ["0x96dC73c8B5969608C77375F085949744b5177660","0x89AC334A1C882217916CB90f2A45cBA88cE35a52", "0x85A19dd2aD0d1d2b25Bb164810FaD08cdc0B33d7","0xd21818B6052dF69EEd04E9b2aF564b75140aAcb7"]
    for (let artIdx = 0; artIdx < artContracts.length; ++artIdx) {
      if (artContracts[artIdx] == contract.id.toString()) {
        let currentFromTotalArt = from.totalArtTransactions;
        if (!currentFromTotalArt) {
          currentFromTotalArt = integer.ZERO;
        }
        from.totalArtTransactions = currentFromTotalArt.plus(BigInt.fromI32(1));
        from.save();

        let currentToTotalArt = to.totalArtTransactions;
        if (!currentToTotalArt) {
          currentToTotalArt = integer.ZERO;
        }
        to.totalArtTransactions = currentToTotalArt.plus(BigInt.fromI32(1));
        to.save();
      }
    }
    
    
    // let collectibleContracts = ["0x1eFf5ed809C994eE2f500F076cEF22Ef3fd9c25D","0xECDD2F733bD20E56865750eBcE33f17Da0bEE461","0xB78f1A96F6359Ef871f594Acb26900e02bFc8D00","0x6CC8e06D647883868f2d3149b0eA0734FD67f3e4", "0xABF66CA534f8A5081303E3873F0f4771c67B7b45","0xDBCab7A768EA9a00B2fFA5A2eB387cAD609E2114"]


    token.owner = to.id;

    contract.save();
    token.save();

    let ev = new ERC721Transfer(events.id(event));
    ev.emitter = contract.id;
    ev.transaction = transactions.log(event).id;
    ev.timestamp = event.block.timestamp;
    ev.contract = contract.id;
    ev.token = token.id;
    ev.from = from.id;
    ev.to = to.id;
    ev.save();
  }
}

export function handleApproval(event: ApprovalEvent): void {
  let contract = fetchERC721(event.address);
  if (contract != null) {
    let token = fetchERC721Token(contract, event.params.tokenId);
    let owner = fetchAccount(event.params.owner);
    let approved = fetchAccount(event.params.approved);

    token.owner = owner.id;
    token.approval = approved.id;

    token.save();
    owner.save();
    approved.save();

    // let ev = new Approval(events.id(event))
    // ev.emitter     = contract.id
    // ev.transaction = transactions.log(event).id
    // ev.timestamp   = event.block.timestamp
    // ev.token       = token.id
    // ev.owner       = owner.id
    // ev.approved    = approved.id
    // ev.save()
  }
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let contract = fetchERC721(event.address);
  if (contract != null) {
    let owner = fetchAccount(event.params.owner);
    let operator = fetchAccount(event.params.operator);
    let delegation = fetchERC721Operator(contract, owner, operator);

    // delegation.approved = event.params.approved

    // delegation.save()

    // 	let ev = new ApprovalForAll(events.id(event))
    // 	ev.emitter     = contract.id
    // 	ev.transaction = transactions.log(event).id
    // 	ev.timestamp   = event.block.timestamp
    // 	ev.delegation  = delegation.id
    // 	ev.owner       = owner.id
    // 	ev.operator    = operator.id
    // 	ev.approved    = event.params.approved
    // 	ev.save()
  }
}
