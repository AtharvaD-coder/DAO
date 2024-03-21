/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  Marketplace,
  MarketplaceInterface,
} from "../../contracts/Marketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "available",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405267016345785d8a000060015534801561001c57600080fd5b506104518061002c6000396000f3fe60806040526004361061003f5760003560e01c80634f64b2be1461004457806396e494e81461008157806398d5fdca146100be578063efef39a1146100e9575b600080fd5b34801561005057600080fd5b5061006b6004803603810190610066919061028f565b610105565b60405161007891906102fd565b60405180910390f35b34801561008d57600080fd5b506100a860048036038101906100a3919061028f565b610138565b6040516100b59190610333565b60405180910390f35b3480156100ca57600080fd5b506100d36101b2565b6040516100e0919061035d565b60405180910390f35b61010360048036038101906100fe919061028f565b6101bc565b005b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036101a857600190506101ad565b600090505b919050565b6000600154905090565b6001543414610200576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906103fb565b60405180910390fd5b3360008083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080fd5b6000819050919050565b61026c81610259565b811461027757600080fd5b50565b60008135905061028981610263565b92915050565b6000602082840312156102a5576102a4610254565b5b60006102b38482850161027a565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102e7826102bc565b9050919050565b6102f7816102dc565b82525050565b600060208201905061031260008301846102ee565b92915050565b60008115159050919050565b61032d81610318565b82525050565b60006020820190506103486000830184610324565b92915050565b61035781610259565b82525050565b6000602082019050610372600083018461034e565b92915050565b600082825260208201905092915050565b7f54686520636f7374206f6620746865204e465420697320302e3120657468657260008201527f2100000000000000000000000000000000000000000000000000000000000000602082015250565b60006103e5602183610378565b91506103f082610389565b604082019050919050565b60006020820190508181036000830152610414816103d8565b905091905056fea26469706673582212209b4a9bab0fca1766e654cd9df213dafdbffc2b9e44c33569897a7314e675a48c64736f6c63430008140033";

type MarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Marketplace__factory extends ContractFactory {
  constructor(...args: MarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Marketplace & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Marketplace__factory {
    return super.connect(runner) as Marketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new Interface(_abi) as MarketplaceInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Marketplace {
    return new Contract(address, _abi, runner) as unknown as Marketplace;
  }
}
