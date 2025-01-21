import RootLayout from "./layouts/root-layout";
import Loader from "./app/common/loader";
import ScrollToTop from "./globals/scroll-to-top";
import { useState } from "react";
import { AuthProvider } from "./app/context/auth/AuthContext";

function App() {

  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
		<AuthProvider>
			{isLoading && <Loader />}
			<ScrollToTop />
			<RootLayout />
		</AuthProvider>
	);
}

export default App;