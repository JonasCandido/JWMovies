import { Routes, Route,} from 'react-router';

import { Home } from "./pages/home";
import { ItemInfo } from "./pages/iteminfo";
import { Header } from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path=":itemId" element={<ItemInfo />} />
      </Routes>
    </>
  );
};

export default App;
