import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class SwapService {
  constructor() {}

  async getSwapRate(ethAmount: number) {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: process.env.WBTC_ADDRESS,
    });
    const btcPrice = response.result.usdPrice;
    const ethPrice = (await Moralis.EvmApi.token.getTokenPrice({
      address: process.env.WETH_ADDRESS,
    })).result.usdPrice;

    const fee = ethAmount * 0.0003; // 0.03%
    const feeInUsd = fee * ethPrice;
    const btcAmount = (ethAmount * ethPrice) / btcPrice;

    return {
      btcAmount,
      fee: {
        eth: fee,
        usd: feeInUsd,
      },
    };
  }
}