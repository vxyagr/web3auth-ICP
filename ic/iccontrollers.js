//This is a component for Loka next js app to connect to smart contract / canister on ICP, by creating "Actor"
//this component should only be accessed once user have connected their ICP wallet and have ICP wallet address
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./candid/controllers.did.js";
export { idlFactory } from "./candid/controllers.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 * export const canisterId =
  process.env.CANISTER_ID_HELLO || process.env.HELLO_CANISTER_ID;
 */

export const createActor = (canisterId, options = {}) => {
  // const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  var args = {};
  args["host"] = "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/"; //canister deploy location on ICP - ask canister developer for this
  console.log("making sure identity is not null " + options.identity);
  //args["host"] = "http://192.168.1.8:8000/"; //canister deploy location on ICP - ask canister developer for this
  args["identity"] = options.identity;

  // Fetch root key for certificate validation during development

  /*

   const agentOptions: HttpAgentOptions = {
                    host: "https://" + puppyCanisterId + ".raw.ic0.app/",
                    identity: this.identity,
                };

                const agent = new HttpAgent(agentOptions);

                const puppyCanisterActor = Actor.createActor<PuppyCanisterApi>(idlPuppy, {
                    agent,
                    canisterId: puppyCanisterId,
                });

  */
  const agent = new HttpAgent(args);
  //af353-wyaaa-aaaak-qcmtq-cai
  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const icLoka = createActor("b77ix-eeaaa-aaaaa-qaada-cai"); //parameter is Loka canister ID - ask canister developer for this
