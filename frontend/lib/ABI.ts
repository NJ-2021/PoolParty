export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];



export const POOL_MODIFY_LIQUIDITY_ABI = [
  {
    "type": "constructor",
    "inputs":
      [
        {
          "name": "_manager",
          "type": "address",
          "internalType": "contract IPoolManager"
        }
      ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "manager",
    "inputs":
      [],
    "outputs":
      [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IPoolManager"
        }
      ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "modifyLiquidity",
    "inputs":
      [
        {
          "name": "key",
          "type": "tuple",
          "internalType": "struct PoolKey",
          "components":
            [
              {
                "name": "currency0",
                "type": "address",
                "internalType": "Currency"
              },
              {
                "name": "currency1",
                "type": "address",
                "internalType": "Currency"
              },
              {
                "name": "fee",
                "type": "uint24",
                "internalType": "uint24"
              },
              {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "hooks",
                "type": "address",
                "internalType": "contract IHooks"
              }
            ]
        },
        {
          "name": "params",
          "type": "tuple",
          "internalType": "struct IPoolManager.ModifyLiquidityParams",
          "components":
            [
              {
                "name": "tickLower",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "tickUpper",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "liquidityDelta",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
              }
            ]
        },
        {
          "name": "hookData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "settleUsingBurn",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "takeClaims",
          "type": "bool",
          "internalType": "bool"
        }
      ],
    "outputs":
      [
        {
          "name": "delta",
          "type": "int256",
          "internalType": "BalanceDelta"
        }
      ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "modifyLiquidity",
    "inputs":
      [
        {
          "name": "key",
          "type": "tuple",
          "internalType": "struct PoolKey",
          "components":
            [
              {
                "name": "currency0",
                "type": "address",
                "internalType": "Currency"
              },
              {
                "name": "currency1",
                "type": "address",
                "internalType": "Currency"
              },
              {
                "name": "fee",
                "type": "uint24",
                "internalType": "uint24"
              },
              {
                "name": "tickSpacing",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "hooks",
                "type": "address",
                "internalType": "contract IHooks"
              }
            ]
        },
        {
          "name": "params",
          "type": "tuple",
          "internalType": "struct IPoolManager.ModifyLiquidityParams",
          "components":
            [
              {
                "name": "tickLower",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "tickUpper",
                "type": "int24",
                "internalType": "int24"
              },
              {
                "name": "liquidityDelta",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
              }
            ]
        },
        {
          "name": "hookData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
    "outputs":
      [
        {
          "name": "delta",
          "type": "int256",
          "internalType": "BalanceDelta"
        }
      ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "unlockCallback",
    "inputs":
      [
        {
          "name": "rawData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
    "outputs":
      [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
    "stateMutability": "nonpayable"
  }
] 