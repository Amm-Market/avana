export interface ProtocolAdapter {
  name: string
  shortName: string
  category: string
  purpose: string
  useCases: string[]
  features: string[]
}

export const protocols: ProtocolAdapter[] = [
  {
    name: "Frax Ether Adapter",
    shortName: "FE",
    category: "Staking",
    purpose: "Facilitates liquidity migration for Frax Ether (frxETH), a liquid staking derivative for Ethereum.",
    useCases: [
      "Migrate frxETH liquidity between pools or protocols",
      "Support concentrated liquidity management in Uniswap V3 or other AMMs",
      "Enable staking rewards for frxETH in farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "mETH Protocol Adapter",
    shortName: "mETH",
    category: "Staking",
    purpose: "Handles mETH, a liquid staking token from Meta Pool or similar protocols.",
    useCases: [
      "Migrate mETH liquidity across protocols like Curve or Balancer",
      "Enable impermanent loss protection in compatible protocols"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Uniswap v2 Adapter",
    shortName: "U2",
    category: "DEX",
    purpose: "Supports liquidity migration for Uniswap V2 pools.",
    useCases: [
      "Migrate LP tokens between V2 pools",
      "Claim rewards from farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap"
    ]
  },
  {
    name: "Uniswap v3 Adapter",
    shortName: "U3",
    category: "DEX",
    purpose: "Enables concentrated liquidity management for Uniswap V3 pools.",
    useCases: [
      "Migrate liquidity within specific tick ranges",
      "Stake LP tokens in farming contracts",
      "Optimize capital efficiency by rebalancing positions"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "Curve Adapter",
    shortName: "CRV",
    category: "DEX",
    purpose: "Facilitates liquidity migration for Curve pools, known for stablecoin and pegged asset trading.",
    useCases: [
      "Migrate liquidity between Curve pools",
      "Claim CRV rewards and stake LP tokens in Gauge contracts",
      "Optimize stablecoin yields across different pools"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "Aerodrome Adapter",
    shortName: "AE",
    category: "DEX",
    purpose: "Supports Aerodrome, a fork of Velodrome optimized for Base chain.",
    useCases: [
      "Migrate liquidity between Aerodrome pools",
      "Claim rewards and stake LP tokens"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Balancer Adapter",
    shortName: "BAL",
    category: "DEX",
    purpose: "Handles liquidity migration for Balancer pools, which support weighted and stable pools.",
    useCases: [
      "Migrate liquidity between Balancer pools",
      "Stake BPTs (Balancer Pool Tokens) in farming contracts",
      "Optimize multi-asset exposure across different pools"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "Pendle Adapter",
    shortName: "PND",
    category: "Yield",
    purpose: "Facilitates liquidity migration for Pendle, a protocol for tokenized yield and fixed-rate assets.",
    useCases: [
      "Migrate YT (Yield Tokens) and PT (Principal Tokens)",
      "Stake tokens in Pendle's farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "CoW Swap Adapter",
    shortName: "COW",
    category: "DEX",
    purpose: "Supports CoW Swap, an intent-based DEX using batch auctions for MEV-protected trades.",
    useCases: [
      "Swap tokens via batch auctions with MEV protection",
      "Route liquidity through CoW Protocol solvers"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap"
    ]
  },
  {
    name: "Uniswap V4 Adapter",
    shortName: "U4",
    category: "DEX",
    purpose: "Supports Uniswap V4, which introduces hooks and custom pool logic.",
    useCases: [
      "Migrate liquidity with custom hooks",
      "Stake LP tokens in farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "Ether.fi Adapter",
    shortName: "ETH.FI",
    category: "Staking",
    purpose: "Handles eETH, a liquid staking token from Ether.fi.",
    useCases: [
      "Migrate eETH liquidity across protocols",
      "Enable staking rewards"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Ethena USDe Adapter",
    shortName: "USDe",
    category: "Stablecoin",
    purpose: "Facilitates liquidity migration for USDe, a delta-neutral stablecoin.",
    useCases: [
      "Migrate USDe liquidity across protocols",
      "Stake USDe in farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Lido Adapter",
    shortName: "LDO",
    category: "Staking",
    purpose: "Supports stETH, a liquid staking token from Lido.",
    useCases: [
      "Migrate stETH liquidity across protocols",
      "Stake stETH in Curve or other farming contracts",
      "Optimize stETH yields across different platforms"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "AAVE V3 Adapter",
    shortName: "AV3",
    category: "Lending",
    purpose: "Facilitates liquidity migration for AAVE V3 lending pools.",
    useCases: [
      "Supply/withdraw assets in AAVE pools",
      "Stake aTokens in farming contracts",
      "Manage borrowing positions across protocols"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Rocket Pool Adapter",
    shortName: "RPL",
    category: "Staking",
    purpose: "Handles rETH, a liquid staking token from Rocket Pool.",
    useCases: [
      "Migrate rETH liquidity across protocols",
      "Stake rETH in Curve or other farming contracts"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Kelp Adapter",
    shortName: "KELP",
    category: "Restaking",
    purpose: "Supports Kelp DAO's restaking mechanisms.",
    useCases: [
      "Migrate restaked ETH liquidity",
      "Claim rewards from Kelp's ecosystem"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "MakerDAO Adapter",
    shortName: "MKR",
    category: "Lending",
    purpose: "Facilitates liquidity migration for MakerDAO's DAI and collateral pools.",
    useCases: [
      "Supply/withdraw collateral in Maker Vaults",
      "Stake DAI in farming contracts",
      "Open/manage vaults, generate/repay DAI, adjust collateral ratios"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Renzo Adapter",
    shortName: "RNZ",
    category: "Restaking",
    purpose: "Handles ezETH, a liquid restaking token from Renzo.",
    useCases: [
      "Migrate ezETH liquidity across protocols",
      "Stake ezETH in farming contracts"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Morpho Blue Adapter",
    shortName: "MRPH",
    category: "Lending",
    purpose: "Facilitates peer-to-peer lending on Morpho Blue.",
    useCases: [
      "Supply/withdraw assets in Morpho pools",
      "Stake tokens in farming contracts",
      "Supply/borrow assets on Morpho Blue, manage positions"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Compound V2 Adapter",
    shortName: "COMP",
    category: "Lending",
    purpose: "Supports liquidity migration for Compound V2 lending pools.",
    useCases: [
      "Supply/withdraw assets in Compound pools",
      "Stake cTokens in farming contracts"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Yearn Finance Adapter",
    shortName: "YFI",
    category: "Yield",
    purpose: "Facilitates liquidity migration for Yearn Vaults.",
    useCases: [
      "Deposit/withdraw assets in Yearn Vaults",
      "Claim rewards from Yearn's ecosystem"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Fluid Lending Adapter",
    shortName: "FLD",
    category: "Lending",
    purpose: "Supports Fluid Lending's dynamic interest rate model.",
    useCases: [
      "Supply/withdraw assets in Fluid pools",
      "Stake tokens in farming contracts"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Swell Liquid Restaking Adapter",
    shortName: "SWL",
    category: "Restaking",
    purpose: "Handles sETH, a liquid restaking token from Swell.",
    useCases: [
      "Migrate sETH liquidity across protocols",
      "Stake sETH in farming contracts"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Dinero (pxETH) Adapter",
    shortName: "DNR",
    category: "Staking",
    purpose: "Supports pxETH, a liquid staking token from Dinero.",
    useCases: [
      "Migrate pxETH liquidity across protocols",
      "Stake pxETH in farming contracts"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "Reserve Protocol Adapter",
    shortName: "RSV",
    category: "Stablecoin",
    purpose: "Facilitates liquidity migration for RSV, a decentralized stablecoin.",
    useCases: [
      "Migrate RSV liquidity across protocols",
      "Stake RSV in farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Convex Finance Adapter",
    shortName: "CVX",
    category: "Yield",
    purpose: "Supports CVX and CRV rewards from Convex.",
    useCases: [
      "Stake LP tokens in Convex",
      "Claim rewards from Convex's ecosystem"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "GMX - GLV Vault Adapter",
    shortName: "GMX-V",
    category: "Yield",
    purpose: "Facilitates liquidity migration for GMX's GLV Vault.",
    useCases: [
      "Stake GMX tokens in GLV Vault",
      "Claim rewards from GMX's ecosystem"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "GMX - GM Pool Adapter",
    shortName: "GMX-P",
    category: "DEX",
    purpose: "Supports GMX's liquidity pools.",
    useCases: [
      "Migrate liquidity in GMX pools",
      "Stake tokens in farming contracts"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Spark Adapter",
    shortName: "SPK",
    category: "Lending",
    purpose: "Facilitates interaction with the Spark Protocol, a fork of Aave.",
    useCases: [
      "Supply/borrow assets on Spark",
      "Manage positions, claim rewards"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Venus Adapter",
    shortName: "VNS",
    category: "Lending",
    purpose: "Supports the Venus Protocol on BNB Chain.",
    useCases: [
      "Supply/borrow assets on Venus",
      "Manage positions, claim rewards"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Euler Adapter",
    shortName: "EUL",
    category: "Lending",
    purpose: "Enables interaction with the Euler Finance lending protocol.",
    useCases: [
      "Supply/borrow assets on Euler",
      "Manage positions"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Moonwell Adapter",
    shortName: "MOON",
    category: "Lending",
    purpose: "Supports the Moonwell lending and borrowing protocol on Moonbeam and Moonriver.",
    useCases: [
      "Supply/borrow assets on Moonwell",
      "Manage positions, claim rewards"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Sumer.money Adapter",
    shortName: "SMR",
    category: "Yield",
    purpose: "Facilitates interaction with the Sumer.money yield aggregation platform.",
    useCases: [
      "Deposit funds into Sumer vaults",
      "Claim rewards"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  },
  {
    name: "Gearbox Adapter",
    shortName: "GEAR",
    category: "Leverage",
    purpose: "Supports the Gearbox Protocol for leveraged farming and trading.",
    useCases: [
      "Open/manage leveraged positions",
      "Execute trades"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Leverage"
    ]
  },
  {
    name: "Flux Finance Adapter",
    shortName: "FLX",
    category: "Lending",
    purpose: "Enables interaction with the Flux Finance lending protocol.",
    useCases: [
      "Supply/borrow assets on Flux Finance",
      "Manage positions"
    ],
    features: [
      "Supply",
      "Withdraw",
      "Borrow",
      "Repay"
    ]
  },
  {
    name: "Sushi Adapter",
    shortName: "SUSHI",
    category: "DEX",
    purpose: "Supports the SushiSwap DEX and related features.",
    useCases: [
      "Swap tokens on SushiSwap",
      "Provide liquidity, stake SUSHI, claim rewards"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Swap",
      "Rewards"
    ]
  },
  {
    name: "Aura Adapter",
    shortName: "AURA",
    category: "Yield",
    purpose: "Supports Aura Finance, a veBAL maximizer.",
    useCases: [
      "Stake BAL tokens in Aura",
      "Claim rewards"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "1inch",
    shortName: "1INCH",
    category: "DEX",
    purpose: "Enables interaction with 1inch, a DEX aggregator.\nFinds token swap routes across DEXs.",
    useCases: ["Swap tokens through 1inch"],
    features: ["Swap"]
  },
  {
    name: "Elixir Adapter",
    shortName: "ELIX",
    category: "Liquidity",
    purpose: "Supports the Elixir Protocol, focused on liquidity for order book exchanges.",
    useCases: [
      "Provide liquidity to Elixir pools"
    ],
    features: [
      "Deposit",
      "Withdraw"
    ]
  },
  {
    name: "Symbiotic Adapter",
    shortName: "SYM",
    category: "Restaking",
    purpose: "Supports the Symbiotic restaking protocol.",
    useCases: [
      "Stake ETH in Symbiotic",
      "Claim rewards"
    ],
    features: [
      "Stake",
      "Unstake",
      "Rewards"
    ]
  },
  {
    name: "DeSyn Basis Trading Adapter",
    shortName: "DSN",
    category: "Trading",
    purpose: "Facilitates basic trading strategies on DeSyn.",
    useCases: [
      "Execute basis trading strategies on DeSyn"
    ],
    features: [
      "Trade",
      "Hedge"
    ]
  },
  {
    name: "Ondo Finance Adapter",
    shortName: "ONDO",
    category: "RWA",
    purpose: "Supports Ondo Finance's tokenized real-world assets.",
    useCases: [
      "Interact with Ondo Finance's tokenized assets"
    ],
    features: [
      "Deposit",
      "Withdraw",
      "Rewards"
    ]
  }
]
