import { Address } from '@graphprotocol/graph-ts';

const artContracts: string[] = ["0x96dC73c8B5969608C77375F085949744b5177660","0x89AC334A1C882217916CB90f2A45cBA88cE35a52", "0x85A19dd2aD0d1d2b25Bb164810FaD08cdc0B33d7","0xd21818B6052dF69EEd04E9b2aF564b75140aAcb7"]
const musicContracts: string[] = ["0xA0E1B198bCC877a950A29512ab5C0CE1Bb964c97","0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff","0x52E66cA968010d064938A8099a172CBAaf08c125","0x647037de761696d224333778e69082ce3b742242", "0xcBC67Ea382F8a006d46EEEb7255876BeB7d7f14d"]
const photographyContracts: string[] = ["0xcf571b149736f4476A4A47813951fD074846DB1C","0xA95cCcbCA85D4bB99549ec09E3D83cE1E88988aE", "0x0fAED6DDeF3773f3Ee5828383AAeEaCA2a94564a","0xcb1021080B61Dac7032618De925a62176cBC8372", "0xE6501d00DDCa2AB22c655C612e73Ed822D9256a2"]

const getCategory = (contractAddress: Address): string => {
    let category: string;
    
    for(let i = 0; i < artContracts.length; i++){
        if (artContracts[i] === contractAddress.toString()){
            category = "art"
        }
    }

    // for(let i = 0; i < musicContracts.length; i++){
    //     if (musicContracts[i] === contractAddress.toString()){
    //         category = "music"
    //     }
    // }

    // for(let i = 0; i < photographyContracts.length; i++){
    //     if (photographyContracts[i] === contractAddress.toString()){
    //         category = "photography"
    //     }
    // }

    return category;
}

export default getCategory