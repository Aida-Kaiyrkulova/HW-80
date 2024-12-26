import { Route, Routes } from "react-router-dom";
import UrlForm from "./features/containers/UrlForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UrlForm />} />
        <Route path="/:shortUrl" element={<UrlForm />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
