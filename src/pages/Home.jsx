import styles from './Home.module.css'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const mockData = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: 189.12,
    change: 1.23,
    history: [180, 182, 185, 187, 189, 188, 189.12],
  },
  {
    symbol: 'GOOGL',
    name: 'Google',
    price: 2734.87,
    change: -0.56,
    history: [2700, 2710, 2720, 2730, 2734, 2735, 2734.87],
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 65000,
    change: 2.1,
    history: [60000, 61000, 62000, 63000, 64000, 64500, 65000],
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.18,
    change: 4.5,
    history: [0.15, 0.16, 0.17, 0.18, 0.17, 0.18, 0.18],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3400.55,
    change: 1.8,
    history: [3200, 3250, 3300, 3350, 3400, 3390, 3400.55],
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ',
    price: 15500.12,
    change: 0.9,
    history: [15000, 15100, 15200, 15300, 15400, 15500, 15500.12],
  },
  {
    symbol: 'S&P500',
    name: 'S&P 500',
    price: 5200.33,
    change: 0.7,
    history: [5000, 5050, 5100, 5150, 5180, 5200, 5200.33],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    price: 410.22,
    change: 0.5,
    history: [400, 402, 405, 408, 410, 409, 410.22],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    price: 3700.44,
    change: -1.2,
    history: [3600, 3620, 3650, 3680, 3700, 3690, 3700.44],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    price: 900.88,
    change: 2.7,
    history: [850, 860, 870, 880, 890, 900, 900.88],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 145.32,
    change: 3.2,
    history: [120, 125, 130, 135, 140, 143, 145.32],
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro/Dólar',
    price: 1.085,
    change: -0.2,
    history: [1.08, 1.09, 1.10, 1.09, 1.08, 1.085, 1.085],
  },
];

const Home = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    // Aqui você pode substituir pelo fetch da API real
    setCoins(mockData);
  }, []);

  return (
    <section className={styles.home}>
      <h1 className={styles.title}>Mercado de Ações & Cripto</h1>
      <div className={styles.grid}>
        {coins.map((coin, idx) => (
          <div className={styles.card} key={coin.symbol} style={{ animationDelay: `${idx * 0.2}s` }}>
            <div className={styles.cardHeader}>
              <span className={styles.symbol}>{coin.symbol}</span>
              <span className={styles.name}>{coin.name}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.price}>${coin.price.toLocaleString()}</span>
              <span className={coin.change >= 0 ? styles.up : styles.down}>
                {coin.change >= 0 ? '+' : ''}{coin.change}%
              </span>
            </div>
            <div className={styles.chartWrapper}>
              <Line
                data={{
                  labels: Array(coin.history.length).fill(''),
                  datasets: [
                    {
                      data: coin.history,
                      borderColor: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      pointRadius: 0,
                      tension: 0.4,
                      fill: true,
                      borderWidth: 3,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: { line: { borderCapStyle: 'round' } },
                  animation: { duration: 1200 },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={60}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;