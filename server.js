// server.js
import app from './src/app.js'; // Import aplikasi dari app.ts
import { appConfig } from './config/app.config.js'; // Import konfigurasi

// Jalankan server pada port yang ditentukan


app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});
