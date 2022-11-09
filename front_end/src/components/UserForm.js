import React from "react";
import { useEffect, useState } from "react";
import ProofOfPropCreator from "../chain-info/contracts/ProofOfPropCreator.json";
import { useContractFunction, useEthers } from "@usedapp/core";
import networkMapping from "../chain-info/map.json";
import { utils, constants } from "ethers";
import { Contract } from "@ethersproject/contracts";

const UserForm = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const first = e.target.typeInput1.value;
        const second = e.target.typeInput2.value;
        const third = e.target.typeInput3.value;
        const fourth = e.target.typeInput4.value;

        if (first.length == 0) {
            alert('You must select a file to certify first!');
        } else if (second.length == 0 || third.length == 0) {
            alert('You must fill all required fields below!');
        } else {
            const obj = { _title: second, _name: third, _additional: fourth };
            const myJSON = JSON.stringify(obj);

            localStorage.setItem("testJSON", myJSON); //F12=>Application->Storage->localstorage->testJSON file
        }
    }

    const MyFunction = (e) => {
        const first = e.target.typeInput1.value;
        const second = e.target.typeInput2.value;
        const third = e.target.typeInput3.value;
        const fourth = e.target.typeInput4.value;
        // Getting addCertificate Function
        const { chainId } = useEthers();
        const { abi } = ProofOfPropCreator;
        const POPContractAddress = chainId ? networkMapping[String(chainId)]["ProofOfPropCreator"][0] : constants.AddressZero;
        const POPInterface = new utils.Interface(abi);
        
        const POPContract = new Contract(
            POPContractAddress,
            POPInterface
          )
        
        const { send: addCertificateSend, state: addCertificateState } =
        useContractFunction(POPContract, "addCertificate", {
            transactionName: "Add Certificate",
        })

        useEffect(() => {
            addCertificateSend(POPContractAddress, "22.11.2202", second, "0x50e2a33B9E04e78bF1F1d1F94b0be95Be63C23e7", third, fourth, "hashx0")
        }, [POPContractAddress, "22.11.2202", second, "0x50e2a33B9E04e78bF1F1d1F94b0be95Be63C23e7", third, fourth, "hashx0"])

       
    }

    return (
        <div>
            <img src="logoOTT.png" alt="LogoOTT" width="120" height="120" />
            <br />
            <img src="logoCERTI.png" alt="LogoCERTI" width="379" height="111" />
            <br />
            <label />
            <h2 className="form-check-msg">Store your copyrights on a blockchain in just 5 steps!</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 1 </span>&nbsp;Select the file from your system<span className="red">*</span>< br /><input className="form-control" type="file" id="type-input" name="typeInput1" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 2 </span>&nbsp;Title of your work<span className="red">*</span>< br /><input className="form-control" type="text" id="title-input" name="typeInput2" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 3 </span>&nbsp;Your name<span className="red">*</span><br /><input className="form-control" type="text" id="name-input" name="typeInput3" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 4 </span>&nbsp;Co-author<br /><input className="form-control" type="text" id="co-author-input" name="typeInput4" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 5 </span>&nbsp;Store your copyrights on-chain<br /><button onClick={MyFunction} className="button" id="store-button" name="store-button">Store</button></h3>
            </form>
        </div >
    )
}
export default UserForm