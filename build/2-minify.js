const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const public = path.resolve(__dirname, "..", "public");
const extensions = [
    "css",
    "html",
    "svg"
];

async function mini() {
    const { minify } = await import("minify");
    return Promise.all(
        fs
            .readdirSync(public)
            .map(async file => {
                const extension = file
                    .match(/(?<=\.)[A-Za-z0-9]+$/)
                    ?.at(0)
                    .toLowerCase();
                if (file.indexOf(".") !== 0 && extensions.includes(extension)) {
                    let minified;
                    const filePath = path.join(public, file);
                    switch (extension) {
                        case "svg":
                            const content = fs.readFileSync(filePath);
                            const { data } = optimize(content);
                            minified = data;
                            break;
                        default:
                            minified = await minify(filePath);
                            break;
                    }
                    fs.writeFileSync(filePath, minified);
                    console.log(`[build] Minified /public/${file}`);
                }
            })
    );
}

if (fs.existsSync(public)) {
    module.exports = mini();
}