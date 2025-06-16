// next.config.js
const withTM = require('next-transpile-modules')([
  'antd',
  'rc-util',
  'rc-picker',
  'rc-select',
  'rc-field-form',
  '@ant-design/icons',
]); // <- Add all relevant Ant Design internal packages

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Do not include `swcMinify` if you're using Next.js 15 — it’s removed
};

module.exports = withTM(nextConfig);
