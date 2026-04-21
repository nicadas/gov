import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import BankSelection from './BankSelection';

interface SignUpProps {
  cpf: string;
  onBack: () => void;
}

export default function SignUp({ cpf, onBack }: SignUpProps) {
  const [formData, setFormData] = useState({
    agree: false,
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBankSelection, setShowBankSelection] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    message: '',
  });

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agree: e.target.checked,
    });
  };

  const handleCaptchaVerified = () => {
    setCaptchaVerified(true);
  };

  const handleContinue = async () => {
    if (!formData.agree) {
      setModal({
        isOpen: true,
        type: 'error',
        message: 'Você precisa aceitar os Termos de Uso e Política de Privacidade',
      });
      return;
    }

    if (!captchaVerified) {
      setModal({
        isOpen: true,
        type: 'error',
        message: 'Por favor, verifique o reCAPTCHA',
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowBankSelection(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (showBankSelection) {
    return <BankSelection cpf={cpf} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Sem texto BRASIL */}
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-[#1351B4] text-4xl font-bold">gov.br</h1>
          </div>

          <h2 className="text-2xl text-gray-800 mb-2 font-semibold text-center">
            Vamos criar sua conta gov.br
          </h2>

          <p className="text-gray-600 text-sm text-center mb-8">
            Vai ser simples! <br />
            Vamos te guiar durante o processo
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">CPF fornecido:</p>
            <p className="text-lg font-semibold text-[#1351B4]">{cpf}</p>
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agree}
                onChange={handleAgreeChange}
                className="w-5 h-5 text-[#1351B4] rounded focus:ring-2 focus:ring-[#1351B4] mt-0.5"
              />
              <span className="text-sm text-gray-700">
                Li e estou de acordo com o{' '}
                <a href="#" className="text-[#1351B4] hover:underline font-semibold">
                  Termo de Uso
                </a>
                {' '}e{' '}
                <a href="#" className="text-[#1351B4] hover:underline font-semibold">
                  Política de Privacidade
                </a>
              </span>
            </label>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={captchaVerified}
                onChange={handleCaptchaVerified}
                className="w-5 h-5 text-[#1351B4] rounded focus:ring-2 focus:ring-[#1351B4]"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">Não sou um robô</p>
                <p className="text-xs text-gray-500">reCAPTCHA</p>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Privacy - Terms
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-full font-semibold transition-all mb-4 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#1351B4] hover:bg-[#0c3a7d] active:scale-95'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin">⌛</span>
                Processando...
              </span>
            ) : (
              'Continuar'
            )}
          </button>

          <button
            onClick={onBack}
            disabled={isLoading}
            className="w-full text-[#1351B4] py-2 rounded-full font-semibold hover:underline transition-all"
          >
            Voltar ao início
          </button>

          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-[#1351B4] hover:underline flex items-center justify-center gap-1">
              ℹ️ Entenda a conta gov.br
            </a>
          </div>
        </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-lg border-2 max-w-sm w-full p-6 ${
            modal.type === 'success' ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
          }`}>
            <div className="flex items-start gap-4">
              {modal.type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {modal.type === 'success' ? 'Sucesso!' : 'Erro'}
                </h3>
                <p className="text-gray-700 text-sm">{modal.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}