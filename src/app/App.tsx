import { useState } from 'react';
import { Shield, QrCode, FileText, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

// CPF Validation Function
const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  // Validate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(cleaned[9]) !== digit1) return false;
  
  // Validate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cleaned[10]) === digit2;
};

// Format CPF Function
const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
  
  if (!match) return value;
  
  let formatted = match[1];
  if (match[2]) formatted += '.' + match[2];
  if (match[3]) formatted += '.' + match[3];
  if (match[4]) formatted += '-' + match[4];
  
  return formatted;
};

interface ModalState {
  isOpen: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export default function App() {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  // CPF Login Handler
  const handleContinue = async () => {
    if (!cpf.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Campo Vazio',
        message: 'Por favor, insira seu CPF para continuar.',
      });
      return;
    }

    if (!validateCPF(cpf)) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'CPF Inválido',
        message: 'O CPF informado não é válido. Verifique e tente novamente.',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Sucesso!',
        message: `CPF ${cpf} validado com sucesso. Redirecionando...`,
      });
      
      // Aqui você faria a chamada real para sua API:
      // const response = await fetch('/api/auth/cpf', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cpf })
      // });
      // const data = await response.json();
      // if (data.success) { window.location.href = '/dashboard'; }
    } finally {
      setIsLoading(false);
    }
  };

  // Gov.br Login Handler
  const handleGovBrLogin = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Login Gov.br',
      message: 'Você será redirecionado para o portal oficial do gov.br para autenticação segura.',
    });
    
    setTimeout(() => {
      // window.location.href = 'https://acesso.gov.br';
      console.log('Redirecionando para gov.br...');
    }, 2000);
  };

  // QR Code Handler
  const handleQRCode = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Leitura de QR Code',
      message: 'Abra a câmera do seu dispositivo e aponte para o QR Code.',
    });
  };

  // Certificate/Token Handler
  const handleCertificate = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Certificado Digital',
      message: 'Selecione seu certificado digital ou token para autenticação.',
    });
  };

  // Forgot Password Handler
  const handleForgotPassword = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Recuperação de Senha',
      message: 'Você será redirecionado para a página de recuperação de senha.',
    });
    
    setTimeout(() => {
      // window.location.href = '/forgot-password';
      console.log('Redirecionando...');
    }, 2000);
  };

  // Help Handler
  const handleHelp = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Sobre Gov.br',
      message: 'Gov.br é o portal único de acesso aos serviços digitais do governo brasileiro.',
    });
  };

  // Header Button Handlers
  const handleMoreCitizenship = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Mais Cidadania',
      message: 'Portal de serviços e informações para cidadãos brasileiros.',
    });
  };

  const handleAccess = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Acessibilidade',
      message: 'Opções de acessibilidade e ferramentas de navegação.',
    });
  };

  // Close Modal
  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const getModalStyles = () => {
    switch (modal.type) {
      case 'success':
        return 'border-green-300 bg-green-50';
      case 'error':
        return 'border-red-300 bg-red-50';
      default:
        return 'border-blue-300 bg-blue-50';
    }
  };

  const getIconColor = () => {
    switch (modal.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1351B4] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded"></div>
          <span className="text-white text-sm font-semibold">BRASIL</span>
        </div>
        <div className="flex items-center gap-6 text-white text-sm">
          <button 
            onClick={handleMoreCitizenship}
            className="flex items-center gap-1 hover:underline transition-all cursor-pointer"
          >
            <span>🇧🇷</span>
            <span>Mais Cidadania</span>
          </button>
          <button 
            onClick={handleAccess}
            className="flex items-center gap-1 hover:underline transition-all cursor-pointer"
          >
            <span>🔍</span>
            <span>Acesse</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#FFCD07]">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop"
            alt="Brazilian citizen"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-16">
            <div className="mb-8">
              <h1 className="text-[#1351B4] mb-4">
                <span className="text-5xl">gov.br</span>
              </h1>
              <p className="text-[#1351B4] text-xl max-w-md leading-relaxed">
                <strong>uma porta única</strong> garantindo a autenticação de cada cidadão que acessa os serviços digitais do governo
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <h1 className="text-[#1351B4] text-4xl font-bold">gov.br</h1>
            </div>

            <h2 className="text-2xl text-gray-800 mb-6 font-semibold">Identifique-se no gov.br com:</h2>

            {/* Login Options */}
            <div className="space-y-4 mb-6">
              {/* CPF/Email Input */}
              <div>
                <label htmlFor="cpf" className="block text-sm text-gray-700 mb-2 font-medium">
                  Número do CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  maxLength={14}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1351B4] focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>

              <button 
                onClick={handleContinue}
                disabled={isLoading}
                className={`w-full text-white py-3 rounded font-semibold transition-all ${
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
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">ou</span>
              </div>
            </div>

            {/* Alternative Login Methods */}
            <div className="space-y-3">
              <button 
                onClick={handleGovBrLogin}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#1351B4]" />
                  <span className="text-gray-800 font-medium">Login com gov.br</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">CONFIÁVEL</span>
              </button>

              <button 
                onClick={handleQRCode}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors active:scale-95"
              >
                <QrCode className="w-5 h-5 text-[#1351B4]" />
                <span className="text-gray-800 font-medium">QR code</span>
              </button>

              <button 
                onClick={handleCertificate}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors active:scale-95"
              >
                <FileText className="w-5 h-5 text-[#1351B4]" />
                <span className="text-gray-800 font-medium">Seu certificado digital ou token</span>
              </button>
            </div>

            {/* Help Links */}
            <div className="mt-8 space-y-2">
              <button 
                onClick={handleForgotPassword}
                className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm transition-all active:scale-95"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Esqueci minha senha ou quero me cadastrar</span>
              </button>
              <button 
                onClick={handleHelp}
                className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm ml-6 transition-all active:scale-95"
              >
                <span>Dúvidas sobre o que é Gov.br e Navegador</span>
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-xs text-gray-500">
              <p>Política de Privacidade e Termos de Uso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-lg border-2 ${getModalStyles()} max-w-sm w-full p-6 animate-in`}>
            <div className="flex items-start gap-4">
              {modal.type === 'success' && <CheckCircle className={`w-6 h-6 ${getIconColor()} flex-shrink-0 mt-0.5`} />}
              {modal.type === 'error' && <AlertCircle className={`w-6 h-6 ${getIconColor()} flex-shrink-0 mt-0.5`} />}
              {modal.type === 'info' && <AlertCircle className={`w-6 h-6 ${getIconColor()} flex-shrink-0 mt-0.5`} />}
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{modal.title}</h3>
                <p className="text-gray-700 text-sm">{modal.message}</p>
              </div>
            </div>
            
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-[#1351B4] text-white py-2 rounded font-semibold hover:bg-[#0c3a7d] transition-colors active:scale-95"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
