let BASE_URL: string;

if (process.env.NODE_ENV === 'development') {
    BASE_URL = "http://192.168.2.217:28888/api/"; // 本地开发环境
} else {
    BASE_URL = "http://192.168.0.14:28888/api/"; // 线上生产环境
}
export { BASE_URL };
