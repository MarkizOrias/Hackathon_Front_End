import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

// Inputs For AddCertificate Function:
var first = document.getElementById("fileInput")
var second = document.getElementById("titleInput")
var third = document.getElementById("nameInput")
var fourth = document.getElementById("coAuthorInput")

// Inputs For TransferOnwership Function:
const transferTo = document.getElementById("reciInput")
const transferWhat = document.getElementById("cprAddInput")

// Inputs For Fuction Buttons:
const disconnectButton = document.getElementById("disconnectButton")
disconnectButton.onclick = disconnectAndHideBalance
const connectButton = document.getElementById("connectButton")
connectButton.onclick = connectAndDisplayBalance
const storeButton = document.getElementById("storeButton")
storeButton.onclick = errStoreHash
const checkCertsBtn = document.getElementById("checkCertsBtn")
checkCertsBtn.onclick = checkCerts
const hideCertsBtn = document.getElementById("hideCertsBtn")
hideCertsBtn.onclick = hideListBtn
const chngOwnBtn = document.getElementById("chngOwnBtn")
chngOwnBtn.onclick = changeOwnership

// Inputs For Status changes:
const firstMessage = document.getElementById("firstMessage")
const stateOne = document.getElementById("stateOne")
const stateTwo = document.getElementById("stateTwo")
const stateMidOne = document.getElementById("stateMidOne")
const stateMidTwo = document.getElementById("stateMidTwo")
const addWall = document.getElementById("addWall")
const balWall = document.getElementById("balWall")
const listWall = document.getElementById("listWall")

function disconnectAndHideBalance() {
  stateTwo.style.display = "none"
  stateOne.style.display = "block"
}

function hideListBtn() {
  stateMidTwo.style.display = "none"
  stateMidOne.style.display = "block"
  listWall.innerHTML = "" //overflow eliminated
}

async function connectAndDisplayBalance() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }

    stateOne.style.display = "none"
    connectButton.innerHTML = "Show Balance"
    firstMessage.innerHTML = "You're Connected"

    const accounts = await ethereum.request({ method: "eth_accounts" })
    const acc = accounts.toString()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(acc)
    const balanceInEth = ethers.utils.formatEther(balance);
    const accAbb = acc.substring(0, 8) + "..." + acc.substring(acc.length - 4)
    const balanceAbb = Math.round(balanceInEth * 1e5) / 1e5 + " ETH"

    addWall.innerHTML = accAbb
    balWall.innerHTML = balanceAbb

    stateTwo.style.display = "block"

    if (stateMidTwo.style.display == "none") {
      stateMidOne.style.display = "block"
    }

  } else {
    firstMessage.innerHTML = "Please install MetaMask and reload this page"

  }
}

async function addCert(res) {

  console.log(`Adding Certificate...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signer_address = signer.getAddress(this)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const nonce = await provider.getTransactionCount(contractAddress)
    const anticipatedAddress = ethers.utils.getContractAddress({ from: contractAddress, nonce })
    const fee = await contract.getMinimumFee()
    const buffored_fee = fee * 1 + 1000
    const ethAmount = (buffored_fee / 10 ** 18).toString()
    const d = new Date()
    let date = d.toString()
    try {
      const transactionResponse = await contract.addCertificate(anticipatedAddress, date, second.value, signer_address, third.value, fourth.value, res, {
        value: ethers.utils.parseEther(ethAmount)
      })
      await listenForTransactionMine(transactionResponse, provider)

    } catch (error) {
      console.log(error)
    }
  } else {
    addButton.innerHTML = "Please install MetaMask"
  }
}

async function checkCerts() {
  console.log(`Checking Certificates...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signer_address = signer.getAddress(this)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {

      const result = await contract.getCertificatesYouOwn(signer_address)
      stateMidOne.style.display = "none"
      stateMidTwo.style.display = "block"
      if (result.length == 0) {
        listWall.innerHTML = "Your address has no copyrights yet"
      } else {
        for (let i = 0; i < result.length; i++) {
          listWall.innerHTML += result[i] + "<br>"
        }
      }


    } catch (error) {
      console.log(error)
    }
  } else {
    checkCertsBtn.innerHTML = "Please install MetaMask"
  }
}

async function tranOwnership() {
  console.log(`Transferring Ownership...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signer_address = signer.getAddress(this)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const fee = await contract.getMinimumFee()
    const buffored_fee = fee * 1 + 1000
    const ethAmount = (buffored_fee / 10 ** 18).toString()
    try {
      const transactionResponse = await contract.transOwnership(signer_address, transferTo.value, transferWhat.value, {
        value: ethers.utils.parseEther(ethAmount)
      })
      await listenForTransactionMine(transactionResponse, provider)

    } catch (error) {
      console.log(error)
    }
  } else {
    chngOwnBtn.innerHTML = "Please install MetaMask"
  }
}

// Hashing Functions
async function process() {

  getHASH(
    first.files[0],
  ).then(
    res => addCert(res),
    err => breakCode(err)
  )

}

async function readChunked(file, chunkCallback, endCallback) {

  var fileSize = file.size
  var chunkSize = 4 * 1024 * 1024 // 4MB
  var offset = 0

  var reader = new FileReader()

  reader.onload = function () {
    if (reader.error) {
      endCallback(reader.error || {})
      return
    }
    offset += reader.result.length
    chunkCallback(reader.result, offset, fileSize)
    if (offset >= fileSize) {
      endCallback(null)
      return
    }
    readNext()
  }

  reader.onerror = function (err) {
    endCallback(err || {})
  }

  function readNext() {
    var fileSlice = file.slice(offset, offset + chunkSize)
    reader.readAsBinaryString(fileSlice)
  }
  readNext()
}

async function getHASH(blob, cbProgress) {

  return new Promise((resolve, reject) => {

    var the_hash = CryptoJS.algo.SHA256.create()

    readChunked(blob, (chunk, offs, total) => {
      the_hash.update(CryptoJS.enc.Latin1.parse(chunk))
      if (cbProgress) {
        cbProgress(offs / total)
      }
    }, err => {
      if (err) {
        reject(err)
      } else {

        var hash = the_hash.finalize()
        var hashHex = hash.toString(CryptoJS.enc.Hex)
        resolve(hashHex)
      }
    })

  })
}

async function errStoreHash() {

  if (!first.files.length) {
    alert('You must select a file to certify first!')
  } else if (second.value.trim().length == 0 || third.value.trim().length == 0) {
    alert('You must fill all required fields below!')
  } else {
    process()
    addCert()
  }
}


async function changeOwnership() {
  if (transferWhat.value.trim().length == 0 || transferTo.value.trim().length == 0) {
    alert('You must fill all required fields below!')
  } else if (ethers.utils.isAddress(transferWhat.value) == false || ethers.utils.isAddress(transferTo.value) == false) {
    alert('You must provide address in a valid format!')
  } else {
    tranOwnership()
  }
}
