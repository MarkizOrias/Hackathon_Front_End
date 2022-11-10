import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

var first = document.getElementById("fileInput")
var second = document.getElementById("titleInput")
var third = document.getElementById("nameInput")
var fourth = document.getElementById("coAuthorInput")


const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect
const pryntButton = document.getElementById("pryntButton")
pryntButton.onclick = checkCerts
const storeButton = document.getElementById("storeButton")
storeButton.onclick = errGetHash


async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function prynt() {
  pryntButton.innerHTML = "prynt"
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const signer_address = signer.getAddress(this)
  const contract = new ethers.Contract(contractAddress, abi, signer)
  const fee = contract.getMinimumFee()
  const f = fee.toString()
  console.log(fee)
}

async function addCert(res) {

  //const contract.address
  const d = new Date()
  const ethAmount = "0.05"
  let date = d.toString()

  console.log(`Adding Certificate...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signer_address = signer.getAddress(this)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const nonce = await provider.getTransactionCount(contractAddress)
    const anticipatedAddress = ethers.utils.getContractAddress({ from: contractAddress, nonce })
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
      const out = contract.getCertificatesYouOwn(signer_address)
      console.log(out)
    } catch (error) {
      console.log(error)
    }
  } else {
    addButton.innerHTML = "Please install MetaMask"
  }
}

async function transferOwnership() {

  input1 = x
  input2 = y

  //const ethAmount = "0.05"

  console.log(`Transferring Ownership...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signer_address = signer.getAddress(this)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const fee = contract.getMinimumFee()
    try {
      const transactionResponse = await contract.transferOwnership(signer_address, input1, input2, {
        value: ethers.utils.parseEther(fee)
      })
      await listenForTransactionMine(transactionResponse, provider)
    } catch (error) {
      console.log(error)
    }
  } else {
    addButton.innerHTML = "Please install MetaMask"
  }
}


async function test() {
  console.log(second.value)

}

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

async function errGetHash() {

  if (!first.files.length) {
    alert('You must select a file to certify first!')
  } else if (second.value.trim().length == 0 || third.value.trim().length == 0) {
    alert('You must fill all required fields below!')
  } else {
    process()
    addCert()
  }
}
