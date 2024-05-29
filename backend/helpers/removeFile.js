
const fs = require("fs").promises;
const removeFile = async (path)=>{
    let fileExits;
    try {
        await fs.access(path);
        fileExits = true;

    } catch (error) {
        fileExits = fasle;
    }

    if(fileExits)
        {
            fs.unlink(path);
        }
}

module.exports = removeFile;