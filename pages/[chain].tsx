import Head from 'next/head'
import dynamic from 'next/dynamic'
import { CHAINS_CONFIG } from "lib/constants";
import { CHAINS, ChainType } from 'types/types';
import { ComponentType } from 'react'

type StaticPropsT = {
    params : { chain : CHAINS }
}
export async function getStaticProps({ params }: StaticPropsT) {
    const chainId = params.chain;
    const chainConfig = CHAINS_CONFIG[chainId]
    return {
        props: {
            chainConfig,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: Object.values(CHAINS_CONFIG).map((chain) => { return { params: { chain: chain.id } } } ),
        fallback: false
  };
}

type DynChainT = ComponentType<{chain: ChainType}>

type ChainT = {
    chainConfig: ChainType
}
export default function Chain({ chainConfig }: ChainT) {
    const chainLabel = chainConfig.label;
    const chainId = chainConfig.id;
    
    const DynChain:  DynChainT = (() => {
        if (chainId === CHAINS.AVALANCHE)
            return dynamic(() => import('../components/protocols/avalanche'));
        if (chainId === CHAINS.CELO)
            return dynamic(() => import('../components/protocols/celo'));
        if (chainId === CHAINS.NEAR)
            return dynamic(() => import('../components/protocols/near'));
        if (chainId === CHAINS.POLKADOT)
            return dynamic(() => import('../components/protocols/polkadot'));
        if (chainId === CHAINS.POLYGON)
            return dynamic(() => import('../components/protocols/polygon'));
        if (chainId === CHAINS.SECRET)
            return dynamic(() => import('../components/protocols/secret'));
        if (chainId === CHAINS.SOLANA)
            return dynamic(() => import('../components/protocols/solana'));
        if (chainId === CHAINS.TEZOS)
            return dynamic(() => import('../components/protocols/tezos'));
        
        return dynamic(() => import('../components/protocols/the_graph'));
    })();

    return (
        <>
            <Head>
                <title>{`Figment Learn - ${chainLabel} Pathway`}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DynChain chain={ chainConfig }/>
        </>
    )
}