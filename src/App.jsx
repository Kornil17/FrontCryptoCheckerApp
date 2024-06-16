import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Menu, Spin} from 'antd';
import CryptoCurrencyCard from "./components/CryptoCurrencyapp.jsx";
import axios from 'axios';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(9851)
  const [currencyData, setCurrencyData] = useState(null)

  const fetchCurrencies = () => {
    axios.get('http://192.168.0.191:7777/cryptocurrencies').then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        getItem('Список криптовалют', 'g1', null,
          currenciesResponse.map(c => {
            return {label: c.name, key: c.id}
          }),
          'group'
        )
      ]
      setCurrencies(menuItems)
    })
  }

  const fetchCurrency = () => {
    axios.get(`http://192.168.0.191:7777/cryptocurrency/${currencyId}`).then(r => {
      setCurrencyData(r.data)
    })
  }

  useEffect(() => {
    fetchCurrencies()
  }, []);


  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency()
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  return (
    <div className="flex ">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? <CryptoCurrencyCard currency={currencyData}/> : <Spin size="large"/>}
      </div>
    </div>
  );
};
export default App;