export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Hospital</h3>
            <p className="text-gray-400 text-sm">
              Sistema de documentação e procedimentos médicos hospitalares.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: contato@hospital.com.br</li>
              <li>Tel: (00) 0000-0000</li>
              <li>Endereço: Rua Exemplo, 123</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Informações</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Política de Privacidade</li>
              <li>Termos de Uso</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Hospital. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

