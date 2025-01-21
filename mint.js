import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";
import secret from './jkkrUCPinGbzRfxKUVqjg1WHsa2kEyZxVf4PXDSGvK4.json';
import JKRC from './JKRChHD51FTpQH1Q8GKNWViq1vWknnNfEYsuHr6KjHX.json';

const umi = createUmi('https://api.devnet.solana.com/'); //원하는 endpoint로 변경, 데브넷, 테스트넷, 메인넷
const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);
const mintKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(JKRC));
const mintSigner = createSignerFromKeypair(umi, mintKeypair);

const metadata = {
    name: "JKRC Coin",
    symbol: "JKRC",
    uri: "https://bafkreico2rt2pdqy57nakinjq4egzyj63w4mu5hixun32nvnim6dzphzmm.ipfs.nftstorage.link",
};

const mint = mintSigner;// generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 51751000_000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
});