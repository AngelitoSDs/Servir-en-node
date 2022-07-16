const express = require('express');

const app = express();
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const sharp = require('sharp');
const fs = require('fs')

app.use(express.json())

app.get('/', function(req, res){
    res.send('hola mundo')
});


app.post('/imagen', upload.single('imagen') , async function(req, res) {

    const body = req.body

    const imagen = req.file

    const processedImage = sharp(imagen.buffer)

    const resizedImage = processedImage.resize(800, 200, {
        fit: 'contain',
        background: '#fff'
        
    })
    const resizedImageBuffer = await resizedImage.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png', resizedImageBuffer)

    console.log(resizedImageBuffer)

    res.send({ resizedImage: resizedImageBuffer})
});

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
    console.log('Servivor escuchadon en el puerto', PORT) 
})