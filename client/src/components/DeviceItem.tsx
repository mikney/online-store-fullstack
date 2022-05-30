import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {Device} from "../interfaces/Device";

const DeviceItem: FC<{device: Device}> = ({device}) => {
  const navigate = useNavigate()
  console.log(device)
  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={'https://raw.githubusercontent.com/utimur/online-store-full-course/73bb63b6d68dc1de3ffbf00cb96e249a50da503e/client/src/assets/star.png'}/>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;