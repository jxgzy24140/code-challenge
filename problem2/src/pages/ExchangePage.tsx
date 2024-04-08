import { Col } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ExchangeForm from "../components/ExchangeForm";
import { coinImageFormat } from "../utils";

interface IExchangeSelected {
  currency: string;
  price: number;
  value: number;
}

const ExchangePage = () => {
  const [currencies, setCurrencies] = useState<any>();
  const [currencyOptions, setCurrencyOptions] = useState<any>();
  const [firstSelected, setFirstSelected] = useState<IExchangeSelected>({
    currency: "",
    price: 0,
    value: 0,
  });
  const [secondSelected, setSecondSelected] = useState<IExchangeSelected>({
    currency: "",
    price: 0,
    value: 0,
  });

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response: any = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );
      if (response && response.status === 200) {
        const data: any[] = [];
        const currencies: any = {};
        let uniqueDataMap = new Map();
        response.data = response.data.sort((a: any, b: any) => {
          const dateA: Date = new Date(a.date);
          const dateB: Date = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        response.data.forEach((item: any) => {
          let currency = item.currency;
          if (!uniqueDataMap.has(currency)) {
            uniqueDataMap.set(currency, item);
          }
        });
        const uniqueData = Array.from(uniqueDataMap.values());

        uniqueData?.forEach((item) => {
          currencies[item.currency] = item.price;

          data.push({
            label: (
              <span className="flex justify-start items-center">
                <img
                  alt="item"
                  src={require(`../assets/coinImages/${
                    coinImageFormat[item.currency]["img"]
                  }`)}
                  className="w-[20px] pr-2"
                />
                <p>{item.currency}</p>
              </span>
            ),
            value: item.currency,
          });
        });
        setCurrencies(currencies);
        setFirstSelected({
          value: 1,
          currency: response.data[0].currency,
          price: response.data[0].price,
        });
        setSecondSelected({
          currency: response.data[1].currency,
          value: response.data[1].price,
          price: response.data[1].price,
        });
        setCurrencyOptions(data);
      }
    };
    fetchCurrencies();
  }, []);

  const onFirstSelectedChange = ({ type, payload }: any) => {
    if (type === "value") {
      setFirstSelected({
        ...firstSelected,
        value: payload,
      });
      setSecondSelected({
        ...secondSelected,
        value: payload * (firstSelected.price / secondSelected.price),
      });
    } else {
      setFirstSelected({
        ...firstSelected,
        currency: payload,
        price: currencies[payload],
      });
      setSecondSelected({
        ...secondSelected,
        value:
          firstSelected.value * (currencies[payload] / secondSelected.price),
      });
    }
  };

  const onSecondSelectedChange = ({ type, payload }: any) => {
    if (type === "value") {
      setSecondSelected({
        ...secondSelected,
        value: payload,
      });
      setFirstSelected({
        ...firstSelected,
        value: payload * (firstSelected.price / secondSelected.price),
      });
    } else {
      setSecondSelected({
        ...secondSelected,
        value:
          firstSelected.value * (firstSelected.price / currencies[payload]),
        currency: payload,
        price: currencies[payload],
      });
    }
  };

  const onRevert = () => {
    if (firstSelected && secondSelected) {
      setFirstSelected({
        currency: secondSelected.currency,
        value: firstSelected.value,
        price: secondSelected.price,
      });
      setSecondSelected({
        currency: firstSelected.currency,
        value:
          firstSelected.value * (firstSelected.price / secondSelected.price),
        price: firstSelected.price,
      });
    }
  };

  const onClearInput = () => {
    if (firstSelected && secondSelected) {
      setFirstSelected({
        currency: firstSelected.currency,
        value: 1,
        price: firstSelected.price,
      });
      setSecondSelected({
        currency: secondSelected.currency,
        value: 1 * (firstSelected.price / secondSelected.price),
        price: secondSelected.price,
      });
    }
  };
  console.log("re-render");

  return (
    <Col className="min-h-screen flex justify-center items-center bg-[#34e8eb]">
      <ExchangeForm
        currencyOptions={currencyOptions?.length && currencyOptions}
        firstSelected={firstSelected}
        onFirstSelectedChange={onFirstSelectedChange}
        onSecondSelectedChange={onSecondSelectedChange}
        secondSelected={secondSelected}
        onRevert={onRevert}
        onClear={onClearInput}
      />
    </Col>
  );
};

export default ExchangePage;
