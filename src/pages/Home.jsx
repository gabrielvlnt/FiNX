import styles from './Home.module.css'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

const API_KEY = 'MD6LXENAIBLSO72T'

const Home = () => {
  const [coins, setCoins] = useState([]);

  const fetchData = async () => {
    try {
      const symbols = ['AAPL', 'GOOGL', 'BTCUSD', 'TSLA', 'EURUSD', 'USD']
      const responses = await Promise.all(
        symbols.map(symbol =>
          axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`)
        )
      )
      const newData = responses.map((response, idx) => {
        const data = response.data['Time Series (5min)'];
        const times = Object.keys(data); // Últimos 7 intervalos
        console.log(times)
        const history = times.map(time => parseFloat(data[time]['4. close']));
        const latest = data[times[0]];
        const prev = data[times[1]];
        return {
          symbol: symbols[idx],
          name: symbols[idx].includes('USD') ? symbols[idx].replace('USD', '') : symbols[idx],
          price: parseFloat(latest['4. close']),
          change: prev ? ((parseFloat(latest['4. close']) - parseFloat(prev['4. close'])) / parseFloat(prev['4. close']) * 100).toFixed(2) : '0.00',
          history: history,
        };
      });
      setCoins(newData)
    } catch (error){
      console.error('Erro ao buscar dados: ', error)
    }
  }

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(fetchData, 20 * 60 * 1000)

    return () => clearInterval(intervalId)

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