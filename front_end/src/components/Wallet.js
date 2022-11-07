import React from 'react'
import { useEthers, useEtherBalance, Goerli, Mainnet } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { utils } from "ethers"



const Wallet = () => {

    const { activateBrowserWallet, account, deactivate } = useEthers()
    const goerliBalance = useEtherBalance(account, { chainId: Goerli.chainId })
    const mainnetBalance = useEtherBalance(account, { chainId: Mainnet.chainId })

    return (
        <div style={{ justifyContent: 'center' }}>
            {
                account
                    ?
                    <div>
                        {/* Display wallet balance */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px 20px' }}>
                            {
                                goerliBalance &&
                                <div>
                                    <div class="bal">Goerli Balance:<br />
                                        {Math.round(utils.formatEther(goerliBalance) * 1e5) / 1e5 + " ETH"}<br /><br />
                                        Address:<br />
                                        {account}
                                    </div>
                                </div>
                            }
                            <br />
                            {
                                mainnetBalance &&
                                <div>
                                    <div class="bal">Mainnet Balance:<br />
                                        {Math.round(utils.formatEther(mainnetBalance) * 1e5) / 1e5 + " ETH"}<br /><br />
                                        Balance:<br />
                                        {account}
                                    </div>
                                </div>
                            }
                        </div>
                        <br />


                        <button onClick={deactivate} class="button">
                            Disconnect
                        </button>
                        <br />

                    </div>
                    : <p>
                        <div>
                            Please connect your wallet. </div><br />
                        <button
                            onClick={() => activateBrowserWallet()}
                            type="action"
                            class="button"
                        >
                            Connect Wallet
                        </button>
                    </p>
            }


        </div >
    )
}

export default Wallet