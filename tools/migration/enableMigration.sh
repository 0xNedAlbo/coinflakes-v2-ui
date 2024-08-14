#!/bin/sh

TEST_ACCOUNT=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
WHALE=0xc2fE57936927D663937D83FD7D9a3C8Dbd233556
ADMIN=0xDA035641151d42Aa4A25cE51de8F6e53eae0dEd7
VAULT=0x430fD367dBbaebDAe682060e0fd2b2B1583E0639
DAI=0x6B175474E89094C44Da98b954EedeAC495271d0F
ASSETS_IN_USE=100000000000000000000000


cast rpc anvil_impersonateAccount $WHALE
cast send --unlocked -f $WHALE $DAI "transfer(address,uint256)" $ADMIN $ASSETS_IN_USE
cast rpc -r http://localhost:8545 anvil_impersonateAccount $ADMIN
cast send --unlocked -f $ADMIN  $VAULT "setAssetsInUse(uint256)"  $ASSETS_IN_USE
cast send --unlocked -f $ADMIN  $DAI "approve(address,uint256)" $VAULT $ASSETS_IN_USE
cast send --unlocked -f $ADMIN  $VAULT "returnAssets(address, uint256)" $ADMIN $ASSETS_IN_USE
cast rpc anvil_stopImpersonatingAccount $WHALE
cast rpc anvil_stopImpersonatingAccount $ADMIN

