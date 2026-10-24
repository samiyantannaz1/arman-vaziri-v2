const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// مسیر فایل‌های پوشه public را با basePath می‌سازد.
// برای همه عکس‌ها از این استفاده می‌کنیم.
export const asset = (path: string) => `${BASE}${path}`;