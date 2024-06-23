const WowBannerGenerator = require("./index");
const {writeFile} = require("node:fs");

const WOW_API_TOKEN = process.env.WOW_API_TOKEN;

let WBG = new WowBannerGenerator(WOW_API_TOKEN);
WBG.generateInstanceBanner(1200, "fr_FR", "eu").then(r => {
    let filename = "output/" + Date.now() + ".jpg";
    writeFile(filename, r, "binary", (err) => {
        if (!err) console.log(`${filename} created successfully!`);
        else
            console.log(err);
    })
});
