import RootLayout from "./layouts/root-layout";
import Loader from "./app/common/loader";
import ScrollToTop from "./globals/scroll-to-top";
import { useState } from "react";
import { AuthProvider } from "./app/context/auth/AuthContext";
import { UserProvider } from "./app/context/auth/UserContext";

function App() {

  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
		<UserProvider>
			<AuthProvider>
				{isLoading && <Loader />}
				<ScrollToTop />
				<RootLayout />
			</AuthProvider>
		</UserProvider>
	);
}

export default App;