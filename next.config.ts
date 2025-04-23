import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    console.log("🚀 Webpack is being used instead of Turbopack!");

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "prefixIds",
                  params: {
                    prefix: "",
                    delim: "",
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "prefixIds",
                      params: {
                        prefix: "",
                        delim: "",
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "*.ts",
        },
      },
    },
  },
};

module.exports = nextConfig;
