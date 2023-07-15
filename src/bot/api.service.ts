import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { paramsToString } from "./helpers/helpers";
import { AxiosResponse } from "axios";
import { TOrderBooks, TTrade } from "./types/types";

@Injectable()
export class ApiService {
  baseURL: string = "http://tradeapi.bitay.com:9000/";

  baseURLV2: string = "https://api.bitay.com.tr/V2/";

  apiKey: string = "XE+ClMdMob7i63dF9BAirLKFrlmzNNYw";

  secretKey: string = "4mcccEx2NcEBD/5VoBzt5MXsJNtIjlw5";

  private headers: { [key: string]: any } = {};

  constructor(private readonly httpService: HttpService) {}

  private getHeaders() {
    this.headers = {
      "X-BTY-APIKEY": this.apiKey,
      "User-Agent": "PostmanRuntime/7.32.2",
      "Accept": "*/*",
      Connection: "keep-alive",
      ...this.headers,
    };
    return this.headers;
  }

  queryWithHash(params: { [key: string]: any }) {
    var CryptoJS = require("crypto-js");
    params["timestamp"] = new Date().getTime().toString();
    params["signature"] = CryptoJS.HmacSHA256(
      paramsToString(params),
      this.secretKey,
    )
      .toString();
    return params;
  }

  public async resquest(
    endpoint: string,
    params: { [key: string]: any },
    type?: "POST" | "PUT" | "DELETE" | "GET",
    apiBase?: "V1" | "V2",
  ): Promise<AxiosResponse<any, any>> {
    let request;
    let options = {
      method: type,
      headers: this.getHeaders(),
      maxBodyLength: Infinity,
      data: "",
    };
    let link;
    if (apiBase == "V2") link = this.baseURLV2 + endpoint;
    else link = this.baseURL + endpoint;
    params = this.queryWithHash(params);
    let paramsString = paramsToString(params);
    let fullLink = link + "?" + paramsString;
    try {
      request = await this.httpService.axiosRef.request({
        url: fullLink,
        ...options,
      });
    } catch (error) {
      console.log(error);
      try {
        if (request.data.data.status != "success") {
          throw new Error(request.data.message);
        }
      } catch (error) {
        throw new Error("axios request failed");
      }

      throw new Error("axios request failed");
    }

    return request;
  }

  private responsce(request: AxiosResponse<any, any>) {
    let data;
    try {
      return request.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAccount() {
    let request: AxiosResponse<any, any> = await this.resquest(
      "account",
      {},
      "GET",
    );
    return this.responsce(request);
  }

  public async getTrades(symbol: string) {
    let request: AxiosResponse<any, any> = await this.resquest(
      "trades/" + symbol,
      {
        limit: 500,
        //   symbol: symbol,
      },
      "GET",
      "V2",
    );
    return this.responsce(request) as TTrade[];
  }

  public async getOrderBooks(symbol: string) {
    let request: AxiosResponse<any, any> = await this.resquest(
      "orderbook/" + symbol,
      {
        depth: 100,
        //   symbol: symbol,
      },
      "GET",
      "V2",
    );
    return this.responsce(request) as TOrderBooks;
  }

  public async order(
    side: "BUY" | "SELL",
    quantity: number,
    price: number,
    symbol: string,
    type: "LIMIT" | "MARKET",
  ) {
    let request: AxiosResponse<any, any> = await this.resquest(
      "order",
      {
        side: side,
        quantity: quantity,
        price: price,
        symbol: symbol,
        type: type,
      },
      "POST",
    );
    return this.responsce(request);
  }
}
