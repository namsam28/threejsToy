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

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [
        {
          loader: 'raw-loader'
        },
      ]
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.glsl": {
          loaders: ["raw-loader"],
          as : "*.ts",
        },
        "*.vert": {
          loaders: ["raw-loader"],
          as : "*.ts",
        },
        "*.frag": {
          loaders: ["raw-loader"],
          as : "*.ts",
        },
        "*.vs": {
          loaders: ["raw-loader"],
          as : "*.ts",
        },
        "*.fs": {
          loaders: ["raw-loader"],
          as : "*.ts",
        },
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
  transpilePackages:['three']
};

module.exports = nextConfig;
