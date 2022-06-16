const { model } = require('mongoose');
const Model = require('../model/model');
const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};
function setHttp(link) {
    if (link.search(/^http[s]?\:\/\//) == -1) {
        link = 'http://' + link;
    }
    return link;
}
module.exports = router =>{
    router.get('/',(req,res)=>{
        res.sendFile('index.html')
    })
    router.get('/:id', async (req, res)=>{
        const mappedUrls = await Model.find({id:req.params.id});
        const mappedUrl = mappedUrls && mappedUrls[0];
        if(mappedUrl && mappedUrl.url){
            res.redirect(mappedUrl.url)
        }
        else{
            res.status(404).json({message:'page not found'});
        }
    })
    router.post('/convert', async (req, res) => {
        try{
            const url = req.body?.url ? setHttp(req.body?.url) : '';
            const validUrl = stringIsAValidUrl(url)
            if(!url || !validUrl){
                throw new Error('Valid URL is required!');
            }

            const id = await getUniqueId();
            const doc = {
                url,
                id,
            }
            const data = new Model(doc);
            data.save();

            res.status(200).json({id});
            
        }
        catch(error){
            res.status(400).json({message:error.message});
        }
    })
    
};

async function getUniqueId(){
    const id = getRandomId();
    const idExist = await Model.find({id});
    if(!idExist.length) return id;
    return getUniqueId();
}

function getRandomId(length=7,string=''){
    const alphaNums= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',1,2,3,4,5,6,7,8,9,0];
    if(!length) return string;
    const index = Math.round(Math.random() * (alphaNums.length-1));
    const newString = string + alphaNums[index];
    return getRandomId(--length, newString);
}
