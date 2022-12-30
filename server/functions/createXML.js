const xml2js = require('xml2js')
const fs = require('fs')

let data = {
    order : [
        {
            "Name": "Ronaldo"
        }
    ]
}
const  createXML = async (data) => {
    let id = data.id.toString()
    console.log(id)
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data)

    fs.appendFile(`files/${id}.xml`, xml, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

}




console.log(createXML)

module.exports = createXML