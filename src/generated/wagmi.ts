import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DAI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const daiAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

export const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' as const

export const daiConfig = { address: daiAddress, abi: daiAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Migration
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const migrationAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sharesV1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sharesV2',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositedAssets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Migrated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastHolder',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sharesV1', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vaultV1',
    outputs: [
      {
        name: '',
        internalType: 'contract ICoinflakesV1Vault',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vaultV2',
    outputs: [{ name: '', internalType: 'contract IERC4626', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddr', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const migrationAddress =
  '0xBf24F7580c99Aae5A4872639E97C1083Fee70AD7' as const

export const migrationConfig = {
  address: migrationAddress,
  abi: migrationAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OldVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oldVaultAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ChangeManager',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Fees',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Gains',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Loss',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ReturnAssets',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newShareholder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RevokeShareholder',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UseAssets',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newShareholder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'WhitelistShareholder',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'assetsInUse',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount_', internalType: 'uint256', type: 'uint256' }],
    name: 'fees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount_', internalType: 'uint256', type: 'uint256' }],
    name: 'gains',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'manager_', internalType: 'address', type: 'address' },
      { name: 'asset_', internalType: 'address', type: 'address' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'isShareholder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount_', internalType: 'uint256', type: 'uint256' }],
    name: 'loss',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'manager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner_', internalType: 'address', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'returnAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'revokeShareholder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount_', internalType: 'uint256', type: 'uint256' }],
    name: 'setAssetsInUse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newManager_', internalType: 'address', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount_', internalType: 'uint256', type: 'uint256' }],
    name: 'setTotalAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver_', internalType: 'address', type: 'address' },
      { name: 'amount_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'useAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'address_', internalType: 'address', type: 'address' }],
    name: 'whitelistShareholder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
] as const

export const oldVaultAddress =
  '0x430fD367dBbaebDAe682060e0fd2b2B1583E0639' as const

