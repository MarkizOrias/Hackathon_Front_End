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
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
                            {
                                goerliBalance &&
                                <div>
                                    <div className="bal">Connected wallet:<br />
                                        {account.substring(0, 8)}...{account.substring(account.length - 4)}
                                        <br /><br />Goerli Balance:<br />
                                        {Math.round(utils.formatEther(goerliBalance) * 1e5) / 1e5 + " ETH"}

                                    </div>
                                </div>
                            }
                            <br />
                            {
                                mainnetBalance &&
                                <div>
                                    <div className="bal">Mainnet Balance:<br />
                                        {Math.round(utils.formatEther(mainnetBalance) * 1e5) / 1e5 + " ETH"}<br /><br />
                                        Balance:<br />
                                        {account}
                                    </div>
                                </div>
                            }
                        </div>
                        <br />


                        <button onClick={deactivate} className="button">
                            Disconnect
                        </button>
                        <br />

                    </div>
                    : <p>
                        Please connect your wallet. <br /><br />
                        <button
                            onClick={() => activateBrowserWallet()}
                            type="action"
                            className="button"
                        >
                            Connect Wallet
                        </button>
                    </p>
            }


        </div >
    )
}

export default Wallet