import { Shield, QrCode, FileText, HelpCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1351B4] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded"></div>
          <span className="text-white text-sm">BRASIL</span>
        </div>
        <div className="flex items-center gap-6 text-white text-sm">
          <button className="flex items-center gap-1 hover:underline">
            <span>🇧🇷</span>
            <span>Mais Cidadania</span>
          </button>
          <button className="flex items-center gap-1 hover:underline">
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
              <h1 className="text-[#1351B4] text-4xl">gov.br</h1>
            </div>

            <h2 className="text-2xl text-gray-800 mb-6">Identifique-se no gov.br com:</h2>

            {/* Login Options */}
            <div className="space-y-4 mb-6">
              {/* CPF/Email Input */}
              <div>
                <label htmlFor="cpf" className="block text-sm text-gray-700 mb-2">
                  Número do CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1351B4] focus:border-transparent"
                />
              </div>

              <button className="w-full bg-[#1351B4] text-white py-3 rounded hover:bg-[#0c3a7d] transition-colors">
                Continuar
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
              <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#1351B4]" />
                  <span className="text-gray-800">Login com gov.br</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">CONFIÁVEL</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <QrCode className="w-5 h-5 text-[#1351B4]" />
                <span className="text-gray-800">QR code</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-[#1351B4]" />
                <span className="text-gray-800">Seu certificado digital ou token</span>
              </button>
            </div>

            {/* Help Links */}
            <div className="mt-8 space-y-2">
              <button className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Esqueci minha senha ou quero me cadastrar</span>
              </button>
              <button className="flex items-center gap-2 text-[#1351B4] hover:underline text-sm ml-6">
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
    </div>
  );
}