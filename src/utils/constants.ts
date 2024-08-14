export const BN_ZERO = 0n;
export const BN_ONE = 1n;
export const BN_MAX_UINT =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const BN_1E = (exp: number) => 10n ** BigInt(exp);

export const ADDR_BLACKHOLE = "0x0000000000000000000000000000000000000000";
export const ADDR_DEADBEEF = "0x00000000000000000000000000000000deadbeef";
export const ADDR_ZERO = ADDR_BLACKHOLE;
