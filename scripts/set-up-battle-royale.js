require('dotenv').config();
const {
  BattleRoyale,
  BattleRoyaleArena
} = require('./contracts');
const {
  NFT_ADDRESS,
  ARENA_CONTRACT_ADDRESS,
  SCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS,
  BASIC_NFT_META_DATA,
  UPGRADE_NFT_META_DATA
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

async function main() {
  try {
    let b = new BattleRoyale({
      address: '0x325d459C8cF30cE480B50944bD656C9ad69aaED4',
      mnemonic: MNEMONIC,
      etherscanKey: SCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    console.log('Setting default token URI...');
    await b.setDefaultTokenURI('bafkreidajh6zgvnmn467gvnn3sw4qf7lxbr5yuubdiwz6vbxlmix5j2u2q');
    console.log('Setting prize token URI...');
    await b.setPrizeTokenURI('bafkreietxrucet4jgkdxumlwqr7qhef6gjcbh4enqpcvspcm27xky7p6xi');

    // let a = new BattleRoyaleArena({
    //   address: ARENA_CONTRACT_ADDRESS,
    //   mnemonic: MNEMONIC,
    //   etherscanKey: ETHERSCAN_API_KEY,
    //   owner: OWNER_ADDRESS,
    //   network: NETWORK,
    //   node: isInfura
    //     ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
    //     : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    // });
    // await a.init();
    //
    // console.log('Adding battle to queue...');
    // await a.addToBattleQueue(NFT_ADDRESS);

    return console.log('Setup complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
