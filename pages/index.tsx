import React, { useState } from "react";
import { login } from "../components/web3auth";
import OpenLogin from "@toruslabs/openlogin";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { fromHexString } from "@dfinity/candid/lib/cjs/utils/buffer";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import { createActor } from "../ic/icloka";

var openlogin: any = false;
const Home = () => {
  const [address, setAddress] = useState("");
  var identities: any = {};

  const processId = (id: any, type: any) => {
    var p = id.getPrincipal().toString();
    identities[p] = id;
    return {
      principal: p,
      type: type,
    };
  };
  //var _iisessionInterval = false;
  const oauths = ["google", "twitter", "facebook", "github"];
  const loadOpenLogin = async () => {
    if (!openlogin) {
      openlogin = new OpenLogin({
        clientId:
          "BHGs7-pkZO-KlT_BE6uMGsER2N1PC4-ERfU_c7BKN1szvtUaYFBwZMC2cwk53yIOLhdpaOFz4C55v_NounQBOfU",
        network: "mainnet",
        uxMode: "popup",
      });
    }
    await openlogin.init();
    console.log("open login " + openlogin);
    return openlogin;
  };

  const generatePrivateKey = async () => {
    const openlogin = await loadOpenLogin();
    if (openlogin.privKey) {
      await openlogin.logout();
    }
    await openlogin.login({
      loginProvider: "google",
    });
    var id_ = openlogin.privKey;
    //var id = Ed25519KeyIdentity.generate(new Uint8Array(fromHexString(id_)));
    var iden_ = Secp256k1KeyIdentity.fromSecretKey(fromHexString(id_));
    //const agent = new HttpAgent({host: getHost(), identity});

    var options: any = {};
    options["identity"] = iden_;
    var loka_ = createActor("ilah7-qqaaa-aaaam-abzyq-cai", options);

    var res: any = processId(iden_, "google");
    const verified_ = await loka_.whoCall();
    console.log("whocall_ " + JSON.stringify(verified_));
    console.log("iden_ " + JSON.stringify(iden_));
    console.log("result " + JSON.stringify(res));
    return res;
  };

  /* const handleLogin = async () => {
    try {
      console.log("hadling login ");
      const userAddress = await login();
      setAddress(userAddress);
      console.log("connected ");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }; */

  return (
    <div>
      <button onClick={generatePrivateKey}>Login with Web3Auth</button>
    </div>
  );
};

export default Home;
