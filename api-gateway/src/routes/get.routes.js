const path = require('path')
const fs = require('fs')
const jsYaml = require('js-yaml')
const axios = require('axios')
 
fs.readFile(path.resolve(process.cwd(), './src/routes/routes.json'), 'utf8', function readFileCallback(err, data){
    let obj = JSON.parse(data);

    obj.services.forEach(async (service, key) => {
        try {
            const res = await axios.get(`${service.host}:${service.port}/routes`, {}, {}, { timeout: 1000 })
            obj.services[key].paths = []

            res.data.routes.forEach(route => {
                let name = ''
                
                if(route.name.startsWith('/')){
                    name = route.name.replace('/', '')
                    name = name.replaceAll('/', '.')
                }else {
                    name = route.name.replaceAll('/', '.') 
                }

                name = name.replaceAll('.', '_')

                obj.services[key].paths.push({
                    path: route.route,
                    method: route.verbs,
                    permission_required: name
                })                
            });

            json = JSON.stringify(obj, null, 2);
            fs.writeFile(path.resolve(process.cwd(), './src/routes/routes.json'), json, () => {
                console.log(`API-${obj.services[key].name} | Routes updated successfully`)
            })
            
            
        } catch (error) {
            console.log(`API-${obj.services[key].name} | Routes not updated`)    
            console.log(`API-${obj.services[key].name} | ${error}`)    
        }
        
    })
})
