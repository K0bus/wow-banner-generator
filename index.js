const { createCanvas, Image, registerFont} = require("canvas");
const cover = require('canvas-image-cover');
const https = require("https");

function WBG(token) {
    this.token = token;
}

/**
 * @param {int} instanceID The instance ID
 * @param {string} locale Localisation string
 * @param {string} region Region string
 *
 * @return {Promise<Buffer>} The image added to Buffer to be used
 */
WBG.prototype.generateInstanceBanner =
    async function(instanceID, locale = "en_US", region = "us") {
        return new Promise((resolve) => {
            this.getData("https://" + region + ".api.blizzard.com/data/wow/journal-instance/" + instanceID + "?namespace=static-" + region + "&locale=" + locale).then((instanceData) => {
                this.getData("https://" + region + ".api.blizzard.com/data/wow/media/journal-instance/" + instanceID + "?namespace=static-" + region + "&locale=" + locale).then((mediaData) => {
                    this.generateBannerRaw(mediaData.assets[0].value, instanceData.name, 1530, 383).then(buffer => {
                        resolve(buffer);
                    });
                })
            })
        });
    };

/**
 * @param {string} url The background image URL (can be local)
 *
 * @return {Promise<any>} The image added to Buffer to be used
 */
WBG.prototype.getData =
    async function(url)
    {
        return new Promise((resolve) => {
            https.get(url + '&access_token=' + this.token, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    resolve(JSON.parse(data));
                })
            });
        });
    }

/**
 * @param {string} url The background image URL (can be local)
 * @param {string} text The centered text
 * @param {int} width The final image width
 * @param {int} height The final image height
 *
 * @return {Promise<Buffer>} The image added to Buffer to be used
 */
WBG.prototype.generateBannerRaw =
    async function (url, text, width, height)
    {
        return new Promise((resolve) => {

            const canvas = createCanvas(width, height);
            const context = canvas.getContext("2d");

            context.fillStyle = "#764abc";
            context.fillRect(0, 0, width, height);

            const img = new Image;

            img.onload = function(){

                cover(img, 0, 0, canvas.width, canvas.height).render(context);

                //context.drawImage(img, 0, 0);

                text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

                let size = Math.min(Math.floor(canvas.width / text.length),140)*1.8

                registerFont("./assets/fonts/LifeCraft_Font.ttf", { family: 'LifeCraft' })
                context.font = "bold " + size + "pt 'LifeCraft'";
                context.textAlign = "center";
                context.fillStyle = "#fff";
                context.fillText(text, canvas.width/2, canvas.height/2+(size/2));

                //context.strokeStyle = 'black';
                //context.lineWidth = 5;  //define the width of the stroke line
                //context.strokeText(text, canvas.width/2, canvas.height/2+(size/2));


                resolve(canvas.toBuffer("image/png"));
            };

            img.src = url;
        })
    }

    module.exports = WBG;