// Importando as dependências necessárias
const bip32 = require('bip32');          // Para derivação de chaves hierárquicas (HD)
const bip39 = require('bip39');          // Para geração de mnemônicos (palavras de senha)
const bitcoin = require('bitcoinjs-lib'); // Biblioteca para operações com Bitcoin
const { testnet } = require('bitcoinjs-lib/src/networks'); // Rede de teste do Bitcoin

// Definindo a rede como testnet (rede de testes do Bitcoin)
const network = bitcoin.networks.testnet;

// Definindo o caminho de derivação da carteira HD (Hierarchical Deterministic)
const path = `m/49'/1'/0'/0`;

// Gerando um mnemônico (palavras de senha) aleatório
let mnemonic = bip39.generateMnemonic();

// Convertendo o mnemônico em uma seed (semente) para gerar a carteira HD
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD a partir da seed e da rede especificada
let root = bip32.fromSeed(seed, network);

// Derivando uma conta específica da raiz da carteira HD
let account = root.derivePath(path);

// Derivando um nó específico da conta para obter as chaves públicas e privadas
let node = account.derive(0).derive(0);

// Criando um endereço Bitcoin a partir da chave pública do nó e da rede especificada
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

// Exibindo informações da carteira gerada no console
console.log("Carteira gerada!");
console.log("Endereço: ", btcAddress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:", mnemonic);