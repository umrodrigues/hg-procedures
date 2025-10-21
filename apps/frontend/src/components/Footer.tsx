export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Hospital - Sistema de Procedimentos
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Desenvolvido com ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

