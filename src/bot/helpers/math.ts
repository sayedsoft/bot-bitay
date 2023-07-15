import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";

@Injectable()
export default class MathLibs {
  public static setPrecisionDown(
    value: number | string,
    precision: number,
  ): number {
    if (typeof value == "string") value = parseFloat(value);
    return parseFloat(
      new Decimal(value).toFixed(precision, Decimal.ROUND_DOWN),
    );
  }

  public static setPrecisionUp(
    value: number | string,
    precision: number,
  ): number {
    if (typeof value == "string") value = parseFloat(value);
    return parseFloat(new Decimal(value).toFixed(precision));
  }

  public static percentOf(
    numA: number,
    numB: number,
    precision = 8,
  ): number {
    let p = 0;
    if (numA == numB) return p;
    else if (numA < numB) p = ((numA - numB) / numB) * 100;
    else p = ((numB - numA) / numA) * 100;

    let value = parseFloat(new Decimal(p).toFixed(precision));
    value = value + 100;
    return value;
  }

  public static percent(
    num: number,
    percent_value: number,
    precision = 8,
  ): number {
    const percent: number = (num * percent_value) / 100;
    return parseFloat(new Decimal(percent).toFixed(precision));
  }

  public static addPercent(
    price: number,
    percent: number,
    price_precision: number,
  ): number {
    const percentValue = this.percent(price, percent, price_precision);
    return parseFloat(
      new Decimal(price + percentValue).toFixed(
        price_precision,
        Decimal.ROUND_DOWN,
      ),
    );
  }

  public static minusPercent(
    price: number,
    percent: number,
    price_precision: number,
  ): number {
    const percentValue = this.percent(price, percent, price_precision);
    return parseFloat(
      new Decimal(price - percentValue).toFixed(
        price_precision,
        Decimal.ROUND_DOWN,
      ),
    );
  }

  public static forceTypeNumber(number: any) {
    return parseFloat(number);
  }

  public static forceTypeString(number: any): string {
    return new String(number).toString();
  }
}

export const math = MathLibs;

export const ff = MathLibs.forceTypeNumber;

export const fs = MathLibs.forceTypeString;
