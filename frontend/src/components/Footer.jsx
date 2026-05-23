function Footer() {

  return (

    <footer className="bg-gradient-to-r from-black via-red-950 to-zinc-900 border-t border-red-900/30 mt-12 shadow-inner">

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-5">

        {/* BRAND INFO */}
        <div className="text-center md:text-left">

          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
            SmartFinance
          </h2>

          <p className="text-gray-400 text-sm mt-2 max-w-md">
            Manage expenses, track spending habits, and build smarter financial decisions with AI-powered insights.
          </p>

          <p className="text-gray-500 text-xs mt-3">
            © {new Date().getFullYear()} SmartFinance. All rights reserved.
          </p>
        </div>

        {/* CONTACT SECTION */}
        <div className="flex flex-col gap-2 text-sm text-gray-300 text-center md:text-right">

          <p className="hover:text-red-300 transition">
            📞 Support: +91 98765 43210
          </p>

          <p className="hover:text-orange-300 transition">
            💬 Customer Care: +91 97531 86420
          </p>

          <p className="text-gray-500 text-xs mt-1">
            Available Mon - Sat | 9 AM - 7 PM
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;