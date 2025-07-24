import Link from 'next/link'
import React from "react";

function HomePageView() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-200">
        <nav className="max-w-4xl mx-auto flex items-center justify-between p-6">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex space-x-6">
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition"
            >
              Connexion
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition"
            >
              Inscription
            </Link>
            <Link
              href="/gallerie"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition"
            >
              Galerie
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            GALLERIE WEB-APP
          </h1>
          <p className="text-gray-600 mb-8">
            Connectez-vous, inscrivez-vous, et accédez à votre galerie personnelle.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Commencer
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePageView;
