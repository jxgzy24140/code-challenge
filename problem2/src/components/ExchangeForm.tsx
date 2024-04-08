import { Row, Col, Input, Select, Button } from "antd";
import TwoWaysArrow from "../assets/arrow.svg";

interface IProps {
  currencyOptions: any;
  firstSelected: any;
  onFirstSelectedChange: ({ type, payload }: any) => void;
  secondSelected: any;
  onSecondSelectedChange: ({ type, payload }: any) => void;
  onRevert: () => void;
  onClear: () => void;
}

const ExchangeForm = (props: IProps) => {
  const {
    currencyOptions,
    firstSelected,
    onFirstSelectedChange,
    secondSelected,
    onSecondSelectedChange,
    onRevert,
    onClear,
  } = props;

  return (
    <Row className="justify-center items-center p-10 gap-2 rounded-3xl bg-white">
      <Col>
        <p>Số tiền</p>
        <Row className="w-full justify-center items-center py-2">
          <Input
            type="number"
            defaultValue="1"
            value={firstSelected?.value}
            className="w-full relative py-2 pr-[80px]"
            onChange={(e) =>
              onFirstSelectedChange({
                type: "value",
                payload: e.target.value,
              })
            }
          />
          {currencyOptions && (
            <Select
              options={currencyOptions}
              defaultValue={firstSelected?.currency}
              value={firstSelected?.currency}
              onChange={(e) => {
                onFirstSelectedChange({
                  type: "currency",
                  payload: e,
                });
              }}
              className="w-auto absolute right-[5px]"
              bordered={false}
            />
          )}
        </Row>
        {currencyOptions && (
          <Row className="flex-col">
            <p className="text-lg">
              {firstSelected?.value} {firstSelected?.currency} ={" "}
              {firstSelected?.value *
                (firstSelected.price / secondSelected.price)}{" "}
              {secondSelected?.currency}
            </p>
            <p className="text-sm">
              Mid-market exchange rate at {new Date().toLocaleString()}
            </p>
          </Row>
        )}
      </Col>
      <Col>
        <Row className="flex-col items-center">
          <h2>Exchange Rate</h2>
          <img
            src={TwoWaysArrow}
            alt=""
            className="w-[120px] h-[40px] cursor-pointer"
            onClick={onRevert}
          />
          <h2>
            {firstSelected?.currency}/{secondSelected?.currency} is at{" "}
            {firstSelected?.price / secondSelected?.price}
          </h2>
        </Row>
      </Col>
      <Col>
        <p>Chuyễn đổi thành</p>
        <Row className="justify-center items-center py-2">
          <Input
            type="number"
            value={
              firstSelected?.value *
                (firstSelected?.price / secondSelected?.price) ??
              secondSelected?.value
            }
            className="w-full relative py-2 pr-[80px]"
            onChange={(e) => {
              onFirstSelectedChange({
                type: "currency",
                payload: e.target.value,
              });
            }}
          />
          {currencyOptions && (
            <Select
              options={currencyOptions}
              defaultValue={secondSelected?.currency}
              value={secondSelected?.currency}
              onChange={(e) => {
                onSecondSelectedChange({
                  type: "currency",
                  payload: e,
                });
              }}
              className="w-auto absolute right-[5px]"
              bordered={false}
            />
          )}
        </Row>
        <Row className="flex-col">
          {/* <p className="text-lg">1,000 VND = 0,00004006 USD</p>
          <p className="text-sm">Mid-market exchange rate at 11:00</p> */}
          <Button type="primary" onClick={onClear}>
            Refresh rate
          </Button>
        </Row>
      </Col>
    </Row>
  );
};
export default ExchangeForm;
