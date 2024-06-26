# Wow Banner Generator
This package allow you to simply make pretty card for World Of Warcraft instance.

### Banner example
>This banner was created by the example bellow.
> 
> ![Banner Example](https://i.imgur.com/oPYSrlT.png)

### Build
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/k0bus/wow-banner-generator/test-push.yml?style=for-the-badge)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/k0bus/wow-banner-generator/master?style=for-the-badge&label=Version)

### Issues / Pull Requests
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/k0bus/wow-banner-generator?style=for-the-badge)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-closed/k0bus/wow-banner-generator?style=for-the-badge)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/k0bus/wow-banner-generator?style=for-the-badge)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-closed/k0bus/wow-banner-generator?style=for-the-badge)

## Installation
`npm install wow-banner-generator`

## Dependency
- [canvas](https://www.npmjs.com/package/canvas)
- [canvas-image-cover](https://www.npmjs.com/package/canvas-image-cover)

## Usage

### Initializing API
```javascript
const WowBannerGenerator = require("wow-banner-generator");
let WBG = new WowBannerGenerator(WOW_API_TOKEN);
```

### Usage

These line come from my test.js
Image returned is a Buffer
This example show you how to generate instance image and save it in a directory.

For the localisation / region you can refer to BattleNet documentation.
- [Localization](https://develop.battle.net/documentation/world-of-warcraft/guides/localization)
- [Region](https://develop.battle.net/documentation/world-of-warcraft/guides/namespaces)

```javascript
    WBG.generateInstanceBanner(1200, "fr_FR", "eu").then(r => {
        let filename = "output/" + Date.now() + ".jpg";
        writeFile(filename, r, "binary", (err) => {
            if (!err) console.log(`${filename} created successfully!`);
            else
                console.log(err);
        })
    });
```

## Contributing
Anyone can contribute via [Github Pull Request](https://github.com/K0bus/wow-banner-generator/pulls)

## Issues
Any issue had to be reported in [Github Issues](https://github.com/K0bus/wow-banner-generator/issues)