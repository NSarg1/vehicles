import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router'; // Use HashRouter instead of BrowserRouter
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

import App from './app/App.tsx';

import '@ant-design/v5-patch-for-react-19';
import 'src/configs/axios.config';
import 'src/styles/index.scss';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 0 },
  },
});

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <App />
      </ConfigProvider>
      <Toaster />
    </QueryClientProvider>
  </HashRouter>,
);
