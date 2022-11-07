import React from 'react'
import { useEthers, useEtherBalance, Goerli, Mainnet } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { utils } from "ethers"


const changeBackground = e => {
    e.target.style.background = 'lightbrown';
}
const resetBackground = e => {
    e.target.style.background = 'darkbrown';
}


const Wallet = () => {

    const { activateBrowserWallet, account, deactivate } = useEthers()
    const goerliBalance = useEtherBalance(account, { chainId: Goerli.chainId })
    const mainnetBalance = useEtherBalance(account, { chainId: Mainnet.chainId })

    return (
        <div>
            <h3>
                Wallet
            </h3>
            {
                account
                    ?
                    <div>
                        <div>
                            {
                                account
                            }
                        </div>
                        <br />
                        <button onClick={deactivate} className="btn" onMouseOver={changeBackground} onMouseOut={resetBackground}>
                            Disconnect
                        </button>
                        <hr />
                        {/* Display wallet balance */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px 20px' }}>
                            {
                                goerliBalance &&
                                <div className="bal">
                                    <h4>Goerli Balance</h4>
                                    {Math.round(utils.formatEther(goerliBalance) * 1e5) / 1e5 + " ETH"}
                                </div>
                            }
                            {
                                mainnetBalance &&
                                <div className="bal">
                                    <h4>Mainnet Balance</h4>
                                    {Math.round(utils.formatEther(mainnetBalance) * 1e5) / 1e5 + " ETH"}
                                </div>
                            }
                        </div>
                    </div>
                    : <p>
                        <div>
                            Please connect your wallet. </div><br />
                        <button
                            onClick={() => activateBrowserWallet()}
                            className="btn"
                            onMouseOver={changeBackground}
                            onMouseOut={resetBackground}
                        >
                            Connect Wallet
                        </button>
                    </p>
            }


        </div>
    )
}

export default Wallet