export const oldVaultConfig = {
  address: oldVaultAddress,
  abi: oldVaultAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'assets', type: 'uint256', indexed: false },
      { name: 'shares', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'receiver', type: 'address', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'assets', type: 'uint256', indexed: false },
      { name: 'shares', type: 'uint256', indexed: false },
    ],
    name: 'Withdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'receiver', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'strategy', type: 'address', indexed: true },
      { name: 'change_type', type: 'uint256', indexed: true },
    ],
    name: 'StrategyChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'strategy', type: 'address', indexed: true },
      { name: 'gain', type: 'uint256', indexed: false },
      { name: 'loss', type: 'uint256', indexed: false },
      { name: 'current_debt', type: 'uint256', indexed: false },
      { name: 'protocol_fees', type: 'uint256', indexed: false },
      { name: 'total_fees', type: 'uint256', indexed: false },
      { name: 'total_refunds', type: 'uint256', indexed: false },
    ],
    name: 'StrategyReported',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'strategy', type: 'address', indexed: true },
      { name: 'current_debt', type: 'uint256', indexed: false },
      { name: 'new_debt', type: 'uint256', indexed: false },
    ],
    name: 'DebtUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', type: 'address', indexed: true },
      { name: 'role', type: 'uint256', indexed: true },
    ],
    name: 'RoleSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'role_manager', type: 'address', indexed: true }],
    name: 'UpdateRoleManager',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'accountant', type: 'address', indexed: true }],
    name: 'UpdateAccountant',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'deposit_limit_module', type: 'address', indexed: true }],
    name: 'UpdateDepositLimitModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'withdraw_limit_module', type: 'address', indexed: true }],
    name: 'UpdateWithdrawLimitModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'new_default_queue', type: 'address[]', indexed: false }],
    name: 'UpdateDefaultQueue',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'use_default_queue', type: 'bool', indexed: false }],
    name: 'UpdateUseDefaultQueue',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'strategy', type: 'address', indexed: true },
      { name: 'new_debt', type: 'uint256', indexed: false },
    ],
    name: 'UpdatedMaxDebtForStrategy',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'deposit_limit', type: 'uint256', indexed: false }],
    name: 'UpdateDepositLimit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'minimum_total_idle', type: 'uint256', indexed: false }],
    name: 'UpdateMinimumTotalIdle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'profit_max_unlock_time', type: 'uint256', indexed: false },
    ],
    name: 'UpdateProfitMaxUnlockTime',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'strategy', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
    name: 'DebtPurchased',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Shutdown' },
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'asset', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'role_manager', type: 'address' },
      { name: 'profit_max_unlock_time', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_accountant', type: 'address' }],
    name: 'set_accountant',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_default_queue', type: 'address[]' }],
    name: 'set_default_queue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'use_default_queue', type: 'bool' }],
    name: 'set_use_default_queue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'deposit_limit', type: 'uint256' }],
    name: 'set_deposit_limit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'deposit_limit', type: 'uint256' },
      { name: 'override', type: 'bool' },
    ],
    name: 'set_deposit_limit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'deposit_limit_module', type: 'address' }],
    name: 'set_deposit_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'deposit_limit_module', type: 'address' },
      { name: 'override', type: 'bool' },
    ],
    name: 'set_deposit_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'withdraw_limit_module', type: 'address' }],
    name: 'set_withdraw_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'minimum_total_idle', type: 'uint256' }],
    name: 'set_minimum_total_idle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_profit_max_unlock_time', type: 'uint256' }],
    name: 'setProfitMaxUnlockTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'set_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'add_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'remove_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'role_manager', type: 'address' }],
    name: 'transfer_role_manager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accept_role_manager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isShutdown',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockedShares',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pricePerShare',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'get_default_queue',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'process_report',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'buy_debt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_strategy', type: 'address' }],
    name: 'add_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'new_strategy', type: 'address' },
      { name: 'add_to_queue', type: 'bool' },
    ],
    name: 'add_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'revoke_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'force_revoke_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'new_max_debt', type: 'uint256' },
    ],
    name: 'update_max_debt_for_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'target_debt', type: 'uint256' },
    ],
    name: 'update_debt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'target_debt', type: 'uint256' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'update_debt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'shutdown_vault',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'v', type: 'uint8' },
      { name: 'r', type: 'bytes32' },
      { name: 's', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalIdle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalDebt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'receiver', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'receiver', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FACTORY',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'apiVersion',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'assets_needed', type: 'uint256' },
    ],
    name: 'assess_share_of_unrealised_losses',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'profitMaxUnlockTime',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fullProfitUnlockDate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'profitUnlockingRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastProfitUpdate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'strategies',
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'activation', type: 'uint256' },
          { name: 'last_report', type: 'uint256' },
          { name: 'current_debt', type: 'uint256' },
          { name: 'max_debt', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'default_queue',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'use_default_queue',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minimum_total_idle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit_limit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accountant',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit_limit_module',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw_limit_module',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'roles',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'role_manager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'future_role_manager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const vaultAddress =
  '0x254bd33E2f62713F893F0842C99E68f855cDa315' as const

export const vaultConfig = { address: vaultAddress, abi: vaultAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__
 */
export const useReadDai = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadDaiAllowance = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadDaiBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadDaiDecimals = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"name"`
 */
export const useReadDaiName = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadDaiSymbol = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadDaiTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiAbi}__
 */
export const useWriteDai = /*#__PURE__*/ createUseWriteContract({
  abi: daiAbi,
  address: daiAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteDaiApprove = /*#__PURE__*/ createUseWriteContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteDaiTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteDaiTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiAbi}__
 */
export const useSimulateDai = /*#__PURE__*/ createUseSimulateContract({
  abi: daiAbi,
  address: daiAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateDaiApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateDaiTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: daiAbi,
  address: daiAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link daiAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateDaiTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: daiAbi,
    address: daiAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiAbi}__
 */
export const useWatchDaiEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: daiAbi,
  address: daiAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchDaiApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: daiAbi,
    address: daiAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link daiAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchDaiTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: daiAbi,
    address: daiAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__
 */
export const useReadMigration = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"asset"`
 */
export const useReadMigrationAsset = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"lastHolder"`
 */
export const useReadMigrationLastHolder = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'lastHolder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMigrationOwner = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"vaultV1"`
 */
export const useReadMigrationVaultV1 = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'vaultV1',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"vaultV2"`
 */
export const useReadMigrationVaultV2 = /*#__PURE__*/ createUseReadContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'vaultV2',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationAbi}__
 */
export const useWriteMigration = /*#__PURE__*/ createUseWriteContract({
  abi: migrationAbi,
  address: migrationAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"migrate"`
 */
export const useWriteMigrationMigrate = /*#__PURE__*/ createUseWriteContract({
  abi: migrationAbi,
  address: migrationAddress,
  functionName: 'migrate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMigrationRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMigrationTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"withdrawAssets"`
 */
export const useWriteMigrationWithdrawAssets =
  /*#__PURE__*/ createUseWriteContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'withdrawAssets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationAbi}__
 */
export const useSimulateMigration = /*#__PURE__*/ createUseSimulateContract({
  abi: migrationAbi,
  address: migrationAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"migrate"`
 */
export const useSimulateMigrationMigrate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMigrationRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMigrationTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationAbi}__ and `functionName` set to `"withdrawAssets"`
 */
export const useSimulateMigrationWithdrawAssets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: migrationAbi,
    address: migrationAddress,
    functionName: 'withdrawAssets',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link migrationAbi}__
 */
export const useWatchMigrationEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: migrationAbi, address: migrationAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link migrationAbi}__ and `eventName` set to `"Migrated"`
 */
export const useWatchMigrationMigratedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: migrationAbi,
    address: migrationAddress,
    eventName: 'Migrated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link migrationAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMigrationOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: migrationAbi,
    address: migrationAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__
 */
export const useReadOldVault = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadOldVaultAllowance = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"asset"`
 */
export const useReadOldVaultAsset = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"assetsInUse"`
 */
export const useReadOldVaultAssetsInUse = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'assetsInUse',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadOldVaultBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"convertToAssets"`
 */
export const useReadOldVaultConvertToAssets =
  /*#__PURE__*/ createUseReadContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'convertToAssets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"convertToShares"`
 */
export const useReadOldVaultConvertToShares =
  /*#__PURE__*/ createUseReadContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'convertToShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadOldVaultDecimals = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"isShareholder"`
 */
export const useReadOldVaultIsShareholder = /*#__PURE__*/ createUseReadContract(
  { abi: oldVaultAbi, address: oldVaultAddress, functionName: 'isShareholder' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"manager"`
 */
export const useReadOldVaultManager = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"maxDeposit"`
 */
export const useReadOldVaultMaxDeposit = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'maxDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"maxMint"`
 */
export const useReadOldVaultMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"maxRedeem"`
 */
export const useReadOldVaultMaxRedeem = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'maxRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"maxWithdraw"`
 */
export const useReadOldVaultMaxWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'maxWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"name"`
 */
export const useReadOldVaultName = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"previewDeposit"`
 */
export const useReadOldVaultPreviewDeposit =
  /*#__PURE__*/ createUseReadContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'previewDeposit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"previewMint"`
 */
export const useReadOldVaultPreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'previewMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"previewRedeem"`
 */
export const useReadOldVaultPreviewRedeem = /*#__PURE__*/ createUseReadContract(
  { abi: oldVaultAbi, address: oldVaultAddress, functionName: 'previewRedeem' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"previewWithdraw"`
 */
export const useReadOldVaultPreviewWithdraw =
  /*#__PURE__*/ createUseReadContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'previewWithdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadOldVaultSymbol = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"totalAssets"`
 */
export const useReadOldVaultTotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'totalAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadOldVaultTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__
 */
export const useWriteOldVault = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteOldVaultApprove = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteOldVaultDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteOldVaultDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"fees"`
 */
export const useWriteOldVaultFees = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'fees',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"gains"`
 */
export const useWriteOldVaultGains = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'gains',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteOldVaultIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteOldVaultInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"loss"`
 */
export const useWriteOldVaultLoss = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'loss',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteOldVaultMint = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useWriteOldVaultRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"returnAssets"`
 */
export const useWriteOldVaultReturnAssets =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'returnAssets',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"revokeShareholder"`
 */
export const useWriteOldVaultRevokeShareholder =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'revokeShareholder',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setAssetsInUse"`
 */
export const useWriteOldVaultSetAssetsInUse =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'setAssetsInUse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setManager"`
 */
export const useWriteOldVaultSetManager = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'setManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setTotalAssets"`
 */
export const useWriteOldVaultSetTotalAssets =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'setTotalAssets',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteOldVaultTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteOldVaultTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"useAssets"`
 */
export const useWriteOldVaultUseAssets = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'useAssets',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"whitelistShareholder"`
 */
export const useWriteOldVaultWhitelistShareholder =
  /*#__PURE__*/ createUseWriteContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'whitelistShareholder',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteOldVaultWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__
 */
export const useSimulateOldVault = /*#__PURE__*/ createUseSimulateContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateOldVaultApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateOldVaultDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateOldVaultDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"fees"`
 */
export const useSimulateOldVaultFees = /*#__PURE__*/ createUseSimulateContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'fees',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"gains"`
 */
export const useSimulateOldVaultGains = /*#__PURE__*/ createUseSimulateContract(
  { abi: oldVaultAbi, address: oldVaultAddress, functionName: 'gains' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateOldVaultIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateOldVaultInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"loss"`
 */
export const useSimulateOldVaultLoss = /*#__PURE__*/ createUseSimulateContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'loss',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateOldVaultMint = /*#__PURE__*/ createUseSimulateContract({
  abi: oldVaultAbi,
  address: oldVaultAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useSimulateOldVaultRedeem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'redeem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"returnAssets"`
 */
export const useSimulateOldVaultReturnAssets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'returnAssets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"revokeShareholder"`
 */
export const useSimulateOldVaultRevokeShareholder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'revokeShareholder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setAssetsInUse"`
 */
export const useSimulateOldVaultSetAssetsInUse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'setAssetsInUse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setManager"`
 */
export const useSimulateOldVaultSetManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'setManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"setTotalAssets"`
 */
export const useSimulateOldVaultSetTotalAssets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'setTotalAssets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateOldVaultTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateOldVaultTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"useAssets"`
 */
export const useSimulateOldVaultUseAssets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'useAssets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"whitelistShareholder"`
 */
export const useSimulateOldVaultWhitelistShareholder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'whitelistShareholder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link oldVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateOldVaultWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__
 */
export const useWatchOldVaultEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: oldVaultAbi,
  address: oldVaultAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchOldVaultApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"ChangeManager"`
 */
export const useWatchOldVaultChangeManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'ChangeManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchOldVaultDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Fees"`
 */
export const useWatchOldVaultFeesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Fees',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Gains"`
 */
export const useWatchOldVaultGainsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Gains',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchOldVaultInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Loss"`
 */
export const useWatchOldVaultLossEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Loss',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"ReturnAssets"`
 */
export const useWatchOldVaultReturnAssetsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'ReturnAssets',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"RevokeShareholder"`
 */
export const useWatchOldVaultRevokeShareholderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'RevokeShareholder',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchOldVaultTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"UseAssets"`
 */
export const useWatchOldVaultUseAssetsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'UseAssets',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"WhitelistShareholder"`
 */
export const useWatchOldVaultWhitelistShareholderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'WhitelistShareholder',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link oldVaultAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchOldVaultWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: oldVaultAbi,
    address: oldVaultAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__
 */
export const useReadVault = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"isShutdown"`
 */
export const useReadVaultIsShutdown = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'isShutdown',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"unlockedShares"`
 */
export const useReadVaultUnlockedShares = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'unlockedShares',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"pricePerShare"`
 */
export const useReadVaultPricePerShare = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'pricePerShare',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"get_default_queue"`
 */
export const useReadVaultGetDefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'get_default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadVaultBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadVaultTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"totalAssets"`
 */
export const useReadVaultTotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'totalAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"totalIdle"`
 */
export const useReadVaultTotalIdle = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'totalIdle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"totalDebt"`
 */
export const useReadVaultTotalDebt = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'totalDebt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"convertToShares"`
 */
export const useReadVaultConvertToShares = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'convertToShares',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"previewDeposit"`
 */
export const useReadVaultPreviewDeposit = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'previewDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"previewMint"`
 */
export const useReadVaultPreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'previewMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"convertToAssets"`
 */
export const useReadVaultConvertToAssets = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'convertToAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"maxDeposit"`
 */
export const useReadVaultMaxDeposit = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'maxDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"maxMint"`
 */
export const useReadVaultMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"maxWithdraw"`
 */
export const useReadVaultMaxWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'maxWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"maxRedeem"`
 */
export const useReadVaultMaxRedeem = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'maxRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"previewWithdraw"`
 */
export const useReadVaultPreviewWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'previewWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"previewRedeem"`
 */
export const useReadVaultPreviewRedeem = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'previewRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"FACTORY"`
 */
export const useReadVaultFactory = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'FACTORY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"apiVersion"`
 */
export const useReadVaultApiVersion = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'apiVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"assess_share_of_unrealised_losses"`
 */
export const useReadVaultAssessShareOfUnrealisedLosses =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'assess_share_of_unrealised_losses',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"profitMaxUnlockTime"`
 */
export const useReadVaultProfitMaxUnlockTime =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'profitMaxUnlockTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"fullProfitUnlockDate"`
 */
export const useReadVaultFullProfitUnlockDate =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'fullProfitUnlockDate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"profitUnlockingRate"`
 */
export const useReadVaultProfitUnlockingRate =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'profitUnlockingRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"lastProfitUpdate"`
 */
export const useReadVaultLastProfitUpdate = /*#__PURE__*/ createUseReadContract(
  { abi: vaultAbi, address: vaultAddress, functionName: 'lastProfitUpdate' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadVaultDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"asset"`
 */
export const useReadVaultAsset = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadVaultDecimals = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"strategies"`
 */
export const useReadVaultStrategies = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'strategies',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"default_queue"`
 */
export const useReadVaultDefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"use_default_queue"`
 */
export const useReadVaultUseDefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'use_default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadVaultAllowance = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"minimum_total_idle"`
 */
export const useReadVaultMinimumTotalIdle = /*#__PURE__*/ createUseReadContract(
  { abi: vaultAbi, address: vaultAddress, functionName: 'minimum_total_idle' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"deposit_limit"`
 */
export const useReadVaultDepositLimit = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'deposit_limit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"accountant"`
 */
export const useReadVaultAccountant = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'accountant',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"deposit_limit_module"`
 */
export const useReadVaultDepositLimitModule =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'deposit_limit_module',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"withdraw_limit_module"`
 */
export const useReadVaultWithdrawLimitModule =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'withdraw_limit_module',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"roles"`
 */
export const useReadVaultRoles = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'roles',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"role_manager"`
 */
export const useReadVaultRoleManager = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'role_manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"future_role_manager"`
 */
export const useReadVaultFutureRoleManager =
  /*#__PURE__*/ createUseReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'future_role_manager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"name"`
 */
export const useReadVaultName = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadVaultSymbol = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadVaultNonces = /*#__PURE__*/ createUseReadContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__
 */
export const useWriteVault = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteVaultInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_accountant"`
 */
export const useWriteVaultSetAccountant = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'set_accountant',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_default_queue"`
 */
export const useWriteVaultSetDefaultQueue =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_default_queue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_use_default_queue"`
 */
export const useWriteVaultSetUseDefaultQueue =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_use_default_queue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_deposit_limit"`
 */
export const useWriteVaultSetDepositLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_deposit_limit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_deposit_limit_module"`
 */
export const useWriteVaultSetDepositLimitModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_deposit_limit_module',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_withdraw_limit_module"`
 */
export const useWriteVaultSetWithdrawLimitModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_withdraw_limit_module',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_minimum_total_idle"`
 */
export const useWriteVaultSetMinimumTotalIdle =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_minimum_total_idle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"setProfitMaxUnlockTime"`
 */
export const useWriteVaultSetProfitMaxUnlockTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'setProfitMaxUnlockTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_role"`
 */
export const useWriteVaultSetRole = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'set_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"add_role"`
 */
export const useWriteVaultAddRole = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'add_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"remove_role"`
 */
export const useWriteVaultRemoveRole = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'remove_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transfer_role_manager"`
 */
export const useWriteVaultTransferRoleManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'transfer_role_manager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"accept_role_manager"`
 */
export const useWriteVaultAcceptRoleManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'accept_role_manager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"process_report"`
 */
export const useWriteVaultProcessReport = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'process_report',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"buy_debt"`
 */
export const useWriteVaultBuyDebt = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'buy_debt',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"add_strategy"`
 */
export const useWriteVaultAddStrategy = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'add_strategy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"revoke_strategy"`
 */
export const useWriteVaultRevokeStrategy = /*#__PURE__*/ createUseWriteContract(
  { abi: vaultAbi, address: vaultAddress, functionName: 'revoke_strategy' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"force_revoke_strategy"`
 */
export const useWriteVaultForceRevokeStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'force_revoke_strategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"update_max_debt_for_strategy"`
 */
export const useWriteVaultUpdateMaxDebtForStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'update_max_debt_for_strategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"update_debt"`
 */
export const useWriteVaultUpdateDebt = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'update_debt',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"shutdown_vault"`
 */
export const useWriteVaultShutdownVault = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'shutdown_vault',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteVaultDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteVaultMint = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteVaultWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useWriteVaultRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteVaultApprove = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteVaultTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteVaultTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteVaultPermit = /*#__PURE__*/ createUseWriteContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__
 */
export const useSimulateVault = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateVaultInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_accountant"`
 */
export const useSimulateVaultSetAccountant =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_accountant',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_default_queue"`
 */
export const useSimulateVaultSetDefaultQueue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_default_queue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_use_default_queue"`
 */
export const useSimulateVaultSetUseDefaultQueue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_use_default_queue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_deposit_limit"`
 */
export const useSimulateVaultSetDepositLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_deposit_limit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_deposit_limit_module"`
 */
export const useSimulateVaultSetDepositLimitModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_deposit_limit_module',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_withdraw_limit_module"`
 */
export const useSimulateVaultSetWithdrawLimitModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_withdraw_limit_module',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_minimum_total_idle"`
 */
export const useSimulateVaultSetMinimumTotalIdle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'set_minimum_total_idle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"setProfitMaxUnlockTime"`
 */
export const useSimulateVaultSetProfitMaxUnlockTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'setProfitMaxUnlockTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"set_role"`
 */
export const useSimulateVaultSetRole = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'set_role',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"add_role"`
 */
export const useSimulateVaultAddRole = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'add_role',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"remove_role"`
 */
export const useSimulateVaultRemoveRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'remove_role',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transfer_role_manager"`
 */
export const useSimulateVaultTransferRoleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'transfer_role_manager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"accept_role_manager"`
 */
export const useSimulateVaultAcceptRoleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'accept_role_manager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"process_report"`
 */
export const useSimulateVaultProcessReport =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'process_report',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"buy_debt"`
 */
export const useSimulateVaultBuyDebt = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'buy_debt',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"add_strategy"`
 */
export const useSimulateVaultAddStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'add_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"revoke_strategy"`
 */
export const useSimulateVaultRevokeStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'revoke_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"force_revoke_strategy"`
 */
export const useSimulateVaultForceRevokeStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'force_revoke_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"update_max_debt_for_strategy"`
 */
export const useSimulateVaultUpdateMaxDebtForStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'update_max_debt_for_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"update_debt"`
 */
export const useSimulateVaultUpdateDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'update_debt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"shutdown_vault"`
 */
export const useSimulateVaultShutdownVault =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'shutdown_vault',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateVaultDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateVaultMint = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateVaultWithdraw = /*#__PURE__*/ createUseSimulateContract(
  { abi: vaultAbi, address: vaultAddress, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useSimulateVaultRedeem = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateVaultApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateVaultTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: vaultAbi, address: vaultAddress, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateVaultTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vaultAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateVaultPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: vaultAbi,
  address: vaultAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__
 */
export const useWatchVaultEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: vaultAbi,
  address: vaultAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchVaultDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchVaultWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchVaultTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchVaultApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"StrategyChanged"`
 */
export const useWatchVaultStrategyChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'StrategyChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"StrategyReported"`
 */
export const useWatchVaultStrategyReportedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'StrategyReported',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"DebtUpdated"`
 */
export const useWatchVaultDebtUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'DebtUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"RoleSet"`
 */
export const useWatchVaultRoleSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'RoleSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateRoleManager"`
 */
export const useWatchVaultUpdateRoleManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateRoleManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateAccountant"`
 */
export const useWatchVaultUpdateAccountantEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateAccountant',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateDepositLimitModule"`
 */
export const useWatchVaultUpdateDepositLimitModuleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateDepositLimitModule',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateWithdrawLimitModule"`
 */
export const useWatchVaultUpdateWithdrawLimitModuleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateWithdrawLimitModule',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateDefaultQueue"`
 */
export const useWatchVaultUpdateDefaultQueueEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateDefaultQueue',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateUseDefaultQueue"`
 */
export const useWatchVaultUpdateUseDefaultQueueEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateUseDefaultQueue',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdatedMaxDebtForStrategy"`
 */
export const useWatchVaultUpdatedMaxDebtForStrategyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdatedMaxDebtForStrategy',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateDepositLimit"`
 */
export const useWatchVaultUpdateDepositLimitEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateDepositLimit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateMinimumTotalIdle"`
 */
export const useWatchVaultUpdateMinimumTotalIdleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateMinimumTotalIdle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"UpdateProfitMaxUnlockTime"`
 */
export const useWatchVaultUpdateProfitMaxUnlockTimeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'UpdateProfitMaxUnlockTime',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"DebtPurchased"`
 */
export const useWatchVaultDebtPurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'DebtPurchased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vaultAbi}__ and `eventName` set to `"Shutdown"`
 */
export const useWatchVaultShutdownEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vaultAbi,
    address: vaultAddress,
    eventName: 'Shutdown',
  })
