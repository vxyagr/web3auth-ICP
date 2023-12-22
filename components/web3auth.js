import { Web3Auth } from "@web3auth/web3auth";
import { ethers } from "ethers";

const clientId =
  "BHYpHR-dDHSEQpVupjVrDptuj_SJFebo1MDmAToSAje9Zz2RCmJDnQxyq1lGwlMNw5t2itetDGvpca4VIp4Py7A"; // Replace with your actual Client ID

const web3auth = new Web3Auth({
  clientId,
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1", // Mainnet; change as needed
  },
});

export const login = async () => {
  await web3auth.connect();
  const provider = web3auth.getProvider();
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  return await signer.getAddress();
};

export default web3auth;
