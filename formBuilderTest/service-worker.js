self.addEventListener('install', (event) => {
    console.log('Service Worker 安装成功！');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker 激活成功！');
  });
  
  // 此处留空，因为不需要做离线缓存等功能
  self.addEventListener('fetch', (event) => {
    // 什么都不做，默认使用浏览器的请求处理
  });