require('dotenv').config();
const {
  BattleRoyale,
  BattleRoyaleArena
} = require('./contracts');
const {
  NFT_ADDRESS,
  ETHERSCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS,
  BASIC_NFT_META_DATA,
  UPGRADE_NFT_META_DATA,
  ARENA_CONTRACT_ADDRESS
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

async function main() {
  try {
    const b = new BattleRoyaleArena({
      address: ARENA_CONTRACT_ADDRESS,
      mnemonic: MNEMONIC,
      etherscanKey: ETHERSCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    console.log(`Removing access`);

    const a = '0x75b610a8Cf14a481D25FeC0C929B419BF8aC6862';

    console.log(`removing access to: ${a}`);
    await b.revokeAccessRole(a);

    console.log('Access removal complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
