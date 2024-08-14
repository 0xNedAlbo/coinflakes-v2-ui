#!/bin/sh

cast rpc -r http://localhost:8545 anvil_impersonateAccount 0xc2fE57936927D663937D83FD7D9a3C8Dbd233556
cast send --unlocked -f 0xc2fE57936927D663937D83FD7D9a3C8Dbd233556 -r http://localhost:8545 0x6B175474E89094C44Da98b954EedeAC495271d0F "transfer(address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 10000000000000000000000
cast rpc -r http://localhost:8545 anvil_stopImpersonatingAccount 0xc2fE57936927D663937D83FD7D9a3C8Dbd233556
