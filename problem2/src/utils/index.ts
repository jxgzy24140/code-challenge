import io from "socket.io-client";

export const coinImageFormat: any = {
  ampLUNA: {
    img: "ampLUNA.svg",
  },
  ATOM: {
    img: "ATOM.svg",
  },
  axlUSDC: {
    img: "axlUSDC.svg",
  },
  BLUR: {
    img: "BLUR.svg",
  },
  bNEO: {
    img: "bNEO.svg",
  },
  BUSD: {
    img: "BUSD.svg",
  },
  ETH: {
    img: "ETH.svg",
  },
  EVMOS: {
    img: "EVMOS.svg",
  },
  GMX: {
    img: "GMX.svg",
  },
  IBCX: {
    img: "IBCX.svg",
  },
  IRIS: {
    img: "IRIS.svg",
  },
  KUJI: {
    img: "KUJI.svg",
  },
  LSI: {
    img: "LSI.svg",
  },
  LUNA: {
    img: "LUNA.svg",
  },
  OKB: {
    img: "OKB.svg",
  },
  OKT: {
    img: "OKT.svg",
  },
  OSMO: {
    img: "OSMO.svg",
  },
  RATOM: {
    img: "rATOM.svg",
  },
  rSWTH: {
    img: "rSWTH.svg",
  },
  STATOM: {
    img: "stATOM.svg",
  },
  STEVMOS: {
    img: "stEVMOS.svg",
  },
  STLUNA: {
    img: "stLUNA.svg",
  },
  STOSMO: {
    img: "stOSMO.svg",
  },
  STRD: {
    img: "STRD.svg",
  },
  SWTH: {
    img: "SWTH.svg",
  },
  USC: {
    img: "USC.svg",
  },
  USD: {
    img: "USD.svg",
  },
  USDC: {
    img: "USDC.svg",
  },
  WBTC: {
    img: "WBTC.svg",
  },
  wstETH: {
    img: "wstETH.svg",
  },
  YieldUSD: {
    img: "YieldUSD.svg",
  },
  ZIL: {
    img: "ZIL.svg",
  },
};

export const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});
