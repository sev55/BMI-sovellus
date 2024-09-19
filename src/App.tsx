import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [pituus, setPituus] = useState<string>('');
  const [paino, setPaino] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  const laskeBMI = () => {
    const pituusMetreinä = Number(pituus) / 100;
    const painoKg = Number(paino);
    
    if (pituusMetreinä > 0 && painoKg > 0) {
      const bmiValue = painoKg / (pituusMetreinä * pituusMetreinä);
      const pyöristettyBmi = parseFloat(bmiValue.toFixed(2));
      setBmi(pyöristettyBmi);
      setBmiCategory(getBmiCategory(pyöristettyBmi));
    }
  };

  const getBmiCategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Alipaino';
    if (bmi >= 18.5 && bmi < 25) return 'Normaali paino';
    if (bmi >= 25 && bmi < 30) return 'Lievä ylipaino';
    if (bmi >= 30 && bmi < 35) return 'Merkittävä ylipaino';
    if (bmi >= 35 && bmi < 40) return 'Vaikea ylipaino';
    return 'Sairaalloinen ylipaino';
  };

  const getBmiStyle = (): string => {
    if (bmi === null) return '';
    if (bmi < 18.5) return 'alipaino';
    if (bmi >= 18.5 && bmi < 25) return 'normaali';
    if (bmi >= 25 && bmi < 30) return 'lievä';
    if (bmi >= 30 && bmi < 35) return 'merkittävä';
    if (bmi >= 35 && bmi < 40) return 'vaikea';
    return 'sairaalloinen';
  };

  return (
    <div className="App">
      <h1>Painoindeksilaskuri</h1>
      <div>
        <label>
          Pituus (cm):
          <input
            type="text"
            value={pituus}
            onChange={(e) => setPituus(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Paino (kg):
          <input
            type="text"
            value={paino}
            onChange={(e) => setPaino(e.target.value)}
          />
        </label>
      </div>
      <button onClick={laskeBMI}>Laske painoindeksi</button>
      {bmi !== null && (
        <div className={`tulos ${getBmiStyle()}`}>
          <p>Painoindeksi on: {bmi}</p>
          <p>{bmiCategory}</p>
        </div>
      )}
    </div>
  );
};

export default App;