import { useState } from 'react';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface ValidationDataProps {
  cpf: string;
  onBack: () => void;
}

const defaultYears = ['1991', '1989', '1988', '1994', '1992', '1993', '1990'];
const months = [
  'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
  'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
];
const defaultMotherNames = [
  'SELENE', 'APRIL', 'ANDRIA', 'MARLI', 'ELDA', 'OLIVIA',
  'DILMA', 'MARIA', 'SANDRA', 'PATRICIA', 'FERNANDA', 'ROSANA'
];

export default function ValidationData({ cpf, onBack }: ValidationDataProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [customYears, setCustomYears] = useState<string[]>([]);
  const [showCustomYearInput, setShowCustomYearInput] = useState(false);
  const [customYearValue, setCustomYearValue] = useState('');
  
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  
  const [selectedMotherName, setSelectedMotherName] = useState<string | null>(null);
  const [customMotherNames, setCustomMotherNames] = useState<string[]>([]);
  const [showCustomMotherInput, setShowCustomMotherInput] = useState(false);
  const [customMotherValue, setCustomMotherValue] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  // Lista completa de anos (padrão + personalizados)
  const allYears = [...defaultYears, ...customYears];
  
  // Lista completa de nomes (padrão + personalizados)
  const allMotherNames = [...defaultMotherNames, ...customMotherNames];

  // Validar apenas números para o ano
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCustomYearValue(value);
    }
  };

  // Validar apenas letras para o nome
  const handleMotherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setCustomMotherValue(value.toUpperCase());
  };

  // Adicionar ano personalizado
  const addCustomYear = () => {
    if (customYearValue.length === 4 && !allYears.includes(customYearValue)) {
      setCustomYears([...customYears, customYearValue]);
      setSelectedYear(customYearValue);
      setShowCustomYearInput(false);
      setCustomYearValue('');
    }
  };

  // Adicionar nome personalizado
  const addCustomMotherName = () => {
    if (customMotherValue.length >= 2 && !allMotherNames.includes(customMotherValue)) {
      setCustomMotherNames([...customMotherNames, customMotherValue]);
      setSelectedMotherName(customMotherValue);
      setShowCustomMotherInput(false);
      setCustomMotherValue('');
    }
  };

  const isFormComplete = selectedYear && selectedMonth && selectedMotherName;

  const handleContinue = async () => {
    if (!isFormComplete) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Campos Incompletos',
        message: 'Por favor, preencha todas as perguntas de segurança.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Sucesso!',
        message: 'Seus dados foram validados com sucesso! Sua conta prata foi criada.',
      });
      setTimeout(() => {
        onBack();
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm font-semibold mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Criar conta com CPF
        </button>
      </header>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Criar conta com CPF</h1>

          {/* Steps */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">1</div>
              <span className="text-xs text-gray-600 text-center">Dados Cadastrais</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 mt-4"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1351B4] text-white flex items-center justify-center text-sm font-semibold">2</div>
              <span className="text-xs font-semibold text-[#1351B4] text-center">Validar Dados</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 mt-4"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">3</div>
              <span className="text-xs text-gray-600 text-center">Habilitar Cadastro</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 mt-4"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">4</div>
              <span className="text-xs text-gray-600 text-center">Cadastrar Senha</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-8">
            Por questões de segurança, você deverá responder algumas perguntas para validarmos seus dados.
          </p>

          {/* Question 1: ano de nascimento */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Qual é o seu ano de nascimento?</h2>
            <div className="flex flex-wrap gap-3">
              {allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedYear === year
                      ? 'bg-[#1351B4] text-white border-2 border-[#1351B4]'
                      : 'bg-white border-2 border-[#1351B4] text-[#1351B4] hover:bg-blue-50'
                  }`}
                >
                  {year}
                </button>
              ))}
              <button
                onClick={() => setShowCustomYearInput(!showCustomYearInput)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all bg-white border-2 border-[#1351B4] text-[#1351B4] hover:bg-blue-50"
              >
                + Outro
              </button>
            </div>
            
            {showCustomYearInput && (
              <div className="mt-4 flex gap-3">
                <input
                  type="text"
                  value={customYearValue}
                  onChange={handleYearChange}
                  placeholder="Digite o ano (ex: 1995)"
                  maxLength={4}
                  className="px-4 py-2 border-2 border-[#1351B4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1351B4] w-32"
                  autoFocus
                />
                <button
                  onClick={addCustomYear}
                  disabled={customYearValue.length !== 4}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    customYearValue.length === 4
                      ? 'bg-[#1351B4] text-white hover:bg-[#0c3a7d]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setShowCustomYearInput(false);
                    setCustomYearValue('');
                  }}
                  className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Question 2: data de nascimento */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Qual é o seu mês de nascimento?</h2>
            <div className="flex flex-wrap gap-3">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedMonth === month
                      ? 'bg-[#1351B4] text-white border-2 border-[#1351B4]'
                      : 'bg-white border-2 border-[#1351B4] text-[#1351B4] hover:bg-blue-50'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Mother Name */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">3. Qual é o primeiro nome da sua mãe?</h2>
            <div className="flex flex-wrap gap-3">
              {allMotherNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedMotherName(name)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedMotherName === name
                      ? 'bg-[#1351B4] text-white border-2 border-[#1351B4]'
                      : 'bg-white border-2 border-[#1351B4] text-[#1351B4] hover:bg-blue-50'
                  }`}
                >
                  {name}
                </button>
              ))}
              <button
                onClick={() => setShowCustomMotherInput(!showCustomMotherInput)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all bg-white border-2 border-[#1351B4] text-[#1351B4] hover:bg-blue-50"
              >
                + Outro
              </button>
            </div>
            
            {showCustomMotherInput && (
              <div className="mt-4 flex gap-3 flex-wrap">
                <input
                  type="text"
                  value={customMotherValue}
                  onChange={handleMotherChange}
                  placeholder="Digite o nome da sua mãe"
                  className="flex-1 px-4 py-2 border-2 border-[#1351B4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1351B4] uppercase"
                  autoFocus
                />
                <button
                  onClick={addCustomMotherName}
                  disabled={customMotherValue.length < 2}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    customMotherValue.length >= 2
                      ? 'bg-[#1351B4] text-white hover:bg-[#0c3a7d]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setShowCustomMotherInput(false);
                    setCustomMotherValue('');
                  }}
                  className="px-4 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={onBack}
              disabled={isLoading}
              className="px-6 py-3 border-2 border-[#1351B4] text-[#1351B4] rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Voltar
            </button>

            <button
              onClick={handleContinue}
              disabled={!isFormComplete || isLoading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isFormComplete && !isLoading
                  ? 'bg-[#1351B4] text-white hover:bg-[#0c3a7d] active:scale-95'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block animate-spin">⌛</span>
                  Validando...
                </span>
              ) : (
                'Continuar'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white rounded-lg shadow-lg border-2 max-w-sm w-full p-6 ${
              modal.type === 'success'
                ? 'border-green-300 bg-green-50'
                : 'border-red-300 bg-red-50'
            }`}
          >
            <div className="flex items-start gap-4">
              {modal.type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{modal.title}</h3>
                <p className="text-gray-700 text-sm">{modal.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}