import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';


const App: React.FC = (): JSX.Element => {
  return (
    
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
