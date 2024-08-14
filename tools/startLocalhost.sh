#!/bin/sh

. .env.local 
anvil -f $NEXT_PUBLIC_RPC_ENDPOINT --chain-id 1337 -b 5

